import * as React from "react";
import { auth } from "../firebase";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const ProfileStack = createStackNavigator();

const ProfileScreen = ({ route, navigation }) => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Settings")}
              title="Settings"
              color="#ff0000"
            />
          ),
        }}
      />
      <ProfileStack.Screen name="Settings" component={SettingsStackScreen} />
    </ProfileStack.Navigator>
  );
};

const ProfileStackScreen = ({ route, navigation }) => {
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
            style={styles.button}
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

const SettingsStackScreen = ({ route, navigation }) => {
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
            You are on Settings Screen.
          </Text>
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
