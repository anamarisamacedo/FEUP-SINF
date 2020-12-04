import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import BackButton from "../components/BackButton";
import token from '../services/token';

const accountKey = "242968"; // TODO: put your account key here
const subscriptionKey = "242968-0001"; // TODO: put your account key here
const urlJ = "https://my.jasminsoftware.com/";  

export default function StockListingScreen({ navigation, route }) {
  const [stock, setStock] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { id, name } = route.params;
  const title = id + " " + name;
  const accessToken = token.getToken();

  useEffect(() => {
    const apiUrl = urlJ + "/api/" + accountKey + "/" + subscriptionKey + "/materialscore/materialsitems";
    
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((materials) => setStock(materials))
      .finally(setLoading(false));
  }, []);
  return (
    <View style={styles.main}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={styles.row}>
              <View style={styles.refColumn}>
                <Text style={styles.header}>{"Ref"}</Text>
              </View>
              <View style={styles.locColumn}>
                <Text style={styles.header}>{"Loc"}</Text>
              </View>
              <View style={styles.nameColumn}>
                <Text style={styles.header}>{"Name"}</Text>
              </View>
              <View style={styles.stockColumn}>
                <Text style={styles.header}>{"Stock"}</Text>
              </View>
            </View>
            {stock.map((i) => {
              if(i.defaultWarehouse == id){
              return (
                <View style={styles.row} key={i}>
                  <View style={styles.refColumn}>
                    <Text style={styles.textTable}>{i.itemKey}</Text>
                  </View>
                  <View style={styles.locColumn}>
                    <Text style={styles.textTable}>{"X"}</Text>
                  </View>
                  <View style={styles.nameColumn}>
                    <Text style={styles.textTable}>{i.description}</Text>
                  </View>
                  <View style={styles.stockColumn}>
              <Text style={styles.textTable}>{"X"}</Text>
                  </View>
                </View>
              )};
            })}
          </View>
        )}
      </View>
      <View style={styles.bottom}>
        <BackButton onPress={() =>  navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    alignItems: "center",
  },
  main: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
  },
  container: {
    justifyContent: "space-evenly",
    marginHorizontal: 15,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
    alignItems: "center",
  },
  list: {
    backgroundColor: "black",
  },
  text: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 19,
  },
  title: {
    marginTop: 50,
    marginBottom: 40,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  header: {
    textAlign: "left",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontWeight: "bold",
    fontSize: 16,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  textTable: {
    textAlign: "left",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 16,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  row: {
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "darkgray",
    marginTop: 4,
  },
  refColumn: { flexDirection: "column", flex: 0.6 },
  locColumn: { flexDirection: "column", flex: 0.6 },
  nameColumn: { flexDirection: "column", flex: 1.5 },
  stockColumn: { flexDirection: "column", flex: 0.5 },
});
