import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  LayoutAnimation,
  ScrollView,
  Platform
} from "react-native";
import BackButton from "../components/BackButton";
import GeneralButton from "../components/GeneralButton";
import Expandable from "../components/Expandable";
import Navbar from '../components/Navbar';
import pickingWaves from "../services/pickingWaves";
import { useIsFocused } from "@react-navigation/native";

export default function PickerInputScreen({ navigation, route }) {
  const [value, onChangeText] = useState("Submit any observations or comments here");
  const {waveID, wave, title, pickingWave} = route.params;
  const [itemsInput, setItemsInput] = useState(new Map());
  const [listDataSource, setListDataSource] = useState(wave);
  const multiSelect = true;
  const isFocused = useIsFocused();

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    setListDataSource(wave);
  }, [isFocused]);

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] =
              !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };

  return (
    <View style={styles.main}>
      <Navbar navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <View style={styles.row}>
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
        </View>
        <View style={styles.scrollView}>
          <ScrollView
              automaticallyAdjustContentInsets={false}
              onScroll={() => {
                console.log("onScroll!");
              }}
              scrollEventThrottle={200}
              style={styles.scrollView}
            >
              {listDataSource.map((wave, key) => (
                <Expandable itemsInput={itemsInput}
                  key={wave.section_name}
                  onClickFunction={() => {
                    updateLayout(key);
                  }}
                  items={wave}
                  input={true}
                />
              ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.bottomInput}>
        <TextInput 
          style={styles.textInput}
          multiline = {true}
          editable = {true}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
      </View>
      <View style={styles.bottomRow}>
        <BackButton onPress={() => navigation.goBack()} />
        <GeneralButton name="Submit" onPress={() => {pickingWaves.submitReportAndPicked(waveID, value, itemsInput, wave, pickingWave), navigation.navigate("PickingWavesScreen")}}/>
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
      justifyContent: "flex-end",
      marginBottom: 0,
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
      width: 250,
      height: 60,
      alignItems: "right",
      backgroundColor:"darkgrey",
      color: "black",
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
      position: "absolute",
      bottom: 50,
    },
  subtext: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 17,
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
  refColumn: { flexDirection: "column", flex: 0.6 },
  locColumn: { flexDirection: "column", flex: 0.6 },
  nameColumn: { flexDirection: "column", flex: 1.5 },
  pqtyColumn: { flexDirection: "column", flex: 0.5 },
  scrollView: { height: Dimensions.get("window").height - 500 },
});
