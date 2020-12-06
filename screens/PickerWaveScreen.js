import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import BackButton from "../components/BackButton";
import GeneralButton from "../components/GeneralButton";
import Expandable from "../components/Expandable";
import Navbar from '../components/Navbar';
import AuthProvider from "../navigation/AuthProvider";

const wave = [
  {
    isExpanded: false,
    section_name: 'A1',
    items: [
      {
        ref: "10150",
        loc: "A.1.1.1",
        name: "AMD Ryzen 5 3600",
        pqty: "3/3",
      },
      {
        ref: "10151",
        loc: "A.1.1.2",
        name: "AMD Ryzen 5 3600X",
        pqty: "0/4",
      },
      {
        ref: "10152",
        loc: "A.1.1.3",
        name: "AMD Ryzen 7 3700",
        pqty: "2/3",
      },
      {
        ref: "10153",
        loc: "A.1.1.4",
        name: "AMD Ryzen 7 3700X",
        pqty: "2/2",
      },
    ]
  },
  {
    isExpanded: false,
    section_name: 'A2',
    items: [
      {
        ref: "10150",
        loc: "A.1.1.1",
        name: "AMD Ryzen 5 3600",
        pqty: "3/3",
      },
      {
        ref: "10151",
        loc: "A.1.1.2",
        name: "AMD Ryzen 5 3600X",
        pqty: "0/4",
      },
      {
        ref: "10152",
        loc: "A.1.1.3",
        name: "AMD Ryzen 7 3700",
        pqty: "2/3",
      },
      {
        ref: "10153",
        loc: "A.1.1.4",
        name: "AMD Ryzen 7 3700X",
        pqty: "2/2",
      },
    ]
  }
];

export default function PickerWaveScreen({ navigation, route }) {
  const {pickingWave} = route.params;
  const title = "Picking Wave " + pickingWave.wave;
  const subtitle = "Picker:                                      Status: " + pickingWave.status;

  const [listDataSource, setListDataSource] = useState(wave);
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
      <Navbar navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtext}>{subtitle}</Text>
        </View>
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
          <SafeAreaView style={{flex: 1}}>
            <View>
              <View>
                <TouchableOpacity>
                  <Text>
                    {multiSelect
                      ? 'Enable Single \n Expand'
                      : 'Enalble Multiple \n Expand'}
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                {listDataSource.map((wave, key) => (
                  <Expandable
                    key={wave.section_name}
                    onClickFunction={() => {
                      updateLayout(key);
                    }}
                    wave={wave}
                  />
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <BackButton onPress={() => navigation.goBack()}/>
        {() => {
          if (AuthProvider.isManager == true) {
        <GeneralButton name="Report" onPress={() => navigation.navigate('PickerInputScreen', {wave, title})}/>
        }}}
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
      position:"absolute",
      bottom: 25,
    },
});
