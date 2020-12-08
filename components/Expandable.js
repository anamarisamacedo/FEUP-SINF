// Import React
import React, { useEffect, useState } from "react";
// Import required components
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Expandable = ({ items, onClickFunction, input }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  const [value, onChangeText] = useState();

  const onCheckLimit = (text, limit) => {
    const parsedQty = Number.parseInt(text);
    if (Number.isNaN(parsedQty)) {
      onChangeText(0);
    } else if (parsedQty > limit) {
      onChangeText(limit);
    } else {
      onChangeText(parsedQty);
    }
  };

  useEffect(() => {
    if (items.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [items.isExpanded]);

  return (
    items.items.length > 0 && (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClickFunction}
          style={styles.header}
        >
          <Text style={styles.text}>{items.section_name}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: layoutHeight,
            overflow: "hidden",
            backgroundColor: "black",
          }}
        >
          {items.items.map((i) => {
            return (
              (!input && (
                <View style={styles.row} key={i}>
                  <View style={styles.refColumn}>
                    <Text style={styles.textTable}>{i.ref}</Text>
                  </View>
                  <View style={styles.nameColumn}>
                    <Text style={styles.textTable}>{i.name}</Text>
                  </View>
                  <View style={styles.pqtyColumn}>
                    <Text style={styles.textTable}>
                      {i.picked} / {i.qty}{" "}
                    </Text>
                  </View>
                </View>
              )) ||
              (input && (
                <View style={styles.row} key={i}>
                  <View style={styles.refColumn}>
                    <Text style={styles.textTable}>{i.ref}</Text>
                  </View>
                  <View style={styles.nameColumn}>
                    <Text style={styles.textTable}>{i.name}</Text>
                  </View>
                  <View style={styles.pqtyColumn}>
                    <TextInput
                      style={styles.quantityInput}
                      placeholder={i.picked}
                      keyboardType="numeric"
                      editable
                      onChangeText={(text) => onCheckLimit(text, i.qty)}
                      value={value}
                      maxLength={10}
                      key={i}
                    />
                    <Text style={styles.textTable}> / {i.qty}</Text>
                  </View>
                </View>
              ))
            );
          })}
        </View>
      </View>
    )
  );
};

export default Expandable;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
    padding: 10,
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
  pqtyColumn: { flexDirection: "row", flex: 0.5 },
  quantityInput: {
    textAlign: "center",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 15,
    borderColor: "lightgrey",
    borderWidth: 1,
    flexWrap: "wrap",
    width: 25,
    height: 20,
  },
});
