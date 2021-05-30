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
import { Card } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ProfileStack = createStackNavigator();

const ProfileScreen = ({ route, navigation }) => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Settings")}
            >
              <MaterialIcons name="settings" size={30} />
            </TouchableOpacity>
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
        <Card title="User">
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 26,
            }}
          >
            Your name here
          </Text>
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>User</Text>
          </View>
          <Button
            style={styles.button}
            backgroundColor="#ff0000"
            title="SIGN OUT"
            onPress={() =>
              auth.signOut().then(() => console.log("User signed out!"))
            }
          />
        </Card>
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    width: 50,
    marginTop: 5,
  },
});

export default ProfileScreen;
