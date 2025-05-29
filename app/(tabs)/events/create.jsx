// app/(tabs)/events/create.jsx
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../../../services/firebase';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreate = async () => {
    if (!title || !description) {
      Alert.alert('Campos requeridos', 'Completa todos los campos');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        title,
        description,
        date: date.toISOString(),
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Éxito', 'Evento creado correctamente');
      setTitle('');
      setDescription('');
      setDate(new Date());
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear el evento');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título del Evento</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Fecha y Hora</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{date.toLocaleString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(e, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Crear Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 5 },
  dateButton: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginTop: 5,
  },
  button: { backgroundColor: '#27ae60', padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
