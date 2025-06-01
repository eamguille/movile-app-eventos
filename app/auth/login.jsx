// app/auth/login.jsx
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFacebookAuth } from '../../services/facebookAuth';
import { auth } from '../../services/firebase';
import { useGoogleAuth } from '../../services/googleAuth';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { request, promptAsync } = useGoogleAuth();
  const { request: fbRequest, promptAsync: fbPromptAsync } = useFacebookAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // No redirigir manualmente. El layout se encarga.
    } catch (error) {
      Alert.alert('Error', 'Credenciales inválidas. Intenta nuevamente.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => promptAsync()}
        disabled={!request}
        style={{ backgroundColor: '#4285F4', padding: 15, borderRadius: 8, marginTop: 20 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Iniciar sesión con Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => fbPromptAsync()}
        disabled={!fbRequest}
        style={{ backgroundColor: '#3b5998', padding: 15, borderRadius: 8, marginTop: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Iniciar sesión con Facebook
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/register')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8 },
  button: { backgroundColor: '#2e86de', padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 20, color: '#2e86de', textAlign: 'center' }
});
