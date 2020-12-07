import React, {useState, useEffect} from "react";
import Navbar from '../components/Navbar'; 
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import BackButton from "../components/BackButton";
import db from "../db/pickingWaves";


export default function OPScreen({ navigation }) {
  const title = "Outpoint View";
  const [items, setItems] = useState([]);
  var itemsMapToArray = [];
  var itemCount = new Map();
  var count;
  useEffect(() => {
    db.getPickingWaves().then((pickingWaves) => {
      
    pickingWaves.map((pw) => {
      (pw.items).map((item) => {
        if(!itemCount.has(item.ref)){
          itemCount.set(item.ref, item.picked)
        }else{
          count = itemCount.get(item.ref) + item.picked
          itemCount.set(item.ref, count)
        }
      })
    })
    itemCount.forEach((value,key) => {
      itemsMapToArray.push({ref: key, qty: value})
    })
    setItems(itemsMapToArray)
    console.log(items);
  })
})
  return (
    <View style={styles.main}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.refColumn}>
              <Text style={styles.header}>{"Ref"}</Text>
            </View>
            <View style={styles.nameColumn}>
              <Text style={styles.header}>{"Name"}</Text>
            </View>
            <View style={styles.qtyColumn}>
              <Text style={[styles.header, {textAlign: 'right'}]}>{"Qtd"}</Text>
            </View>
          </View>
          {items.map((i) => {
            return (
              <View style={styles.row} key={i}>
                <View style={styles.refColumn}>
                  <Text style={styles.textTable}>{i.ref}</Text>
                </View>
                <View style={styles.nameColumn}>
                  <Text style={styles.textTable}>{i.name}</Text>
                </View>
                <View style={styles.qtyColumn}>
                  <Text style={[styles.textTable, {textAlign: 'right'}]}>{i.qty}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.bottom}>
        <BackButton onPress={() => navigation.goBack()} />
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
    marginHorizontal: 15
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
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "darkgray",
    marginTop: 4,
  },
  refColumn: { flexDirection: "column", flex: 0.8 },
  nameColumn: { flexDirection: "column", flex: 1.5 },
  qtyColumn: { flexDirection: "column", flex: 0.7 },
});
