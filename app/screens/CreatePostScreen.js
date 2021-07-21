import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";
import Firebase from "firebase";

const CreatePostScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/yeppeo-469e9.appspot.com/o/images%2Fdefault%20profile%20pic.jpg?alt=media&token=ea5b3733-83b8-441b-bc51-2e8192d19fb1"
  );

  var user = Firebase.auth().currentUser;
  var storageRef = Firebase.storage().ref(
    "images/" + String(user.uid) + "/profilePic/"
  );
  // Retrieve data from firestore
  useEffect(() => {
    Firebase.firestore()
      .collection("Users")
      .doc(String(user.uid))
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          return setUsername(data.username);
        } else {
          return "";
        }
      })
      .catch((e) => console.log("Errors while downloading => ", e));
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
      setImageUrl(urls[0]);
    };
    loadImages();
  }, []);

  function submitPost(title, text) {
    Firebase.firestore().collection("Posts").add({
      postedBy: username,
      createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
      downvotesCount: 0,
      upvotesCount: 0,
      userURI: imageUrl,
      title: title,
      postText: text,
      updatedAt: Firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  console.log("Create Post Screen loaded");

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      {/* ability to add image in the future */}
      {/* <View>
        {this.state.image ? (
          <Image
            source={this.state.image}
            style={{ width: "100%", height: 300 }}
          />
        ) : (
          <Button
            onPress={this.selectImage}
            style={{
              alignItems: "center",
              padding: 10,
              margin: 30,
            }}
          >
            Add an image
          </Button>
        )}
      </View> */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>What's on your mind?</Text>
        <TextInput
          placeholder="Enter title of the post"
          blurOnSubmit
          maxLength={100}
          style={{ margin: 20 }}
          value={title}
          onChangeText={(title) => setTitle(title)}
        />
        <TextInput
          placeholder="Enter description"
          style={{ margin: 20 }}
          value={text}
          onChangeText={(description) => setText(description)}
        />
        <Button
          title="submit"
          status="success"
          onPress={() => {
            console.log("post");
            submitPost(title, text);
            navigation.navigate("Forum");
          }}
        ></Button>
      </View>
    </View>
  );
};

export default CreatePostScreen;
