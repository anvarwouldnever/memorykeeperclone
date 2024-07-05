import { View } from "react-native";
import Auth from "./Auth";
import { StyleSheet } from "react-native";

export default function AuthMain() {
    return (
            <View style={styles.container}>
                <Auth />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });