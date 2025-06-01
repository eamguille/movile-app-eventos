import CustomDrawerContent from '@/components/CustomDrawerContent';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#2196F3',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Bienvenida',
          drawerIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="events/index"
        options={{
          title: 'Eventos',
          drawerIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="events/create"
        options={{
          title: 'Crear Evento',
          drawerIcon: ({ color, size }) => <Ionicons name="add-circle" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Perfil',
          drawerIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
    </Drawer>
  );
}
