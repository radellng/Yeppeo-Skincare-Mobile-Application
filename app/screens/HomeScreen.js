import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Logo title for the top left of HomeScreen
function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 100 }}
      source={require("../assets/yeppeo_title.png")}
    />
  );
}

const HomeStack = createStackNavigator();

function HomeScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </HomeStack.Navigator>
  );
}

const HomeStackScreen = ({ route, navigation }) => {
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
            You are on Home Screen
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
  title: {
    justifyContent: "center",
    width: 100,
    height: 100,
    position: "absolute",
    top: 0,
    left: 10,
  },
});

export default HomeScreen;
