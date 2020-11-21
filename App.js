import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import WarehouseButton from './components/WarehouseButton'; 

export default function App() {
  return (
    <View style={styles.container}>
      <Text>I know it's just the beginning, but the project is now created!</Text>
      <StatusBar style="auto" />
      <WarehouseButton name="Button"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
