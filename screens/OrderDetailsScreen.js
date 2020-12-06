import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";

import BackButton from "../components/BackButton";
import Navbar from '../components/Navbar';
import token from '../services/token';
import jasminConstants from '../services/jasminConstants';

export default function OrderDetails({ navigation, route }) {
  const {id, orderId, date, client} = route.params;

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setLoading] = useState(true);
  const accessToken = token.getToken();
  
  var sales = "/sales";
  if (!client)
    sales = "/purchases";
  const apiUrl = jasminConstants.url + "/api/" + jasminConstants.accountKey + "/" + jasminConstants.subscriptionKey + sales + "/orders/" + orderId;

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + accessToken
      }})
      .then((response) => response.json())
      .then((order) => {setItems(order.documentLines), setTitle("Order " + order.naturalKey + " " + id)})
      .finally(setLoading(false));
  }, [])

  const subtitle = "Date: " + date + " Status: " + "TODO"; //todo - status

  return (
    <View style={styles.main}>
      <Navbar navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtext}>{subtitle}</Text>
        </View>
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
            <View style={styles.pqtyColumn}>
              <Text style={[styles.header, {textAlign: 'center'}]}>{"P/Qty"}</Text>
            </View>
          </View>
          {items.map((i) => {
            return (
              <View style={styles.row} key={i}>
                <View style={styles.refColumn}>
                  <Text style={styles.textTable}>{i.salesItem}</Text>
                </View>
                <View style={styles.locColumn}>
                  <Text style={styles.textTable}>{i.warehouse}</Text>
                </View>
                <View style={styles.nameColumn}>
                  <Text style={styles.textTable}>{i.salesItemDescription}</Text>
                </View>
                <View style={styles.pqtyColumn}>
                  <Text style={[styles.textTable, {textAlign: 'center'}]}>{i.quantity}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.bottom}>
        <BackButton onPress={() => navigation.goBack()}/>
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
  subtext: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 15,
  },
  title: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  subtitle: {
    marginBottom: 40,
    flexDirection: "row",
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
  pqtyColumn: { flexDirection: "column", flex: 0.5 },
});
