import { Text, View } from "react-native";

export interface Comment {
  content: string;
}
export interface CommentModel {
  id: string;
  content: string;
  createdAt: string;
}
export interface CommentProps {
  comment: CommentModel;
}

export default function CommentComponent({
  comment: { content, createdAt },
}: CommentProps) {
  return (
    <View style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Text style={{ marginTop: 10 }}>
        {content.length > 100 ? `${content.substring(0, 100)}...` : content}
      </Text>
      <Text style={{ color: "#888", marginTop: 5 }}>
        Creado:{" "}
        {new Date(createdAt).toLocaleDateString("es-AR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
}
