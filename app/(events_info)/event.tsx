import CommentsContainer from "@/components/events_info/comments/CommentsContainer";
import EventPost from "@/components/events_info/publication/eventPost";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PostScreen() {
  return (
    <View style={styles.container}>
      <EventPost
        title="La Liga de Hansi Flick"
        textBody="Hansi Flick llegó sin hacer ruido. Venía a sustituir a Xavi Hernández después de su rocambolesca salida que se venía telegrafiando desde enero de 2024 con sus idas y venidas. A Laporta siempre le gustó el alemán y a Deco también. Confiaron en él a pesar de su limitado currículum en el que tuvo un enorme éxito en el Bayern, pero fracasó al mando de la selección de su país. Era, por tanto, una apuesta de riesgo en un momento muy delicado del club maniatado como siempre por el 'Fair Play' a la hora de acercarse al mercado."
        imageUrl="https://e00-especiales-marca.uecdn.es/futbol/images/barcelona/campeon-liga/2025/tema2-02.jpg"
        postId="1"
      />
      <CommentsContainer postId="1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    flex: 1,
  },
});
