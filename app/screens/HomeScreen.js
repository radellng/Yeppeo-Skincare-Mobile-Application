import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Firebase from "firebase";
import { storage } from "../firebase";

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
  console.log(user.uid);
  var storageRef = Firebase.storage().ref("images/" + String(user.uid) + "/");
  var [imageUrl, setImageUrl] = useState([]);

  // useEffect(() => {
  //   storageRef
  //     .listAll()
  //     .then(function (result) {
  //       result.items.forEach(function (imageRef) {
  //         imageRef
  //           .getDownloadURL()
  //           .then(function (url) {
  //             imageUrl.push(url);
  //             setImageUrl(imageUrl);
  //           })
  //           .catch(function (error) {
  //             // Handle any errors
  //           });
  //       });
  //     })
  //     .catch((e) => console.log("Errors while downloading => ", e));
  // }, []);

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
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 16 }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Your journey so far...
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageUrl.reverse().map((url, index) => (
              <Image
                key={index}
                style={{ height: 200, width: 200, top: 20 }}
                source={{ uri: url }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// function HomeStackScreen(route, navigation) {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <View
//           style={{
//             flex: 1,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 25,
//               textAlign: "center",
//               marginBottom: 16,
//             }}
//           >
//             You are on Home Screen
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

export default HomeScreen;
