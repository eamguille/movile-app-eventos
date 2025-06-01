// services/firestore.ts
import { getAuth } from 'firebase/auth';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { db } from './firebase';

export const getAllEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return events;
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    throw error;
  }
};

export const getUserEvents = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error('Usuario no autenticado');

    const q = query(
      collection(db, 'events'),
      where('userId', '==', user.uid)
    );

    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return events;
  } catch (error) {
    console.error('Error al obtener eventos del usuario:', error);
    throw error;
  }
};

export const addEvent = async (event: {
  title: string;
  description: string;
  date: string;
  location: string;
  imageUri?: string;
}) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const eventData: any = {
      title: event.title,
      description: event.description,
      userId: user.uid,
      date: event.date,
      location: event.location,
      imageUrl: event.imageUri,
      attendees: [],
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'events'), eventData);

    console.log('Evento agregado con ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error al agregar evento: ', e);
    throw e;
  }
};

export const confirmAttendance = async (eventId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error('Usuario no autenticado');

  const eventRef = doc(db, 'events', eventId);
  await updateDoc(eventRef, {
    attendees: arrayUnion(user.email),
  });
};

export const cancelAttendance = async (eventId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error('Usuario no autenticado');

  const eventRef = doc(db, 'events', eventId);
  await updateDoc(eventRef, {
    attendees: arrayRemove(user.email),
  });
};