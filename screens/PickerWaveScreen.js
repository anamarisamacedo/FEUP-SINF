import React, { useEffect, useState } from "react";
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
import GeneralButton from "../components/GeneralButton";
import Expandable from "../components/Expandable";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../navigation/AuthProvider";
import { useIsFocused } from "@react-navigation/native";


var wave = [];

export default function PickerWaveScreen({ navigation, route }) {
  const { pickingWave } = route.params;

  const [listDataSource, setListDataSource] = useState(wave);

  const title = "Picking Wave " + pickingWave.wave;
  var subtitle;

  if (AuthProvider.IsManager) {
    subtitle =
      "Picker: " +
      pickingWave.assignedPicker +
      "       Status: " +
      pickingWave.status;
  } else {
    subtitle = "Status: " + pickingWave.status;
  }
  const organizeItems = (items) => {
    const array = _.cloneDeep(wave);
    items.forEach((item) => {
      array.forEach((wave) => {
        if (item.defaultWarehouse == wave.section_name) {
          if (!wave.items.includes(item)) wave.items.push(item);
        }
      });
    });
    setListDataSource(array);
  };

  const orderSections = () => {
    wave = [];
    pickingWave.route.forEach(whSection => {
      wave.push({
        isExpanded: false,
        section_name: whSection,
        items: [],
      },)
    });
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("Picker PW screen loaded!");
    orderSections();
    organizeItems(pickingWave.items)
  }, [isFocused]);

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

  const navigateToInput = () => {
    const temp = [...listDataSource];
    temp.forEach((item) => {
      item.isExpanded = false;
    });
    navigation.navigate("PickerInputScreen", {
      waveID: pickingWave.wave,
      wave: temp,
      title,
      pickingWave: pickingWave,
    });
  };

  return (
    <View style={styles.main}>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtext}>{subtitle}</Text>
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
        <BackButton
          onPress={() => { navigation.goBack(); }}
        />
        {!AuthProvider.IsManager && (
          <GeneralButton name="Report" onPress={navigateToInput} />
        )}
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
  scrollView: {height: Dimensions.get('window').height - 300}
});
