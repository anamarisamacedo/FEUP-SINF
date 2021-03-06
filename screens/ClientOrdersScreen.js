import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Navbar from '../components/Navbar';
import token from '../services/token';
import Moment from 'moment';
import jasminConstants from '../services/jasminConstants';
import queries from "../db/orders";
import { useIsFocused } from "@react-navigation/native";

export default function ClientOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState({});
  const title = "Clients' Orders";
  const accessToken = token.getToken();

  const isFocused = useIsFocused();

  useEffect(() => {
    const apiUrl = jasminConstants.url + "/api/" + jasminConstants.accountKey + "/" + jasminConstants.subscriptionKey + "/sales/orders";
    var bar = new Promise((resolve, reject) => {
      fetch(apiUrl, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + accessToken
        }
      })
        .then((response) => response.json())
        .then((orders) => {
          setOrders(orders);
          resolve(orders)
        })
    });

    bar.then((orders) => {
      let statusTemp = {};
      queries.getClientOrders().then(ordersDB => {
        orders.map((i) => {
          let orderStatus;
          if(!(i.id in ordersDB)) {
            queries.addClientOrder(i.id, i.naturalKey);
            orderStatus = 'WFP';
          } else {
            orderStatus = ordersDB[i.id].status;
          }
          statusTemp[i.id] = orderStatus;
        });
        setStatus(statusTemp);
      });
    });
  }, [isFocused]);

  return (
    <View style={styles.main}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.clientColumn}>
              <Text style={styles.header}>{"Client"}</Text>
            </View>
            <View style={styles.orderColumn}>
              <Text style={styles.header}>{"Order"}</Text>
            </View>
            <View style={styles.dateColumn}>
              <Text style={styles.header}>{"Date"}</Text>
            </View>
            <View style={styles.statusColumn}>
              <Text style={[styles.header, { textAlign: 'right' }]}>{"Status"}</Text>
            </View>
          </View>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            onScroll={() => { console.log('onScroll!'); }}
            scrollEventThrottle={200}
            style={styles.scrollView}>
            {orders.map((i) => {
              //console.log(i.id); console.log(status); console.log(status[i.id])
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('OrderDetailsScreen', { id: 'Client ' + i.buyerCustomerParty, orderId: i.id, date: i.documentDate, client: true, status: status.get(i.id), items: i.documentLines, naturalKey: i.naturalKey })}
                >
                  <View style={styles.row} key={i}>
                    <View style={styles.clientColumn}>
                      <Text style={styles.textTable}>{i.buyerCustomerParty}</Text>
                    </View>
                    <View style={styles.orderColumn}>
                      <Text style={styles.textTable}>{i.naturalKey}</Text>
                    </View>
                    <View style={styles.dateColumn}>
                      <Text style={styles.textTable}>{Moment(i.documentDate).format('YYYY/MM/DD')}</Text>
                    </View>
                    <View style={styles.statusColumn}>
                      <Text style={[styles.textTable, { textAlign: 'right' }]}>{status[i.id]}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
    height: 40,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "darkgray",
    marginTop: 4,
  },
  clientColumn: { flexDirection: "column", flex: 0.7 },
  orderColumn: { flexDirection: "column", flex: 1 },
  dateColumn: { flexDirection: "column", flex: 0.8 },
  statusColumn: { flexDirection: "column", flex: 0.9 },
  scrollView: { height: Dimensions.get('window').height - 300 }
});