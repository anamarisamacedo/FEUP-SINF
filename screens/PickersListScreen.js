import React, {useState, useEffect} from "react";
import Navbar from '../components/Navbar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import BackButton from "../components/BackButton";
import pickersService from "../services/picker";
import pickingWaves from "../services/pickingWaves";

export default function PickersListScreen({ navigation, route }) {
  const title = "Pickers";

  const [aux, setAux] = useState([]);
  const [waves, setWaves] = useState([]);
  var pickers = [];
    const [executeFunc, setExecuteFunc] = useState(true);
      useEffect(() => {
        pickersService.getPickers().then((response) => {
          setAux(Object.entries(response));
        });

        aux.forEach((entry)=>{
          if(!(((Object.entries(entry[1]))[0])[1])){
              pickingWaves
                  .getPWNum(entry[0])
                  .then((response) => {
                      pickers.push({name: entry[0],assignedWaves: response});
                });
          }
          });
      });
      console.log(pickers);
  return (
    <View style={styles.main}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.nameColumn}>
              <Text style={styles.header}>{"Name"}</Text>
            </View>
            <View style={styles.awColumn}>
              <Text style={styles.headerAw}>{"Assigned Waves"}</Text>
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
    fontSize: 17,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  headerAw: {
    textAlign: "top",
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
  awColumn: { flexDirection: "column", alignItems:'center', flex: 1.1 },
});
