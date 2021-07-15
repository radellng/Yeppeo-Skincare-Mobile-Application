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

const ViewPostScreen = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 90,
        }}
      >
        <Text>This is the view post screen.</Text>
        <Text>item: {JSON.stringify(item)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewPostScreen;
