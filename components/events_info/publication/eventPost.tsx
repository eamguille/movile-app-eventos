import { Image, StyleSheet, Text, View } from "react-native";
import ShareButton from "../shareButton/ShareButton";

export interface EventPostProps {
  title: string;
  textBody: string;
  imageUrl: string;
  postId: string;
}
export default function EventPost({
  title,
  textBody,
  imageUrl,
}: EventPostProps) {
  return (
    <View style={styles.post}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{textBody}</Text>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 10,
          marginTop: 10,
        }}
      />

      <Text style={styles.text}>
        Publicado el: {new Date().toLocaleDateString()}
      </Text>
      <Text style={styles.text}>Autor: Usuario</Text>

      <ShareButton
        message={`¡Mira este evento! ${title} - ${textBody}`}
        url={"http://192.168.1.33:3000/iloveu<3"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
