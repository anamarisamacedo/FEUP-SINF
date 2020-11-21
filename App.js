import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import WarehouseButton from './components/WarehouseButton';

export default function App() {
  return (
    <View style={styles.main}>
      <Text>I know it's just the beginning, but the project is now created!</Text>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.row}>
          <WarehouseButton id="A1" name="CPU" />
          <WarehouseButton id="A1" name="CPU" />
          <WarehouseButton id="A1" name="CPU" />
        </View>
        <View style={styles.row}>
          <WarehouseButton id="A1" name="CPU" />
          <WarehouseButton id="A1" name="CPU" />
          <WarehouseButton id="A1" name="CPU" />
        </View>
        <View style={styles.row}>
          <WarehouseButton id="A1" name="CPU" />
          <WarehouseButton id="A1" name="CPU" />
          <WarehouseButton id="A1" name="CPU" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: 'black',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    marginHorizontal: 15,
  },
  row: {
    paddingVertical: 50
  }
});
