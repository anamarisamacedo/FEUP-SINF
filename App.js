import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';

import WarehouseButton from './components/WarehouseButton';

class HomeScreen extends React.Component {
  render() {
    const { nagivate } = this.props.nagivation;
    return (
      <View style={styles.main}>
        <Text>I know it's just the beginning, but the project is now created!</Text>
        <StatusBar style="auto" />
        <View style={styles.warehouseBtns}>
          <View style={styles.row}>
            <WarehouseButton id="A1" name="CPU" />
            <WarehouseButton id="B1" name="HDD" />
            <WarehouseButton id="C1" name="Case" />
          </View>
          <View style={styles.row}>
            <WarehouseButton id="A2" name="GPU" />
            <WarehouseButton id="B2" name="SSD" />
            <WarehouseButton id="C2" name="Cooler" />
          </View>
          <View style={styles.row}>
            <WarehouseButton id="A3" name="MB" />
            <WarehouseButton id="B3" name="RAM" />
            <WarehouseButton id="C3" name="PSU" />
          </View>
          <View style={[styles.row, { marginTop: 50 }]}>
            <WarehouseButton id="OP" name="" />
          </View>
        </View>
      </View>
    );

  }
}

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
}, {
  nagivationOptions: {
    headerStyle: {
      
    }
  }
}
);

export default class App extends React.Component {
  render() {
    return <NavigationApp />
  }
}

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  warehouseBtns: {
    marginTop: 180
  }
});

