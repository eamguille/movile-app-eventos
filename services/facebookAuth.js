import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { auth } from './firebase';

WebBrowser.maybeCompleteAuthSession();

export const useFacebookAuth = () => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '1645836423473219',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (response?.type === 'success' && !loading) {
      setLoading(true);
      const { access_token } = response.params;
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential)
        .catch(err => {
          console.error('Error al autenticar con Facebook', err);
          Alert.alert('Error', 'No se pudo iniciar sesión con Facebook.');
        })
        .finally(() => setLoading(false));
    }
  }, [response]);

  return {
    request,
    promptAsync,
    loading,
  };
};
