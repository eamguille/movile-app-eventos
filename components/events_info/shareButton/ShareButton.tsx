import { Alert, Button, Share } from "react-native";

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
  return <Button onPress={onShare} title="Share" />;
}
