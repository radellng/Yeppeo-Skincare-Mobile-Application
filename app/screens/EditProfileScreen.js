import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import * as Firebase from "firebase";

const EditProfileScreen = ({ route, navigation }) => {
  var user = Firebase.auth().currentUser;
  // console.log(user.uid);

  var [imageUrl, setImageUrl] = useState("");
  var [uploading, setUploading] = useState(false);
  var [transferred, setTransferred] = useState(0);
  var [username, setUsername] = useState("");
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
  var [gender, setGender] = useState("");
  var [age, setAge] = useState("");
  var [newUsername, setNewUsername] = useState("");
  var [newFirstName, setNewFirstName] = useState("");
  var [newLastName, setNewLastName] = useState("");
  var [newGender, setNewGender] = useState("");
  var [newAge, setNewAge] = useState("");
  var [currImageUrl, setCurrImageUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/yeppeo-469e9.appspot.com/o/images%2Fdefault%20profile%20pic.jpg?alt=media&token=ea5b3733-83b8-441b-bc51-2e8192d19fb1"
  );

  var imageRef = Firebase.storage().ref(
    "images/" + String(user.uid) + "/profilePic/pic.jpg"
  );

  // Retrieve data from firestore
  useEffect(() => {
    Firebase.firestore()
      .collection("Users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          setUsername(data.username);
          setCurrImageUrl(data.imageUrl);
          setAge(data.age);
          setGender(data.gender);
          setFirstName(data.firstName);
          setLastName(data.lastName);
        } else {
          return "";
        }
      })
      .catch((e) => console.log("Errors while downloading => ", e));
  }, []);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     let result = await storageRef.listAll();
  //     let urlPromises = result.items.map((imageRef) =>
  //       imageRef.getDownloadURL()
  //     );

  //     return Promise.all(urlPromises);
  //   };

  //   const loadImages = async () => {
  //     const urls = await fetchImages();
  //     setImageUrl(urls[0]);
  //   };
  //   loadImages();
  // }, [imageUrl]);

  // useEffect(() => {
  //   const loadImages = async () => {
  //     let url = await imageRef.getDownloadURL();
  //     setImageUrl(url);
  //   };
  //   loadImages();
  // }, [imageUrl]);

  // useEffect(() => {
  //   imageRef.getDownloadURL().then((url) => {
  //     setImageUrl(url);
  //   });
  // }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  const updatePic = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageUrl, true);
      xhr.send(null);
    });

    console.log("New profile picture uploaded.");

    const ref = Firebase.storage()
      .ref()
      .child("images/" + String(user.uid) + "/profilePic/pic.jpg");

    await ref.put(blob);

    const url = await ref.getDownloadURL().catch((error) => {
      throw error;
    });
    return url;

    // snapshot.on(
    //   Firebase.storage.TaskEvent.STATE_CHANGED,
    //   () => {
    //     setUploading(true);
    //   },
    //   (error) => {
    //     setUploading(false);
    //     console.log(error);
    //     blob.close();
    //     return;
    //   },
    //   () => {
    //     snapshot.snapshot.ref.getDownloadURL().then((url) => {
    //       setUploading(false);
    //       console.log("download url : ", url);
    //       blob.close();
    //       return url;
    //     });
    //   }
    // );
  };

  async function updateInfo() {
    var uploadedUrl = imageUrl == "" ? "" : await updatePic();
    Firebase.firestore()
      .collection("Users")
      .doc(String(user.uid))
      .update({
        username: newUsername == "" ? username : newUsername,
        firstName: newFirstName == "" ? firstName : newFirstName,
        lastName: newLastName == "" ? lastName : newLastName,
        gender: newGender == "" ? gender : newGender,
        age: newAge == "" ? age : newAge,
        imageUrl: uploadedUrl == "" ? currImageUrl : uploadedUrl,
      })
      .then((ref) => {
        console.log("Information updated");
      });
  }
  // function updateFirstName(firstName) {
  //   Firebase.firestore()
  //     .collection("Users")
  //     .doc(String(user.uid))
  //     .update({
  //       firstName: firstName,
  //     })
  //     .then((ref) => {
  //       console.log("First name updated");
  //     });
  // }
  // function updateLastName(lastName) {
  //   Firebase.firestore()
  //     .collection("Users")
  //     .doc(String(user.uid))
  //     .update({
  //       lastName: lastName,
  //     })
  //     .then((ref) => {
  //       console.log("Last name updated");
  //     });
  // }
  // function updateGender(gender) {
  //   Firebase.firestore()
  //     .collection("Users")
  //     .doc(String(user.uid))
  //     .update({
  //       gender: gender,
  //     })
  //     .then((ref) => {
  //       console.log("Gender updated");
  //     });
  // }
  // function updateAge(age) {
  //   Firebase.firestore()
  //     .collection("Users")
  //     .doc(String(user.uid))
  //     .update({
  //       age: age,
  //     })
  //     .then((ref) => {
  //       console.log("Age updated");
  //     });
  // }

  console.log("Edit Profile page loaded");

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: imageUrl == "" ? currImageUrl : imageUrl }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  ></MaterialCommunityIcons>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {username}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder={username == "" ? "Username" : username}
            blurOnSubmit
            autoCorrect={false}
            maxLength={15}
            placeholderTextColor="#666666"
            value={newUsername}
            onChangeText={(text) => setNewUsername(text)}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder={firstName == "" ? "First Name" : firstName}
            blurOnSubmit
            autoCorrect={false}
            maxLength={15}
            placeholderTextColor="#666666"
            value={newFirstName}
            onChangeText={(text) => setNewFirstName(text)}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder={lastName == "" ? "Last Name" : lastName}
            blurOnSubmit
            autoCorrect={false}
            maxLength={15}
            placeholderTextColor="#666666"
            value={newLastName}
            onChangeText={(text) => setNewLastName(text)}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
          <TextInput
            placeholder={gender == "" ? "Gender" : gender}
            blurOnSubmit
            autoCorrect={false}
            maxLength={15}
            placeholderTextColor="#666666"
            value={newGender}
            onChangeText={(text) => setNewGender(text)}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
          {/* <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
              { label: "Football", value: "football" },
              { label: "Baseball", value: "baseball" },
              { label: "Hockey", value: "hockey" },
            ]}
          /> */}
          <TextInput
            placeholder={age == "" ? "Age" : age}
            blurOnSubmit
            autoCorrect={false}
            maxLength={15}
            placeholderTextColor="#666666"
            value={newAge}
            onChangeText={(text) => setNewAge(text)}
            style={styles.textInput}
          />
        </View>

        {/* <View style={styles.action}>
          <FontAwesome name="globe" color="#333333" size={20} />
          <TextInput
            placeholder="Climate of Home"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="info" color="#333333" size={20} />
          <TextInput
            placeholder="Facial SkinType"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View> */}

        {/* <View style={styles.action}>
          <FontAwesome name="info" color="#333333" size={20} />
          <TextInput
            placeholder="Do you have sensitive skin?"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View> */}
      </View>
      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => {
          updateInfo();
          navigation.navigate("Profile");
        }}
      >
        <Text style={styles.userBtnTxt}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    width: "100%",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#2e64e5",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#333333",
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
});
