import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from "react-native";
import Navbar from '../components/Navbar';
import token from '../services/token';
import Moment from 'moment';

const accountKey = "242968"; // TODO: put your account key here
const subscriptionKey = "242968-0001"; // TODO: put your account key here
const urlJ = "https://my.jasminsoftware.com/";

export default function SupplierOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const title = "Suppliers' Orders";
  const accessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDY3NDk3OTUsImV4cCI6MTYwNjc2NDE5NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.Zhc0-5xPiNiuI---U-nq72UhFEBsKpv_qMWSnGUisUGn5umR35H9bk35UZwwBjZfNSnPXRJQjxlE5T_taEF7refWavrewpTuXCdelFGhcSo5AdJLpcVLEAUrBgjHbPRe23Z1g_c2GABYgiwrUg5LrIc64CZs0mhSG4VyOHcQZr8Qin7MPy9CRm0WpDHcgDj2c_gggOY80eP2tgtxpQlFXiN-nqgCkKLlqmJIJe413jgqFGQpkFfTEo1HPFMFMT1fpaGbIlZQN3z2HKOBkMCu55Yz9iWLjon4S2l2fsizddG6YLQ7OgW20h0yhym_nWFApaBFyp5m-RCnpRJ2QMIrpw"; // TODO: put the authorization access token here (this should be obtained previously)
  //const accessToken = token.getToken();
  useEffect(() => {
    const apiUrl = urlJ+"/api/" + accountKey+ "/" + subscriptionKey + "/purchases/orders";
    console.log(apiUrl)
    fetch(apiUrl, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + accessToken
      }})
      .then((response) => response.json())
      .then((orders) => {setOrders(orders), console.log(orders)})
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
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("OrderDetailsScreen", {id: 'Client ' + i.sellerCustomerParty, orderId: i.naturalKey, date: i.documentDate})}
              >
                <View style={styles.row} key={i}>
                  <View style={styles.supplierColumn}>
                    <Text style={styles.textTable}>{i.sellerCustomerParty}</Text>
                  </View>
                  <View style={styles.orderColumn}>
                    <Text style={styles.textTable}>{i.naturalKey}</Text>
                  </View>
                  <View style={styles.dateColumn}>
                    <Text style={styles.textTable}>{Moment(i.documentDate).format('YYYY/MM/DD')}</Text>
                  </View>
                  <View style={styles.statusColumn}>
                    <Text style={[styles.textTable, {textAlign: 'right'}]}>{"X"}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
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
