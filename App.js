import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LogBox, SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { auth } from "./app/firebase";

import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import ForumScreen from "./app/screens/ForumScreen";
import SearchScreen from "./app/screens/SearchScreen";
import UploadScreen from "./app/screens/UploadScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import LoginScreen from "./app/screens/SignInScreen";
import RegisterScreen from "./app/screens/SignUpScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
      backgroundColor: "transparent",
    },
  });

  return (
    <NavigationContainer theme={DefaultTheme}>
      {signedIn ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ff0000" }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === "home") {
                  return (
                    <MaterialCommunityIcons
                      name="home"
                      color={color}
                      size={size}
                    />
                  );
                }
                if (route.name === "search") {
                  return (
                    <MaterialIcons name="search" color={color} size={size} />
                  );
                }
                if (route.name === "upload") {
                  return (
                    <MaterialCommunityIcons
                      name="upload"
                      color={color}
                      size={size}
                    />
                  );
                }
                if (route.name === "forum") {
                  return (
                    <MaterialCommunityIcons
                      name="forum"
                      color={color}
                      size={size}
                    />
                  );
                }
                if (route.name === "profile") {
                  return (
                    <MaterialCommunityIcons
                      name="account"
                      color={color}
                      size={size}
                    />
                  );
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: "#ff0000",
              inactiveTintColor: "#696969",
              style: {
                backgroundColor: "#ffffff",
              },
            }}
          >
            <Tab.Screen
              name="home"
              component={HomeScreen}
              options={{
                title: "Home",
              }}
            />
            <Tab.Screen
              name="search"
              component={SearchScreen}
              options={{
                title: "Search",
              }}
            />
            <Tab.Screen
              name="upload"
              component={UploadScreen}
              options={{
                title: "Upload",
              }}
            />
            <Tab.Screen
              name="forum"
              component={ForumScreen}
              options={{
                title: "Forum",
              }}
            />
            <Tab.Screen
              name="profile"
              component={ProfileScreen}
              options={{
                title: "Profile",
              }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      ) : (
        <>
          <StatusBar style="light" />
          <Stack.Navigator mode="card" screenOptions={{}}>
            <Stack.Screen
              name="signIn"
              component={LoginScreen}
              options={{
                title: "Sign in",
                headerStyle: {
                  backgroundColor: "#29434e",
                  borderBottomColor: "#29434e",
                },
                cardStyleInterpolator: forFade,
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}
              options={{
                title: "Register",
                headerStyle: {
                  backgroundColor: "#29434e",
                  borderBottomColor: "#29434e",
                },
                cardStyleInterpolator: forFade,
                headerTintColor: "#fff",
              }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
