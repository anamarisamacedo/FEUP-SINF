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
        <StockListing idName="A1 CPU" />
      </View>
    </View>
  );
}

const list = [
  {
    title: "Appointments",
    icon: "av-timer",
  },
  {
    title: "Trips",
    icon: "flight-takeoff",
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
