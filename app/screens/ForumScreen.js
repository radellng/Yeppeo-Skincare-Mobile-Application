import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  FlatList,
  Text,
  RefreshControl,
  ScrollView,
  Button,
  Touchable,
} from "react-native";
import Firebase from "firebase";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { ScrollView } from "react-native-gesture-handler";
// import { Text, Avatar, withStyles, List } from "react-native-ui-kitten";

const ForumScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [voteCount, setVoteCount] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // Create a function for refreshing the forum page
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts();
    console.log("forum refreshed");
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // Initial fetching of posts without useEffect
  const getPosts = React.useCallback(() => {
    Firebase.firestore()
      .collection("Posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
      });
  }, [posts]);

  console.log("forum page");

  // useEffect(() => {
  //   // Hook to handle the initial fetching of posts
  //   Firebase.firestore()
  //     .collection("Posts")
  //     .orderBy("createdAt", "desc")
  //     .onSnapshot((querySnapshot) => {
  //       let data = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       setPosts(data);
  //     });
  // }, [posts]);

  function upvote(postTime) {
    Firebase.firestore()
      .collection("Posts")
      .where("createdAt", "==", postTime)
      .get()
      .then((query) => {
        const thing = query.docs[0];
        let tmp = thing.data();
        tmp.upvotesCount = tmp.upvotesCount + 1;
        console.log(tmp);
        thing.ref.update(tmp);
      });
  }

  function downvote(postTime) {
    Firebase.firestore()
      .collection("Posts")
      .where("createdAt", "==", postTime)
      .get()
      .then((query) => {
        const thing = query.docs[0];
        let tmp = thing.data();
        tmp.downvotesCount = tmp.downvotesCount + 1;
        console.log(tmp);
        thing.ref.update(tmp);
      });
  }

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: "#f4f4f4", marginBottom: 25 }}>
      {/* <Image
        source={{ uri: item.imageURI }}
        style={this.props.themedStyle.cardImage}
      /> */}
      <View
        style={{
          padding: 10,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#000000",
        }}
      >
        <Image
          source={{ uri: item.userURI }}
          size="small"
          style={{ marginRight: 16, height: 50, width: 50 }}
        />
        <Text>{item.postedBy}: </Text>
        <Text style={{ flex: 1 }} category="s1">
          {item.title}
        </Text>

        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Profile")}
        >
          <Avatar
            source={{ uri: item.avatarURI }}
            size="small"
            style={this.props.themedStyle.cardAvatar}
          />
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: "#000000",
        }}
      >
        <Text style={{ flex: 1 }} category="p2">
          {item.postText}
        </Text>
      </View>
      <View flexDirection="row" style={{ flex: 1, alignSelf: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ViewPost", {
              item: item,
            });
          }}
        >
          <MaterialIcons name="add-comment" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            upvote(item.createdAt);
          }}
        >
          <Entypo name="arrow-bold-up" color="#00ff00" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18 }}>
          {item.upvotesCount - item.downvotesCount}
        </Text>
        <TouchableOpacity
          onPress={() => {
            downvote(item.createdAt);
          }}
        >
          <Entypo name="arrow-bold-down" color="#ff0000" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            this is the forum
          </Text> */}
          {/* <TouchableOpacity onPress={refreshForum()}>
            <MaterialIcons name="refresh" size={30} />
          </TouchableOpacity> */}
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={posts.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
        {/* <>
          <TouchableOpacity
            style={{
              alignItems: "center",
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
            onpress={() => {
              console.log("naivgate to create post");
              navigation.navigate("CreatePost");
            }}
          >
            <Image
              source={require("../assets/add.png")}
              resizeMode="contain"
              style={{
                height: 50,
                width: 50,
              }}
            />
          </TouchableOpacity>
        </> */}
      </View>
    </SafeAreaView>
  );
};

export default ForumScreen;
