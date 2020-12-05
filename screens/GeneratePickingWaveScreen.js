import React, {useState} from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, Button, TouchableOpacity } from "react-native";
import GeneralButton from "../components/GeneralButton";
import Navbar from '../components/Navbar';

const pickingWaves = [
  {
    wave: "00124",
    date: "22-10-2020",
    hour: "08:21",
    status: "in progress",
  },
  {
    wave: "00125",
    date: "22-10-2020",
    hour: "08:21",
    status: "in progress",
  },
  {
    wave: "00122",
    date: "22-10-2020",
    hour: "08:21",
    status: "concluded",
  },
  {
    wave: "00121",
    date: "22-10-2020",
    hour: "08:21",
    status: "in progress",
  },
  {
    wave: "00120",
    date: "22-10-2020",
    hour: "08:21",
    status: "concluded",
  },
  {
    wave: "00126",
    date: "22-10-2020",
    hour: "08:21",
    status: "in progress",
  },
];

export default function GeneratePickingWaveScreen({ navigation }) {
  const title = "Generate Picking Wave";
  const [productNum,onChangeText] = useState('0');

  return (
    
    <View style={styles.main}>
      <Navbar navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.text2}> Max Number of Products: </Text>
        <TextInput keyboardType='numeric' style={styles.input} placeholder="0" onChangeText={(text) => onChangeText(text)}/>
      </View>
      <View style={styles.bottom}>
        <GeneralButton name="Generate Picking Wave" onPress={() => console.log("Pressed generate pw")} />
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
    flexDirection: 'row',
    alignItems: "center",
    marginTop: '10em',
    marginLeft: '5em',

  },
  waveColumn: { flexDirection: "column", flex: 0.6 },
  dateColumn: { flexDirection: "column", flex: 0.9 },
  hourColumn: { flexDirection: "column", flex: 0.6 },
  statusColumn: { flexDirection: "column", flex: 0.9 },

  text2: {
      color: "#d3d3d3",
      fontFamily: "Corbel",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 14,

    },

  input: {
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
      width: 50,
      color: "#d3d3d3",
      fontFamily: "Corbel",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 14,
      textAlign: "center",

    },
});
