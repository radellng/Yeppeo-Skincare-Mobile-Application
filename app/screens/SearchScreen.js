import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import Searchbar from "../shared/SearchBar";
import * as data from "../shared/skincare.json";
import * as Firebase from "firebase";

const skincareData = require("../shared/skincare.json");

const SearchScreen = ({ route, navigation }) => {
  const [fileteredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState([]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  // change this to firebase collection
  const fetchData = () => {
    setfilteredData(skincareData);
    setmasterData(skincareData);
  };

  //change this to how u want to view each item
  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}
        {". "}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setsearch(text);
    } else {
      setfilteredData(masterData);
      setsearch(text);
    }
  };

  console.log("Search Page loaded.");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Searchbar
          value={search}
          updateSearch={searchFilter}
          style={{ marginTop: 10 }}
        />
      </View>
      <FlatList
        data={fileteredData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
});
