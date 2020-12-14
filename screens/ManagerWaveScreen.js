import React, { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
  LayoutAnimation,
} from "react-native";
import BackButton from "../components/BackButton";
import Expandable from "../components/Expandable";
import pickersService from "../services/picker";
import { useIsFocused } from "@react-navigation/native";

const wave = [
  {
    isExpanded: false,
    section_name: "A11",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "A12",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "A21",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "A22",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "A31",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "A32",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "B11",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "B12",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "B21",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "B22",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "B31",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "B32",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "C11",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "C12",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "C21",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "C22",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "C31",
    items: [],
  },
  {
    isExpanded: false,
    section_name: "C32",
    items: [],
  },
];

export default function ManagerWaveScreen({ navigation, route }) {
  const { pickingWave } = route.params;
  const title = "Picking Wave " + pickingWave.wave;
  const picker = "Picker: ";
  const status = "Status: " + pickingWave.status;

  const [aux, setAux] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("Manager PW screen loaded!");
    pickersService.getPickers().then((response) => {
      setAux(Object.entries(response));
    });
    organizeItems(pickingWave.items);
  }, [isFocused]);

  let pickers = [];
  aux.forEach((entry) => {
    if (!(((Object.entries(entry[1]))[0])[1]))
      pickers.push({ label: entry[0], value: entry[0] });
  });

  const [listDataSource, setListDataSource] = useState([]);

  const organizeItems = (items) => {
    const array = _.cloneDeep(wave);
    items.forEach(item => {
      array.forEach(waveT => {
        if (item.defaultWarehouse == waveT.section_name) {
          if (!waveT.items.includes(item))
          waveT.items.push(item);
        }
      })
    });
    setListDataSource(array);
  }

  const multiSelect = true;

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

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
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={[styles.subtitle, { zIndex: 15 }]}>
          <Text style={styles.subtext}>{picker}</Text>
          <DropDownPicker style={{ paddingVertical: 1, backgroundColor: 'black' }}
            items={pickers}
            containerStyle={{ width: 150, height: 25 }}
            labelStyle={{
              fontSize: 14,
              textAlign: 'left',
              color: 'white'
            }}
            placeholder={"Select a picker"}
            dropDownStyle={{ backgroundColor: 'black' }}
            activeLabelStyle={{ color: 'white' }}
            onChangeItem={(newItem) => {
              pickersService.submitPicker(newItem.value, pickingWave.wave);
            }}
          />
          <Text style={[styles.subtext, {marginLeft: 16}]}> {status} </Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.refColumn}>
              <Text style={styles.header}>{"Ref"}</Text>
            </View>
            <View style={styles.nameColumn}>
              <Text style={styles.header}>{"Name"}</Text>
            </View>
            <View style={[styles.pqtyColumn, {textAlign: 'right'}]}>
              <Text style={[styles.header, {textAlign: 'right'}]}>{"P/Qty"}</Text>
            </View>
          </View>
          <View style={styles.scrollView}>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              onScroll={() => { console.log('onScroll!'); }}
              scrollEventThrottle={200}
              style={styles.scrollView}
            >
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
        </View>
      </View>
      <View style={styles.bottomRow}>
        <BackButton onPress={() => {
          navigation.goBack();
        }} />
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
    flex: 1,
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
  nameColumn: { flexDirection: "column", flex: 1.5 },
  pqtyColumn: { flexDirection: "column", flex: 0.5 },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    bottom: 40,
    alignItems: "center",
    position: "absolute",
    bottom: 25,
  },
  scrollView: { height: Dimensions.get('window').height - 300 }
});
