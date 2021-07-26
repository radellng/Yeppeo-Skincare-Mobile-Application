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

const CreateCommentScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
          setUsername(data.username);
          setImageUrl(data.imageUrl);
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
  // }, []);

  function submitPost(text) {
    Firebase.firestore()
      .collection("Posts")
      .where("createdAt", "==", item.createdAt)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.collection("Comments").add({
          postedBy: username,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
          downvotesCount: 0,
          upvotesCount: 0,
          userURI: imageUrl,
          comment: text,
        });
      });
  }

  console.log("Create Comment Screen loaded");

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
          placeholder="Enter comment"
          style={{ margin: 20 }}
          value={text}
          onChangeText={(description) => setText(description)}
        />

        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => {
            console.log("Comment posted");
            submitPost(text);
            navigation.navigate("ViewPost");
          }}
        >
          <Text style={styles.userBtnTxt}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CreateCommentScreen;
