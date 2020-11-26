import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import BackButton from "../components/BackButton";

const wave = [
  {
    ref: "10150",
    loc: "A.1.1.1",
    name: "AMD Ryzen 5 3600",
    pqty: "3/3",
  },
  {
    ref: "10151",
    loc: "A.1.1.2",
    name: "AMD Ryzen 5 3600X",
    pqty: "0/4",
  },
  {
    ref: "10152",
    loc: "A.1.1.3",
    name: "AMD Ryzen 7 3700",
    pqty: "2/3",
  },
  {
    ref: "10153",
    loc: "A.1.1.4",
    name: "AMD Ryzen 7 3700X",
    pqty: "2/2",
  },
];

export default function PickerWaveScreen({ navigation }) {
  const pickingWave = navigation.getParam('pickingWave');
  const title = "Picking Wave " + pickingWave.wave;
  const subtitle = "Picker:                              Status: ";
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtext}>{subtitle}</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.locColumn}>
              <Text style={styles.header}>{"Loc"}</Text>
            </View>
            <View style={styles.refColumn}>
              <Text style={styles.header}>{"Ref"}</Text>
            </View>
            <View style={styles.nameColumn}>
              <Text style={styles.header}>{"Name"}</Text>
            </View>
            <View style={styles.pqtyColumn}>
              <Text style={styles.header}>{"P/Qty"}</Text>
            </View>
          </View>
          {wave.map((i) => {
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
                <View style={styles.pqtyColumn}>
                  <Text style={styles.textTable}>{i.pqty}</Text>
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
