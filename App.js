import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import StockListing from "./components/StockListing";
import { Header } from "react-native-elements";

export default function App() {
  return (
    <View style={styles.main}>
      <StatusBar style="auto" />
      <Header
        containerStyle={{
          backgroundColor: "black"
        }}
        leftComponent={{ icon: "menu", color: "white" }}
        centerComponent={<Image
          source={require('./assets/logo.png')}
        />}
        rightComponent={{ icon: "person", color: "white" }}
      />
      <View style={styles.container}>
        <StockListing id="A1" name="CPU"/>
      </View>
    </View>
  );
}

const stockList = [
  {
    ref: "10150",
    loc: "A1.1.1",
    name: "AMD Ryzen 5 3600",
    stock: "28/50",
  },
  {
    ref: "10151",
    loc: "A1.1.2",
    name: "AMD Ryzen 5 3600X",
    stock: "12/50",
  },
];

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
  },
  container: {
    justifyContent: "space-evenly",
    marginHorizontal: 15,
  },
  row: {
    paddingVertical: 50,
  },
});
