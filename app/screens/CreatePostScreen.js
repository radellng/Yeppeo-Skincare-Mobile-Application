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
  ScrollView,
  Touchable,
} from "react-native";
import Firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

const CreatePostScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

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

  // Upload Image capability
  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
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
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = Firebase.storage()
      .ref()
      .child(
        "forumImages/" + String(user.uid) + "/" + new Date().toISOString()
      );
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
    //       setUploadedImageUrl(url);
    //       blob.close();
    //       return url;
    //     });
    //   }
    // );
  };

  async function submitPost(title, text) {
    var uploadedUrl = image === null ? null : await uploadImage();
    Firebase.firestore().collection("Posts").add({
      postedBy: username,
      createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
      downvotesCount: 0,
      upvotesCount: 0,
      userURI: imageUrl,
      title: title,
      postText: text,
      updatedAt: Firebase.firestore.FieldValue.serverTimestamp(),
      uploadedImageUrl: uploadedUrl,
    });
    console.log("Post submitted");
  }

  console.log("Create Post Screen loaded");

  return (
    <ScrollView style={{ flex: 1, marginTop: 30 }}>
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
          multiline
          style={{ margin: 20 }}
          value={text}
          onChangeText={(description) => setText(description)}
        />
        <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an image</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image !== null ? (
            <Image source={{ uri: image }} style={styles.imageBox} />
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => {
            submitPost(title, text);
            navigation.navigate("Forum");
          }}
        >
          <Text style={styles.userBtnTxt}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    top: 20,
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "#8ac6d1",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: "center",
  },
  imageBox: {
    width: 300,
    height: 300,
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

export default CreatePostScreen;
