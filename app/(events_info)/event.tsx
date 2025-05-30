import CommentsContainer from "@/components/events_info/comments/CommentsContainer";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PostScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Publicación */}
      <View style={styles.post}>
        <Text style={styles.title}>Publicación - Evento</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sint
          cumque repudiandae consequuntur tempore dicta fugiat molestias,
          temporibus, ipsa accusamus tenetur quod sapiente commodi obcaecati
          pariatur autem blanditiis harum cupiditate?
        </Text>
        <Image
          source={{
            uri: "https://statics.somosjujuy.com.ar/2025/05/crop/68267c2702438__400x300.webp",
          }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginTop: 10,
          }}
        />
      </View>
      <CommentsContainer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  post: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
