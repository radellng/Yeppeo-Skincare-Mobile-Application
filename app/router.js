import "react-native-gesture-handler";

import * as React from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Button, Platform, StatusBar } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ForumScreen from "./screens/ForumScreen";
import ReviewScreen from "./screens/ReviewScreen";
import UploadScreen from "./screens/UploadScreen";
// import SettingsScreen from "./screens/SettingsScreen";
// import LoginScreen from "./src/login/login";

// const headerStyle = {
//   marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
// };

// export const SignedOut = createStackNavigator({
//   SignIn: {
//     screen: LoginScreen,
//     navigationOptions: {
//       title: "Sign In",
//       headerStyle,
//     },
//   },
// });

const SignedInStack = createStackNavigator();
export const SignedInTab = createBottomTabNavigator();

// Logo title for the top left of HomeScreen
function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 100 }}
      source={require("./assets/yeppeo_title.png")}
    />
  );
}

function HomeStack() {
  return (
    <SignedInStack.Navigator initialRouteName="Home">
      <SignedInStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </SignedInStack.Navigator>
  );
}

function ReviewStack() {
  return (
    <SignedInStack.Navigator initialRouteName="Review">
      <SignedInStack.Screen
        name="Review"
        component={ReviewScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </SignedInStack.Navigator>
  );
}

function UploadStack() {
  return (
    <SignedInStack.Navigator initialRouteName="Upload">
      <SignedInStack.Screen
        name="Upload"
        component={UploadScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </SignedInStack.Navigator>
  );
}

function ForumStack() {
  return (
    <SignedInStack.Navigator initialRouteName="Forum">
      <SignedInStack.Screen
        name="Forum"
        component={ForumScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </SignedInStack.Navigator>
  );
}

function ProfileStack() {
  return (
    <SignedInStack.Navigator initialRouteName="Profile">
      <SignedInStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert("This will go to the settings page.")}
              title="Settings"
              color="#ff0000"
            />
          ),
        }}
      />
    </SignedInStack.Navigator>
  );
}

export function SignedIn() {
  return (
    <NavigationContainer>
      <SignedInTab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: "#ff0000",
        }}
      >
        <SignedInTab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <SignedInTab.Screen
          name="ReviewStack"
          component={ReviewStack}
          options={{
            tabBarLabel: "Review",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="rate-review" color={color} size={size} />
            ),
          }}
        />
        <SignedInTab.Screen
          name="UploadStack"
          component={UploadStack}
          options={{
            tabBarLabel: "Upload",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="upload" color={color} size={size} />
            ),
          }}
        />
        <SignedInTab.Screen
          name="ForumStack"
          component={ForumStack}
          options={{
            tabBarLabel: "Forum",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="forum" color={color} size={size} />
            ),
          }}
        />
        <SignedInTab.Screen
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
      </SignedInTab.Navigator>
    </NavigationContainer>
  );
}

// export const createRootNavigator = (signedIn = false) => {
//   return createSwitchNavigator(
//     {
//       SignedIn: {
//         screen: SignedInTab,
//       },
//       SignedOut: {
//         screen: SignedOut,
//       },
//     },
//     {
//       initialRouteName: signedIn ? "SignedIn" : "SignedOut",
//     }
//   );
// };
