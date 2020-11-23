import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import { Icon } from "react-native-elements";

const stockList = [
  {
    ref: "10150",
    loc: "A1.1.1",
    name: "AMD Ryzen 5 3600",
    stock: "28/50",
  },
  {
    ref: "10151",
    loc: "A1.1.2",
    name: "AMD Ryzen 5 3600X",
    stock: "12/50",
  },
  {
    ref: "10152",
    loc: "A1.1.3",
    name: "AMD Ryzen 4 3600X",
    stock: "48/50",
  },
  {
    ref: "10153",
    loc: "A1.1.4",
    name: "AMD Ryzen 2 3600X",
    stock: "32/50",
  },
];

//<Icon name="archive" type="font-awesome" color="white" size='1'/>

export default function StockListingScreen({ navigation, route }) {
  //const { id, name } = route.params;
  //const idName = JSON.stringify(id) + " " + JSON.stringify(name);
  const idName = "A1 CPU";
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.idName}>
          <Text style={styles.text}>{idName}</Text>
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
            <View style={styles.stockColumn}>
              <Text style={styles.header}>{"Stock"}</Text>
            </View>
          </View>
          {stockList.map((i) => {
            return (
              <View style={styles.row} key={i}>
                <View style={styles.refColumn}>
                  <Text style={styles.textTable}>{i.ref}</Text>
                </View>
                <View style={styles.locColumn}>
                  <Text style={styles.textTable}>{i.loc}</Text>
                </View>
                <View style={styles.nameColumn}>
                  <Text style={styles.textTable}>{i.name}</Text>
                </View>
                <View style={styles.stockColumn}>
                  <Text style={styles.textTable}>{i.stock}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.bottom}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" color='#a9a9a9' />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    alignItems: 'center'
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
    alignItems: 'center'
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
  idName: {
    marginTop: 50,
    marginBottom: 40,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  header: {
    textAlign: "left",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontWeight: "bold",
    fontSize: 16,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  textTable: {
    textAlign: "left",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 16,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
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
