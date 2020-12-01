import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import BackButton from "../components/BackButton";
import GeneralButton from "../components/GeneralButton";

export default function PickerInputScreen({ navigation }) {
  const [value, onChangeText] = useState("hey");

  const title = navigation.getParam("title");
  const wave = navigation.getParam("wave");
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.bottomRight}></View>
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
                  <Text style={styles.textTable}>{i.loc}</Text>
                </View>
                <View style={styles.locColumn}>
                  <Text style={styles.textTable}>{i.ref}</Text>
                </View>
                <View style={styles.nameColumn}>
                  <Text style={styles.textTable}>{i.name}</Text>
                </View>
                <View style={styles.pqtyColumn}>
                  <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    onChangeText={(text) => onChangeText(text)}
                    value={value}
                    maxLength={10}
                  />
                  <Text style={styles.textTable}>{i.pqty}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.bottomInput}>
        <TextInput 
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
      </View>
      <View style={styles.bottomRow}>
        <BackButton onPress={() => navigation.goBack()} />
        <GeneralButton name="Submit" onPress={() => console.log("Submitted")}/>
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
    flex: 1,
    justifyContent: "space-evenly",
    marginHorizontal: 15,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    alignSelf: "center",
    bottom: 40,
    alignItems: "center",
  },
  bottomInput: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 80,
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
  quantityInput: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 15,
    borderColor: "lightgrey",
    borderWidth: 1,
    flexWrap: "wrap"
  },
  textInput: {
    backgroundColor:"darkgrey",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 15,
    borderColor: "lightgrey",
    borderWidth: 1,
    flexWrap: "wrap",
    multiline: true,
    numberOfLines: "4",
    textAlignVertical: "top",
    placeholderTextColor: "darkgrey",
  },
  subtext: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 15,
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
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
