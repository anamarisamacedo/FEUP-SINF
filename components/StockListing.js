import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BackButton from './BackButton';

const stockList = [
  {
    ref: "10150",
    loc: "A1.1.1",
    name: "AMD Ryzen 5 3600",
    stock: "28/50",
  },
  {
    ref: "10151",
    loc: "A1.1.2",
    name: "AMD Ryzen 5 3600X",
    stock: "12/50",
  },
];
//<Icon name="archive" type="font-awesome" color="white" size='1'/>

const StockListing = (props) => {
  const idName = props.id + " " + props.name;
  //const stockList = props.stockList
  const TabNavigator = createBottomTabNavigator(  
    {  
      Home:{  
        screen:HomeScreen,  
        navigationOptions:{  
          tabBarLabel:'Home',  
          tabBarIcon:({tintColor})=>(  
              <Icon name="ios-home" color={tintColor} size={25}/>  
          )  
        }  
      }
    });
  return (
    <View>
      <View style={styles.main}>
        
        <Text style={styles.text}>{idName}</Text>
      </View>
      <View>
        <View style={styles.row}>
          <View style={styles.refColumn}>
            <Text style={styles.header}>{"Ref"}</Text>
          </View>
          <View style={styles.locColumn}>
            <Text style={styles.header}>{"Loc"}</Text>
          </View>
          <View style={styles.nameColumn}>
            <Text style={styles.header}>{"Name"}</Text>
          </View>
          <View style={styles.stockColumn}>
            <Text style={styles.header}>{"Stock"}</Text>
          </View>
        </View>
        {stockList.map((i) => {
          return (
            <View style={styles.row} key={i}>
              <View style={styles.refColumn} key={i}>
                <Text style={styles.textTable}>{i.ref}</Text>
              </View>
              <View style={styles.locColumn} key={i}>
                <Text style={styles.textTable}>{i.loc}</Text>
              </View>
              <View style={styles.nameColumn} key={i}>
                <Text style={styles.textTable}>{i.name}</Text>
              </View>
              <View style={styles.stockColumn} key={i}>
                <Text style={styles.textTable}>{i.stock}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={[styles.main, { marginBottom: 5 }]}>
        <BackButton/>
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
  main: {
    marginTop: 50,
    marginBottom: 40,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
  },
  header: {
    textAlign: "left",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontWeight: "bold",
    fontSize: 16,
  },
  textTable: {
    textAlign: "left",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 16,
  },
  row: {
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "darkgrey",
    marginTop: 4,
  },
  refColumn: { flexDirection: "column", flex: 0.6 },
  locColumn: { flexDirection: "column", flex: 0.6 },
  nameColumn: { flexDirection: "column", flex: 1.5 },
  stockColumn: { flexDirection: "column", flex: 0.5 },
});

export default StockListing;
