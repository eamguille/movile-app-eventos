import CommentsContainer from "@/components/events_info/comments/CommentsContainer";
import EventPost from "@/components/events_info/publication/eventPost";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PostScreen() {
  return (
    <View style={styles.container}>
      <EventPost
        title="Campeones de la Champions League 2015"
        textBody="Barcelona el mejor equipo de futbol del mundo, y el mejor equipo de futbol de la historia. El mejor equipo de futbol del mundo, y el mejor equipo de futbol de la historia. El mejor equipo de futbol del mundo, y el mejor equipo de futbol de la historia."
        imageUrl="https://statics.somosjujuy.com.ar/2025/05/crop/68267c2702438__400x300.webp"
      />
      <CommentsContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
});
