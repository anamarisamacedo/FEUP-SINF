import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import GeneralButton from "../components/GeneralButton";
import Navbar from "../components/Navbar";
import pickingWaveService from "../services/pickingWaves";
import { AuthProvider } from "../navigation/AuthProvider";

export default function PickingWavesScreen({ navigation }) {
  const title = "Picking Waves";
  const [pw, setPw] = useState([]);
  var username;
  useEffect(() => {
    username = AuthProvider.Username;
    if (typeof username !== "undefined") {
      if (AuthProvider.IsManager) {
        pickingWaveService.getPickingWaves().then((response) => {
          setPw(response);
        });
      } else {
        pickingWaveService
          .getAssociatedPickingWaves(username)
          .then((response) => {
            if (Array.isArray(response)) {
              setPw(response);
            } else {
              setPw([response[Object.keys(response)[0]]]);
            }
          });
      }
    }
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
          <ScrollView
            automaticallyAdjustContentInsets={false}
            onScroll={() => {
              console.log("onScroll!");
            }}
            scrollEventThrottle={200}
            style={styles.scrollView}
          >
            {pw.map((i) => {
              return (
                <View>
                  {typeof i !== "undefined" &&
                    ((!AuthProvider.IsManager &&
                      (i.status == "pending" || i.status == "assigned") && (
                        <View>
                          <View style={styles.row} key={i}>
                            <View style={styles.waveColumn}>
                              <Text style={styles.textTable}>{"000" + i.wave}</Text>
                            </View>
                            <View style={styles.dateColumn}>
                              <Text style={styles.textTable}>
                                {i.createdDate}
                              </Text>
                            </View>
                            <View style={styles.hourColumn}>
                              <Text style={styles.textTable}>
                                {i.createdHour}
                              </Text>
                            </View>
                            <View style={styles.statusColumn}>
                              <Text style={styles.textTable}>{i.status}</Text>
                            </View>
                          </View>
                        </View>
                      )) ||
                      (i.status == "concluded" && (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ConcludedWaveScreen", {
                              pickingWave: i,
                            })
                          }
                        >
                          <View style={styles.row} key={i}>
                            <View style={styles.waveColumn}>
                              <Text style={styles.textTable}>{"000" + i.wave}</Text>
                            </View>
                            <View style={styles.dateColumn}>
                              <Text style={styles.textTable}>
                                {i.createdDate}
                              </Text>
                            </View>
                            <View style={styles.hourColumn}>
                              <Text style={styles.textTable}>
                                {i.createdHour}
                              </Text>
                            </View>
                            <View style={styles.statusColumn}>
                              <Text style={styles.textTable}>{i.status}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )) ||
                      (i.status == "in progress" && (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("PickerWaveScreen", {
                              pickingWave: i,
                            })
                          }
                        >
                          <View style={styles.row} key={i}>
                            <View style={styles.waveColumn}>
                              <Text style={styles.textTable}>{"000" + i.wave}</Text>
                            </View>
                            <View style={styles.dateColumn}>
                              <Text style={styles.textTable}>
                                {i.createdDate}
                              </Text>
                            </View>
                            <View style={styles.hourColumn}>
                              <Text style={styles.textTable}>
                                {i.createdHour}
                              </Text>
                            </View>
                            <View style={styles.statusColumn}>
                              <Text style={styles.textTable}>{i.status}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )) || (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ManagerWaveScreen", {
                              pickingWave: i,
                            })
                          }
                        >
                          <View style={styles.row} key={i}>
                            <View style={styles.waveColumn}>
                              <Text style={styles.textTable}>{"000" + i.wave}</Text>
                            </View>
                            <View style={styles.dateColumn}>
                              <Text style={styles.textTable}>
                                {i.createdDate}
                              </Text>
                            </View>
                            <View style={styles.hourColumn}>
                              <Text style={styles.textTable}>
                                {i.createdHour}
                              </Text>
                            </View>
                            <View style={styles.statusColumn}>
                              <Text style={styles.textTable}>{i.status}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <View style={styles.bottom}>
        <GeneralButton
          name="generate new picking wave"
          fontSize={14}
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
  scrollView: { height: Dimensions.get("window").height - 350 },
});
