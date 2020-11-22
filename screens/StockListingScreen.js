import React from "react";
import StockListing from '../components/StockListing';
import { StyleSheet, Image, View, Dimensions, StatusBar } from "react-native";

export default function StockListingScreen({ navigation }) {
  return (
    <View style={styles.main}>
      <StatusBar style="auto" />
      {/* <Header
        containerStyle={{
          backgroundColor: "black"
        }}
        leftComponent={{ icon: "menu", color: "white" }}
        centerComponent={<Image
          source={require('./assets/logo.png')}
        />}
        rightComponent={{ icon: "person", color: "white" }}
      /> */}
      <View style={styles.container}>
        <StockListing id="A1" name="CPU" />
      </View>
    </View>
  );
};

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
