// Import React
import React, {useEffect, useState} from 'react';
// Import required components
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Expandable = ({wave,onClickFunction}) => {
    //Custom Component for the Expandable List
    const [layoutHeight, setLayoutHeight] = useState(0);

    const [value, onChangeText] = useState(0);

    useEffect(() => {
      if (wave.isExpanded) {
        setLayoutHeight(null);
      } else {
        setLayoutHeight(0);
      }
    }, [wave.isExpanded]);

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClickFunction}
          style={styles.header}>
          <Text style={styles.text}>
            {wave.section_name}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: layoutHeight,
            overflow: 'hidden',
            backgroundColor: 'black',
          }}>
          {wave.items.map((i) => {
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
                  <Text style={styles.textTable}>{i.pqty}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
};

export default Expandable;

  const styles = StyleSheet.create({
    header: {
      backgroundColor: 'black',
      padding: 10,
    },
    text: {
      fontSize: 16,
      color: 'white',
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
      pqtyColumn: { flexDirection: "column", flex: 0.5 ,},
  });