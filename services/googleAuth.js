import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { auth } from './firebase';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: '143446919600-pma4vr3vee010d8eabkeukrdtortecpl.apps.googleusercontent.com',
    webClientId: '143446919600-pma4vr3vee010d8eabkeukrdtortecpl.apps.googleusercontent.com',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (response?.type === 'success' && response.params?.id_token && !loading) {
      setLoading(true);
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .catch(err => {
          console.error('Error autenticando con Google', err);
          Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
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
