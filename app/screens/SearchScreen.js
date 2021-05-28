import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
  TextInput,
} from "react-native";
import Searchbar from "../shared/SearchBar";

const SearchScreen = ({ route, navigation }) => {
  const [value, setValue] = useState();
  function updateSearch(value) {
    // To do search logic here in the future!!
    console.log(value);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Searchbar
          value={value}
          updateSearch={updateSearch}
          style={{ marginTop: 10 }}
        />
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            You are on Search Screen
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

export default SearchScreen;
