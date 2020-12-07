import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Platform,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import BackButton from "../components/BackButton";
import GeneralButton from "../components/GeneralButton";
import Expandable from "../components/Expandable";
import { AuthProvider } from "../navigation/AuthProvider";

const wave = [
  {
    isExpanded: false,
    section_name: 'A1',
    items: []
  },
  {
    isExpanded: false,
    section_name: 'A2',
    items: []
  },
  {
    isExpanded: false,
    section_name: 'A3',
    items: []
  },
  {
    isExpanded: false,
    section_name: 'B1',
    items: []
  },
  {
    isExpanded: false,
    section_name: 'B2',
    items: []
  },
  {
    isExpanded: false,
    section_name: 'B3',
    items: []
  },
  {
    isExpanded: false,
    section_name: 'C1',
    items: []
  },
  {
    isExpanded: false,
    section_name: 'C2',
    items: []
  },
  {
    isExpanded: false,
    section_name: 'C3',
    items: []
  },
];

export default function PickerWaveScreen({ navigation, route }) {
  const { pickingWave } = route.params;
  const title = "Picking Wave " + pickingWave.wave;
  var subtitle;
  console.log(AuthProvider.IsManager)
  if (AuthProvider.isManager) {
    subtitle =
      "Picker: " +
      pickingWave.assignedPicker +
      " Status: " +
      pickingWave.status;
  } else {
    subtitle = "Status: " + pickingWave.status;
  }
  const creation = pickingWave.createdDate + " " + pickingWave.createdHour;
  const conclusion =
    pickingWave.concludedDate + " " + pickingWave.concludedHour;

  const [value, onChangeText] = useState(pickingWave.report);
  const [listDataSource, setListDataSource] = useState(wave);

  const [executeFunc, setExecuteFunc] = useState(true);

  const organizeItems = (items) => {
    setExecuteFunc(false);
    const array = [...listDataSource];
    items.forEach((item) => {
      array.forEach((wave) => {
        if (item.defaultWarehouse == wave.section_name) {
          if (!wave.items.includes(item)) wave.items.push(item);
        }
      });
    });
    setListDataSource(array);
  };

  useEffect(() => {
    if (executeFunc) organizeItems(pickingWave.items);
  });

  const multiSelect = true;

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]["isExpanded"] = !array[index]["isExpanded"];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
          : (array[placeindex]["isExpanded"] = false)
      );
    }
    setListDataSource(array);
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtext}>{subtitle}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtext}>Created: {creation}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtext}>Concluded: {conclusion}</Text>
        </View>
        <View style={styles.rowspace} />
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
        <SafeAreaView style={{ flex: 1}}>
          <View>
            <View>
              <TouchableOpacity>
                <Text>
                  {multiSelect
                    ? "Enable Single \n Expand"
                    : "Enalble Multiple \n Expand"}
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {listDataSource.map((wave, key) => (
                <Expandable
                  key={wave.defaultWarehouse}
                  onClickFunction={() => {
                    updateLayout(key);
                  }}
                  items={wave}
                  input={false}
                />
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.bottomRow}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.bottomInput}>
          <TextInput
            multiline={true}
            editable={false}
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
        </View>
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
  bottomInput: {
    flex: 1,
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
  subtext: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 17,
  },
  title: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  subtitle: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  rowspace: {
    marginBottom: 30,
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
  textInput: {
    width: 150,
    height: 60,
    alignItems: "right",
    backgroundColor: "darkgrey",
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
    position: "absolute",
    bottom: 0,
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

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    alignSelf: "center",
    bottom: 40,
    alignItems: "center",
    position: "absolute",
    bottom: 25,
  },
});
