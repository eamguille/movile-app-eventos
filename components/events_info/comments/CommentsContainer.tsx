import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { db } from "../../../services/firebase"; // Adjust the path as needed to where your db instance is exported
import CommentComponent, { Comment, CommentModel } from "./Comment";

export interface CommentsContainerProps {
  postId: string; // ID del post al que pertenecen los comentarios
}

export default function CommentsContainer({ postId }: CommentsContainerProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentModel[]>([
    {
      id: "1",
      content: "Este es el contenido del comentario 1.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      content: "Este es el contenido del comentario 2.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      content: "Este es el contenido del comentario 3.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [newComment, setNewComment] = useState<Comment>({
    content: "",
  });

  useEffect(() => {
    const fetchComments = async () => {
      // TODOOOOOOOOOOOOOOOOOOOOOOOOO: aqui se deberia hacer una peticion a la base de datos para obtener los comentarios del post
      // Simulando una llamada a la base de datos
      const docEvent = doc(db, "events", postId);
      console.log("Fetching comments for postId:", docEvent);
      const fetchedComments: CommentModel[] = [
        {
          id: "1",
          content: "Comentario cargado desde la base de datos.",
          createdAt: new Date().toISOString(),
        },
      ];
      setComments(fetchedComments);
    };
    fetchComments();
  }, [postId]);
  const handleAddComment = () => {
    // TODOOOOOOOOOOOOOOOOOOOOOOOOO: eeste es el comentario donde se recibe el comentario del usuario y se guarda en la base de datos
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
      <View
        style={showComments ? { paddingBottom: 30, flex: 1, height: 100 } : {}}
      >
        <Text style={styles.commentsTitle}>Comentarios (10):</Text>
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
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  showCommentsTitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
    paddingBottom: 10,
    textDecorationLine: "underline",
    cursor: "pointer",
  },
  comment: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
});
