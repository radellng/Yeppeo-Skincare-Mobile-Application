import "react-native-gesture-handler";

import * as React from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import ForumScreen from "./app/screens/ForumScreen";
import ReviewScreen from "./app/screens/ReviewScreen";
import UploadScreen from "./app/screens/UploadScreen";
// import SettingsScreen from "./app/screens/SettingsScreen";
import LoginScreen from ".app/src/login/login";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return <LoginScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Logo title for the top left of every screen
function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 100 }}
      source={require("./app/assets/yeppeo_title.png")}
    />
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}

function ReviewStack() {
  return (
    <Stack.Navigator initialRouteName="Review">
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}

function UploadStack() {
  return (
    <Stack.Navigator initialRouteName="Upload">
      <Stack.Screen
        name="Upload"
        component={UploadScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}

function ForumStack() {
  return (
    <Stack.Navigator initialRouteName="Forum">
      <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: "#ff0000",
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ReviewStack"
          component={ReviewStack}
          options={{
            tabBarLabel: "Review",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="rate-review" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="UploadStack"
          component={UploadStack}
          options={{
            tabBarLabel: "Upload",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="upload" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ForumStack"
          component={ForumStack}
          options={{
            tabBarLabel: "Forum",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="forum" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
