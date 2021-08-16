import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import * as Firebase from "firebase";

const ProfileScreen = ({ route, navigation }) => {
  var user = Firebase.auth().currentUser;
  var [username, setUsername] = useState("");
  var [currImageUrl, setCurrImageUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/yeppeo-469e9.appspot.com/o/images%2Fdefault%20profile%20pic.jpg?alt=media&token=ea5b3733-83b8-441b-bc51-2e8192d19fb1"
  );
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
  var [gender, setGender] = useState("");
  var [age, setAge] = useState("");

  // Retrieve data from firestore
  useEffect(() => {
    Firebase.firestore()
      .collection("Users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        if (doc.exists) {
          let data = doc.data();
          setUsername(data.username);
          setCurrImageUrl(data.imageUrl);
          setAge(data.age);
          setGender(data.gender);
          setFirstName(data.firstName);
          setLastName(data.lastName);
        } else {
          return console.log("No data found");
        }
      });
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // Create a function for refreshing the forum page
  const onRefresh = () => {
    setRefreshing(true);
    Firebase.firestore()
      .collection("Users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        if (doc.exists) {
          let data = doc.data();
          setUsername(data.username);
          setCurrImageUrl(data.imageUrl);
        } else {
          return console.log("No data found");
        }
      });
    console.log("Profile page image fetched");
    console.log("Profile refreshed");
    wait(2000).then(() => setRefreshing(false));
  };

  console.log("Profile page loaded");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Image style={styles.userImg} source={{ uri: currImageUrl }} />
        <Text style={styles.userName}>{username}</Text>
        <Text style={styles.aboutUser}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.aboutUser}>
          {gender}, {age}
        </Text>
        <View style={styles.userBtnWrapper}>
          <>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <Text style={styles.userBtnTxt}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() =>
                auth.signOut().then(() => console.log("User signed out!"))
              }
            >
              <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
