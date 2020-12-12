import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, Button, TouchableOpacity, InteractionManager } from "react-native";
import GeneralButton from "../components/GeneralButton";
import Navbar from '../components/Navbar';
import jasminConstants from '../services/jasminConstants';
import token from '../services/token';
import queries from "../db/Database";
import functions from "../logic/pickingWaveGen";

export default function GeneratePickingWaveScreen({ navigation }) {
  const title = "Generate Picking Wave";
  const [value, onChangeText] = useState("0");
  const [orders, setOrders] = useState([]); 
  const [ordersQtyPw, setOrdersQtyPw] = useState({});
  const [execFunc, setExecFunc] = useState(true);
  const accessToken = token.getToken();

  useEffect(() => {
    if (execFunc) {
      setExecFunc(false);
      queries.getClientOrdersQtyPW().then(orders => {
        setOrdersQtyPw(orders);
      });
      const apiUrl = jasminConstants.url +"/api/" + jasminConstants.accountKey + "/" + jasminConstants.subscriptionKey + "/sales/orders";
      fetch(apiUrl, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + accessToken
        }})
        .then((response) => response.json())
        .then((orders) => {setOrders(orders)})
    }
  })

  function generatePW() {
    let ordersPw = [];
    orders.forEach(order => {
      let items = [];
      order.documentLines.forEach(item => {
        let qtyPW = (order.id in ordersQtyPw && typeof ordersQtyPw[order.id][item.salesItem] !== 'undefined')? ordersQtyPw[order.id][item.salesItem] : 0;
        items.push({ref: item.salesItem, qty: item.quantity, qtyPW: qtyPW, loc: item.warehouse, name: item.salesItemDescription});
      });
      ordersPw.push({id: order.id, items: items, pwRatio: functions.calculatePWRatio(items), date: order.createdOn});
    });
    functions.generatePickingWave(ordersPw, value);
    navigation.navigate('PickingWavesScreen');
  }

  const onCheckLimit = (text, limit) => {
    const parsedQty = Number.parseInt(text);
    if (Number.isNaN(parsedQty)) {
      onChangeText(0);
    } else if (parsedQty > limit) {
      onChangeText(limit);
    } else {
      onChangeText(parsedQty);
    }
  };

  return (
    <View style={styles.main}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.text2}> Max Number of Products: </Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder={0}
          onChangeText={(text) => onCheckLimit(text, 10)}
          value={value}
          maxLength={10}
        />
      </View>
      <View style={styles.bottom}>
        <GeneralButton
          name="Generate Picking Wave"
          fontSize={14}
          onPress={() => generatePW()}
        />
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
    fontSize: 23,
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
    fontSize: 18,
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10em",
    marginLeft: "5em",
  },
  waveColumn: { flexDirection: "column", flex: 0.6 },
  dateColumn: { flexDirection: "column", flex: 0.9 },
  hourColumn: { flexDirection: "column", flex: 0.6 },
  statusColumn: { flexDirection: "column", flex: 0.9 },

  text2: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
  },

  input: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    width: 50,
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});
