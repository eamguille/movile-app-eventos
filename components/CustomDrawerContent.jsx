import { auth } from '@/services/firebase'; // Ajusta si está en otro lugar
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';

export default function CustomDrawerContent({ navigation }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/auth/login');
  };

  return (
    <DrawerContentScrollView>
      <DrawerItem label="Bienvenida" onPress={() => navigation.navigate('index')} />
      <DrawerItem label="Eventos" onPress={() => navigation.navigate('events/index')} />
      <DrawerItem label="Crear Evento" onPress={() => navigation.navigate('events/create')} />
      <DrawerItem label="Perfil" onPress={() => navigation.navigate('profile')} />
      <DrawerItem
        label="Cerrar sesión"
        labelStyle={{ color: 'red' }}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}
