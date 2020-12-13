import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from "react-native";

import BackButton from "../components/BackButton";
import Navbar from '../components/Navbar';
import Moment from 'moment';

export default function OrderDetails({ navigation, route }) {
  const {id, orderId, date, client, status, items, naturalKey} = route.params;

  
  const title = "Order " + naturalKey + " " + id;

  const subtitle = "Date: " + Moment(date).format('YYYY/MM/DD') + " Status: " + status;

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
              <ScrollView
                automaticallyAdjustContentInsets={false}
                onScroll={() => { console.log('onScroll!'); }}
                scrollEventThrottle={200}
                style={styles.scrollView}
              >
                {items.map((i) => {
                  var item = i.salesItem;
                  var itemDescription = i.salesItemDescription
                  if (!client){
                    item = i.purchasesItem;
                    itemDescription = i.purchasesItemDescription;
                  }  
                  return (
                    <View style={styles.row} key={i}>
                      <View style={styles.refColumn}>
                        <Text style={styles.textTable}>{item}</Text>
                      </View>
                      <View style={styles.locColumn}>
                        <Text style={styles.textTable}>{i.warehouse}</Text>
                      </View>
                      <View style={styles.nameColumn}>
                        <Text style={styles.textTable}>{itemDescription}</Text>
                      </View>
                      <View style={styles.pqtyColumn}>
                        <Text style={[styles.textTable, {textAlign: 'center'}]}>{i.quantity}</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
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
    fontSize: 23,
  },
  subtext: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 17,
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
  refColumn: { flexDirection: "column", flex: 0.6 },
  locColumn: { flexDirection: "column", flex: 0.6 },
  nameColumn: { flexDirection: "column", flex: 1.5 },
  pqtyColumn: { flexDirection: "column", flex: 0.5 },
  scrollView: {height: Dimensions.get('window').height - 400}
});
