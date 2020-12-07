import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from "react-native";
import Navbar from '../components/Navbar';
import token from '../services/token';
import Moment from 'moment';
import jasminConstants from '../services/jasminConstants';
import queries from "../db/Database";

export default function SupplierOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const title = "Suppliers' Orders";
  const accessToken = token.getToken();
  
  useEffect(() => {
    const apiUrl = jasminConstants.url +"/api/" + jasminConstants.accountKey + "/" + jasminConstants.subscriptionKey + "/purchases/orders";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + accessToken
      }})
      .then((response) => response.json())
      .then((orders) => {setOrders(orders)})
      .finally(setLoading(false));
  }, [])
  return (
    <View style={styles.main}>
      <Navbar navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.supplierColumn}>
              <Text style={styles.header}>{"Supplier"}</Text>
            </View>
            <View style={styles.orderColumn}>
              <Text style={styles.header}>{"Order"}</Text>
            </View>
            <View style={styles.dateColumn}>
              <Text style={styles.header}>{"Date"}</Text>
            </View>
            <View style={styles.statusColumn}>
              <Text style={[styles.header, {textAlign: 'right'}]}>{"Status"}</Text>
            </View>
          </View>
          {orders.map((i) => {
            queries.getClientOrderStatus(i.id).then(response => {
              var status = response;
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("OrderDetailsScreen", {id: 'Supplier ' + i.sellerSupplierPartyName, orderId: i.id, date: i.documentDate, client: false, status: status})}
                >
                  <View style={styles.row} key={i}>
                    <View style={styles.supplierColumn}>
                      <Text style={styles.textTable}>{i.sellerSupplierPartyName}</Text>
                    </View>
                    <View style={styles.orderColumn}>
                      <Text style={styles.textTable}>{i.naturalKey}</Text>
                    </View>
                    <View style={styles.dateColumn}>
                      <Text style={styles.textTable}>{Moment(i.documentDate).format('YYYY/MM/DD')}</Text>
                    </View>
                    <View style={styles.statusColumn}>
                      <Text style={[styles.textTable, {textAlign: 'right'}]}>{status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          })}
        </View>
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
  supplierColumn: { flexDirection: "column", flex: 0.7 },
  orderColumn: { flexDirection: "column", flex: 0.7 },
  dateColumn: { flexDirection: "column", flex: 1 },
  statusColumn: { flexDirection: "column", flex: 0.7 },
});
