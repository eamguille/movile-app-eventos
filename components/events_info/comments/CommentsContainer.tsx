import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CommentComponent, { Comment, CommentModel } from "./Comment";

export interface CommentsContainerProps {
  postId: string; // ID del post al que pertenecen los comentarios
}

export default function CommentsContainer({ postId }: CommentsContainerProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentModel[]>([
    {
      id: "1",
      content: "Fue una de las mejores temporadas de la historia.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      content: "El barca era claro merecedor de esta copa.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      content: "Visca Barca.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [newComment, setNewComment] = useState<Comment>({
    content: "",
  });

  const handleAddComment = () => {
    const newCommentFromDB: CommentModel = {
      id: Math.random().toString(), // Genera un ID único para el nuevo comentario
      content: newComment.content,
      createdAt: new Date().toISOString(),
    };

    setComments([newCommentFromDB, ...comments]);
    setNewComment(newComment);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Lista de comentarios */}
      <View style={showComments ? { paddingBottom: 10, flex: 1 } : {}}>
        <Text style={styles.commentsTitle}>
          Comentarios ({comments.length}):
        </Text>
        <Text
          style={styles.showCommentsTitle}
          onPress={() => {
            setShowComments(!showComments);
          }}
        >
          Ver todos los comentarios
        </Text>
        {showComments && (
          <FlatList
            style={{ flexGrow: 0 }}
            data={comments}
            renderItem={({ item }) => <CommentComponent comment={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      {/* Entrada para comentar */}
      <TextInput
        style={styles.input}
        placeholder="Escribe un comentario..."
        value={newComment.content}
        onChangeText={(text) => {
          setNewComment({
            content: text,
          });
        }}
      />
      <Button title="Comentar" onPress={handleAddComment} />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },

  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  showCommentsTitle: {
    fontSize: 16,
    color: "gray",
    textDecorationLine: "underline",
    cursor: "pointer",
    marginBottom: 10,
  },
  comment: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
});
