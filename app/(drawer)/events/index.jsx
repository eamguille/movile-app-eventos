import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth } from '../../../services/firebase';
import { getAllEvents } from '../../../services/firestore';


export default function EventsScreen() {
  const router = useRouter();
  const [createdByMe, setCreatedByMe] = useState([]);
  const [attending, setAttending] = useState([]);
  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('created'); // created | attending | explore
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const debounceTimeout = useRef(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchEvents = async () => {
        setLoading(true);
        try {
          const user = auth.currentUser;
          const allEvents = await getAllEvents();

          const now = new Date();
          const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

          if (!isActive) return;

          const created = allEvents.filter(event => event.userId === user.uid);
          const asAttendee = allEvents.filter(
            event =>
              event.attendees?.includes(user.email) &&
              event.userId !== user.uid
          );

          const exploreEvents = allEvents.filter(event => {
            const eventDate = new Date(event.date);
            const createdAt = event.createdAt?.toDate?.() ?? new Date(0);

            return (
              (createdAt > yesterday || (eventDate >= now && eventDate <= nextWeek)) ||
              (eventDate < now && eventDate > lastWeek)
            );
          });

          setCreatedByMe(created);
          setAttending(asAttendee);
          setExplore(exploreEvents);
        } catch (error) {
          console.error('Error cargando eventos:', error);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchEvents();

      return () => {
        isActive = false;
      };
    }, [])
  );


  // Este useEffect maneja el debounce
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300); // Espera 300 ms después de la última tecla

    return () => clearTimeout(debounceTimeout.current);
  }, [searchText]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 10 }}>Cargando eventos...</Text>
      </View>
    );
  }

  const renderEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => router.push(`/events/${item.id}`)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  const activeList =
    view === 'created' ? createdByMe : view === 'attending' ? attending : explore;

  const emptyMessage =
    view === 'created'
      ? 'No has creado eventos aún.'
      : view === 'attending'
        ? 'No estás registrado en ningún evento.'
        : 'No hay eventos para explorar por ahora.';


  // Usamos debouncedSearchText para filtrar eventos
  const filteredList = activeList.filter(event => {
    if (view !== 'explore') return true;

    const text = debouncedSearchText.toLowerCase();
    return (
      event.title.toLowerCase().includes(text) ||
      event.location?.toLowerCase().includes(text)
    );
  });

  return (
    <View style={styles.container}>
      {/* Botones toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, view === 'created' && styles.activeButton]}
          onPress={() => setView('created')}
        >
          <Text style={[styles.toggleText, view === 'created' && styles.activeText]}>
            Mis eventos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, view === 'attending' && styles.activeButton]}
          onPress={() => setView('attending')}
        >
          <Text style={[styles.toggleText, view === 'attending' && styles.activeText]}>
            Soy asistente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, view === 'explore' && styles.activeButton]}
          onPress={() => setView('explore')}
        >
          <Text style={[styles.toggleText, view === 'explore' && styles.activeText]}>
            Explorar
          </Text>
        </TouchableOpacity>
      </View>

      {view === 'explore' && (
        <TextInput
          placeholder="Buscar eventos por título o ubicación"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
      )}

      {activeList.length === 0 ? (
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      ) : (
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  toggleText: {
    fontWeight: 'bold',
    color: '#333',
  },
  activeText: {
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  eventCard: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  date: { fontSize: 14, color: '#666' },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
});
