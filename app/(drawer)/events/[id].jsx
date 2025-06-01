import * as Notifications from 'expo-notifications';
import { useLocalSearchParams } from 'expo-router';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../services/firebase';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attending, setAttending] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setAttending(false);
        
        const ref = doc(db, 'events', id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const eventData = snap.data();
          setEvent(eventData);

          // ¿Está el usuario en la lista de asistentes?
          if (user && eventData.attendees?.includes(user.email)) {
            setAttending(true);
          }
        } else {
          setEvent(null);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleToggleRSVP = async () => {
    if (!user) {
      Alert.alert('Inicia sesión para confirmar asistencia');
      return;
    }

    try {
      const eventRef = doc(db, 'events', id);

      if (!attending) {
        // Confirmar asistencia
        await updateDoc(eventRef, {
          attendees: arrayUnion(user.email),
        });
        setAttending(true);

        Alert.alert('¡Asistencia confirmada!', 'Te hemos registrado para este evento');

        // Notificación local
        const eventDate = new Date(event.date);
        const notifyTime = new Date(eventDate.getTime() - 60 * 60 * 1000);

        if (notifyTime > new Date()) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `Recordatorio: ${event.title}`,
              body: `Tu evento empieza en 1 hora.`,
            },
            trigger: notifyTime,
          });
        }

      } else {
        // Cancelar asistencia
        await updateDoc(eventRef, {
          attendees: arrayRemove(user.email),
        });
        setAttending(false);
        Alert.alert('Asistencia cancelada');
      }

      // Actualizar evento
      const updatedSnap = await getDoc(eventRef);
      setEvent(updatedSnap.data());

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar tu asistencia');
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
        onPress={handleToggleRSVP}
      >
        <Text style={styles.rsvpText}>
          {attending ? 'Cancelar asistencia' : 'Confirmar asistencia'}
        </Text>
      </TouchableOpacity>

      {/* Lista de asistentes */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
          Asistentes confirmados ({event.attendees?.length || 0})
        </Text>
        {event.attendees?.length > 0 ? (
          event.attendees.map((email, idx) => (
            <Text key={idx} style={{ marginBottom: 4 }}>• {email}</Text>
          ))
        ) : (
          <Text>Nadie se ha registrado aún.</Text>
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
