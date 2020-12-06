import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import GeneralButton from "../components/GeneralButton";
import Navbar from "../components/Navbar";
import pickingWaveService from "../services/pickingWaves";
import AuthProvider from "../navigation/AuthProvider";
import db from '../db/Database';

export default function PickingWavesScreen({ navigation }) {
  const title = "Picking Waves";
  const [pw, setPw] = useState([]);
  var nextScreen;
  useEffect(() => {
    pickingWaveService.getPickingWaves().then((response) => {
      setPw(response);
    });
  });
  return (
    <View style={styles.main}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.waveColumn}>
              <Text style={styles.header}>{"Wave"}</Text>
            </View>
            <View style={styles.dateColumn}>
              <Text style={styles.header}>{"Date"}</Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.header}>{"Hour"}</Text>
            </View>
            <View style={styles.statusColumn}>
              <Text style={styles.header}>{"Status"}</Text>
            </View>
          </View>
          {pw.map((i) => {
            if (i.status == "concluded") {
              nextScreen = "ConcludedWaveScreen";
            } else if (i.status == "in progress") {
              nextScreen = "PickerWaveScreen";
            } else if (i.status == "pending" || i.status == "assigned") {
              if (db.isManager() == true) {
                nextScreen = "ManagerWaveScreen";
              }
            }

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(nextScreen, { pickingWave: i })
                }
              >
                <View style={styles.row} key={i}>
                  <View style={styles.waveColumn}>
                    <Text style={styles.textTable}>{i.wave}</Text>
                  </View>
                  <View style={styles.dateColumn}>
                    <Text style={styles.textTable}>{i.createdDate}</Text>
                  </View>
                  <View style={styles.hourColumn}>
                    <Text style={styles.textTable}>{i.createdHour}</Text>
                  </View>
                  <View style={styles.statusColumn}>
                    <Text style={styles.textTable}>{i.status}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.bottom}>
        <GeneralButton
          name="Generate Picking Wave"
          onPress={() => navigation.navigate("GeneratePickingWaveScreen")}
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
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "darkgray",
    marginTop: 4,
  },
  waveColumn: { flexDirection: "column", flex: 0.6 },
  dateColumn: { flexDirection: "column", flex: 0.9 },
  hourColumn: { flexDirection: "column", flex: 0.6 },
  statusColumn: { flexDirection: "column", flex: 0.9 },
});
