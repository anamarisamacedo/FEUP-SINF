import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import { Icon } from "react-native-elements";

const supplierOrders = [
  {
    supplier: "012",
    order: "07863",
    date: "22-10-2020",
    status: "picking",
  },
  {
    supplier: "012",
    order: "07863",
    date: "22-10-2020",
    status: "picking",
  },
  {
    supplier: "013",
    order: "07863",
    date: "24-10-2020",
    status: "shipped",
  },
  {
    supplier: "016",
    order: "07863",
    date: "20-10-2020",
    status: "picking",
  },
];

export default function SupplierOrders({ navigation }) {
  const idName = "Suppliers' Orders";
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.idName}>
          <Text style={styles.text}>{idName}</Text>
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
              <Text style={styles.header}>{"Status"}</Text>
            </View>
          </View>
          {supplierOrders.map((i) => {
            return (
              <View style={styles.row} key={i}>
                <View style={styles.supplierColumn}>
                  <Text style={styles.textTable}>{i.supplier}</Text>
                </View>
                <View style={styles.orderColumn}>
                  <Text style={styles.textTable}>{i.order}</Text>
                </View>
                <View style={styles.dateColumn}>
                  <Text style={styles.textTable}>{i.date}</Text>
                </View>
                <View style={styles.statusColumn}>
                  <Text style={styles.textTable}>{i.status}</Text>
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
  supplierColumn: { flexDirection: "column", flex: 0.7 },
  orderColumn: { flexDirection: "column", flex: 0.7 },
  dateColumn: { flexDirection: "column", flex: 1 },
  statusColumn: { flexDirection: "column", flex: 0.7 },
});
