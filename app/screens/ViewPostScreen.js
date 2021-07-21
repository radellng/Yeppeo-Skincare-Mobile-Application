import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import Firebase from "firebase";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ViewPostScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [comments, setComments] = useState([]);
  const [voteCount, setVoteCount] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // Create a function for refreshing the comments page
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Firebase.firestore()
      .collection("Posts")
      .where("createdAt", "==", item.createdAt)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs[0].ref.collection("Comments").get();
      })
      .then((querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setComments(data);
        console.log("Comment page data fetched");
      });

    console.log("Comments refreshed");
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // Extract information from item
  useEffect(() => {
    Firebase.firestore()
      .collection("Posts")
      .where("createdAt", "==", item.createdAt)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs[0].ref.collection("Comments").get();
      })
      .then((querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setComments(data);
        console.log("Comment page data fetched");
      });
  }, []);

  console.log("Comment page loaded");

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: "#f4f4f4", marginBottom: 25 }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          borderWidth: 1,
          borderColor: "#000000",
        }}
      >
        <Image
          source={{ uri: item.userURI }}
          size="small"
          style={{ marginRight: 15, height: 50, width: 50 }}
        />
        <Text
          style={{
            flexShrink: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              flexShrink: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              fontWeight: "bold",
            }}
          >
            {item.postedBy}:{"\n"}
          </Text>
          <Text
            style={{
              flexShrink: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            {item.comment}
          </Text>
        </Text>
      </View>
    </View>
  );

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

  function showEmptyListView() {
    return (
      <View style={{ backgroundColor: "#f4f4f4", marginBottom: 25 }}>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              flexShrink: 1,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            No comments yet, be the first to leave a comment!
          </Text>
        </View>
      </View>
    );
  }

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
          <FlatList
            data={comments}
            renderItem={renderItem}
            keyExtractor={comments.id}
            ListEmptyComponent={showEmptyListView()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
        <TouchableOpacity
          style={{ position: "absolute", bottom: 10, right: 10 }}
          onPress={() => {
            navigation.navigate("CreateComment", {
              item: item,
            });
          }}
        >
          <MaterialIcons name="add-comment" size={50} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewPostScreen;
