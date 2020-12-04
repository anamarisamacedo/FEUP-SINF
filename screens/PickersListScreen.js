import React from "react";
import Navbar from '../components/Navbar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import BackButton from "../components/BackButton";

const pickersList = [
  {
    code: "001",
    name: "Trevor Crime Noah",
    assignedWaves: "2",
  },
  {
    code: "002",
    name: "Veronica Mars",
    assignedWaves: "3",
  },
  {
    code: "003",
    name: "Sherlock Holmes",
    assignedWaves: "0",
  },
  {
    code: "004",
    name: "Paul McCartney",
    assignedWaves: "5",
  },
];

export default function PickersListScreen({ navigation, route }) {
  const title = "Pickers";
  return (
    <View style={styles.main}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.codeColumn}>
              <Text style={styles.header}>{"Code"}</Text>
            </View>
            <View style={styles.nameColumn}>
              <Text style={styles.header}>{"Name"}</Text>
            </View>
            <View style={styles.awColumn}>
              <Text style={styles.header}>{"Assigned Waves"}</Text>
            </View>
          </View>
          {pickersList.map((i) => {
            return (
              <View style={styles.row} key={i}>
                <View style={styles.codeColumn}>
                  <Text style={styles.textTable}>{i.code}</Text>
                </View>
                <View style={styles.nameColumn}>
                  <Text style={styles.textTable}>{i.name}</Text>
                </View>
                <View style={styles.awColumn}>
                  <Text style={styles.textTable}>{i.assignedWaves}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
  },
  container: {
    justifyContent: "space-evenly",
    marginHorizontal: 15
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
  codeColumn: { flexDirection: "column", flex: 0.6 },
  nameColumn: { flexDirection: "column", flex: 1.5 },
  awColumn: { flexDirection: "column", alignItems:'center', flex: 1 },
});
