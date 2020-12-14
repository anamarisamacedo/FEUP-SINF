import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { CheckBox } from "react-native-elements";
import pickersService from "../services/picker";
import pickingWaves from "../services/pickingWaves";
import { useIsFocused } from "@react-navigation/native";
import db from "../db/accounts";

export default function PickersListScreen({ navigation, route }) {
  const title = "Pickers";

  const [pickers, setPickers] = useState([]);
  const [isChecked, setChecked] = useState(new Map());
  var pickersAux = [];
  var inputs = new Map();
  const [input, setInput] = useState(new Map());
  const onCheck = (pickerUsername) => {
    if (isChecked.get(pickerUsername) == false) {
      //inputs = isChecked;
      inputs.set(pickerUsername,true);
      setChecked(inputs);
      db.assignManager(pickerUsername);
    } else {
      //inputs = isChecked;
      inputs.set(pickerUsername,false);
      setChecked(inputs);
      console.log(isChecked)
      db.unssignManager(pickerUsername);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    pickersService.getPickers().then((response) => {
      var bar = new Promise((resolve, reject) => {
        Object.entries(response).forEach((entry, index, array) => {
          inputs.set(entry[0], false);
          setChecked(inputs);
          pickingWaves.getPWNum(entry[0]).then((response2) => {
            pickersAux.push({ name: entry[0], assignedWaves: response2 });
            if (index === array.length - 1) resolve();
          });
        });
      });
      bar.then(() => {
        setChecked(inputs);
        setPickers(pickersAux);
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
          <View style={styles.rowHeader}>
            <View style={styles.nameColumn}>
              <Text style={styles.header}>{"Name"}</Text>
            </View>
            <View style={styles.awColumn}>
              <Text style={styles.header}>{"Assigned Waves"}</Text>
            </View>
            <View style={styles.managerColumn}>
              <Text style={styles.header}>{"Manager"}</Text>
            </View>
          </View>
          {pickers.map((i) => {
            return (
              <View style={styles.row} key={i}>
                <View style={styles.nameColumn}>
                  <Text style={styles.textTable}>{i.name}</Text>
                </View>
                <View style={styles.awColumn}>
                  <Text style={styles.textTable}>{i.assignedWaves}</Text>
                </View>
                <View style={styles.managerColumn}>
                  <CheckBox
                    size="19"
                    center
                    iconRight
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isChecked.get(i.name)}
                    onPress={() =>  onCheck(i.name)}
                  />
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
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderRadius: 2,
    borderWidth: 1,
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
    fontSize: 17,
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
  rowHeader: {
    height: 50,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "darkgray",
    marginTop: 4,
  },
  nameColumn: { flexDirection: "column", flex: 1 },
  awColumn: { flexDirection: "column", alignItems: "center", flex: 1 },
  managerColumn: { flexDirection: "column", alignItems: "center", flex: 1 },
});
