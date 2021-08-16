import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Firebase from "firebase";

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
  var user = Firebase.auth().currentUser;
  var storageRef = Firebase.storage().ref("images/" + String(user.uid) + "/");
  var [imageUrl, setImageUrl] = useState([]);
  var [username, setUsername] = useState("");

  useEffect(() => {
    Firebase.firestore()
      .collection("Users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();
          console.log(data.username);
          setUsername(data.username);
        } else {
          return console.log("No data found");
        }
      });
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      let result = await storageRef.listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setImageUrl(urls);
    };
    loadImages();
    console.log("Home page image fetched");
  }, []);

  console.log("Home page");

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // Create a function for refreshing the forum page
  const onRefresh = () => {
    setRefreshing(true);
    const fetchImages = async () => {
      let result = await storageRef.listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setImageUrl(urls);
    };
    loadImages();
    console.log("Home page image fetched");
    console.log("Home refreshed");
    wait(2000).then(() => setRefreshing(false));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flex: 1,
            padding: 16,
            alignContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 16,
              fontFamily: "Roboto",
            }}
          >
            Welcome back, {username}.
          </Text>
          {imageUrl.length == 0 ? (
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                marginBottom: 10,
                fontFamily: "Roboto",
              }}
            >
              Upload your first image to get started!
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontFamily: "Roboto",
              }}
            >
              You are making good progress, keep it up!
            </Text>
          )}
          <View
            style={{
              flex: 1,
              // flexDirection: "row",
              alignItems: "center",
            }}
          >
            {imageUrl.reverse().map((url, index) => (
              <View
                key={index}
                style={{
                  justifyContent: "space-between",
                  padding: 10,
                  // borderWidth: 1,
                  // borderColor: "ff0000",
                }}
              >
                <Image
                  key={index}
                  style={{
                    height: 200,
                    width: 200,
                    top: 10,
                  }}
                  source={{ uri: url }}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
