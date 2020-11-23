import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GeneralList = (props) => {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
      <View>
        <View style={styles.row}>
          <View style={styles.firstColumn}>
            <Text style={styles.header}>{props.first}</Text>
          </View>
          <View style={styles.secondColumn}>
            <Text style={styles.header}>{props.second}</Text>
          </View>
          <View style={styles.thirdColumn}>
            <Text style={styles.header}>{props.third}</Text>
          </View>
          <View style={styles.forthColumn}>
            <Text style={styles.header}>{props.forth}</Text>
          </View>
        </View>
        {props.list.map((i) => {
          return (
            <View style={styles.row} key={i}>
              <View style={styles.firstColumn}>
                <Text style={styles.textTable}>{i.first}</Text>
              </View>
              <View style={styles.secondColumn}>
                <Text style={styles.textTable}>{i.second}</Text>
              </View>
              <View style={styles.thirdColumn}>
                <Text style={styles.textTable}>{i.third}</Text>
              </View>
              <View style={styles.forthColumn}>
                <Text style={styles.textTable}>{i.forth}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  firstColumn: { flexDirection: "column", flex: props.firstFlex },
  secondColumn: { flexDirection: "column", flex: props.secondFlex },
  thirdColumn: { flexDirection: "column", flex: props.thirdFlex },
  forthColumn: { flexDirection: "column", flex: props.forthFlex },
});
