import { Alert, Button, Share, View } from "react-native";

export interface ShareButtonProps {
  message: string;
  url: string;
}
export default function ShareButton({ message, url }: ShareButtonProps) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Compartir Evento - Barcita Campeon",
        message: url,
        url: url,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <View
      style={{
        marginTop: 5,
        marginBottom: 5,
        width: "50%",
      }}
    >
      <Button onPress={onShare} color={"#000"} title="Compartir" />
    </View>
  );
}
