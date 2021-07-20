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

const ViewPostScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [comments, setComments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // Create a function for refreshing the comments page
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getComments(item.createdAt);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // Extract information from item
  function getComments(postTime) {
    Firebase.firestore()
      .collection("transaction")
      .where("createdAt", "==", postTime)
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
      });
  }

  getComments(item.createdAt);

  const renderItem = ({ comments }) => (
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
          source={{ uri: comments.userURI }}
          size="small"
          style={{ marginRight: 16, height: 50, width: 50 }}
        />
        <Text>{comments.postedBy}: </Text>
        <Text style={{ flex: 1 }} category="s1">
          {comments.comment}
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
      <View flexDirection="row" style={{ flex: 1, alignSelf: "flex-end" }}>
        <TouchableOpacity
        // onPress={() => {
        //   upvote(comment.createdAt);
        // }}
        >
          <Entypo name="arrow-bold-up" color="#00ff00" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18 }}>
          {comments.upvotesCount - comments.downvotesCount}
        </Text>
        <TouchableOpacity
        // onPress={() => {
        //   downvote(comments.createdAt);
        // }}
        >
          <Entypo name="arrow-bold-down" color="#ff0000" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <Text>This is the view post screen.</Text>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={comments.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewPostScreen;
