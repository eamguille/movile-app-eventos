import * as Notifications from 'expo-notifications';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../services/firebase';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attending, setAttending] = useState(false);
  const [attendees, setAttendees] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const ref = doc(db, 'events', id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setEvent(snap.data());
        } else {
          setEvent(null);
        }

        // Verificar asistencia del usuario
        if (user) {
          const rsvpRef = doc(db, 'events', id, 'attendees', user.uid);
          const rsvpSnap = await getDoc(rsvpRef);
          setAttending(rsvpSnap.exists());
        }

        // Obtener lista de asistentes
        const attendeesRef = collection(db, 'events', id, 'attendees');
        const attendeesSnap = await getDocs(attendeesRef);
        const attendeeList = attendeesSnap.docs.map(doc => doc.data());
        setAttendees(attendeeList);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);


  const handleRSVP = async () => {
    if (!user) {
      Alert.alert('Inicia sesión para confirmar asistencia');
      return;
    }

    try {
      const attendeeRef = doc(db, 'events', id, 'attendees', user.uid);
      await setDoc(attendeeRef, {
        userId: user.uid,
        email: user.email,
        timestamp: new Date().toISOString(),
      });

      setAttending(true);
      Alert.alert('¡Asistencia confirmada!', 'Te hemos registrado para este evento');

      // 📅 PROGRAMAR NOTIFICACIÓN LOCAL
      const eventDate = new Date(event.date);
      const notifyTime = new Date(eventDate.getTime() - 60 * 60 * 1000); // 1 hora antes

      if (notifyTime > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `Recordatorio: ${event.title}`,
            body: `Tu evento empieza en 1 hora.`,
          },
          trigger: notifyTime,
        });
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo confirmar tu asistencia');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Evento no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>{new Date(event.date).toLocaleString()}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <TouchableOpacity
        style={[styles.rsvpButton, attending && styles.attending]}
        onPress={handleRSVP}
        disabled={attending}
      >
        <Text style={styles.rsvpText}>
          {attending ? 'Asistencia confirmada' : 'Confirmar asistencia'}
        </Text>
      </TouchableOpacity>

      {/* 👇 Lista de asistentes confirmados */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
          Asistentes confirmados ({attendees.length})
        </Text>
        {attendees.length === 0 ? (
          <Text>Nadie se ha registrado aún.</Text>
        ) : (
          attendees.map((a, idx) => (
            <Text key={idx} style={{ marginBottom: 4 }}>
              • {a.email}
            </Text>
          ))
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  date: { fontSize: 16, color: '#666', marginBottom: 20 },
  description: { fontSize: 16, marginBottom: 30 },
  rsvpButton: {
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  attending: {
    backgroundColor: '#2ecc71',
  },
  rsvpText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
