import * as React from "react";
// import auth from "@react-native-firebase/auth";
import { auth } from "../firebase";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
} from "react-native";

const ProfileScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            You are on Profile Screen
          </Text>
          <Button
            backgroundColor="#ff0000"
            title="SIGN OUT"
            onPress={() =>
              auth.signOut().then(() => console.log("User signed out!"))
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

export default ProfileScreen;
