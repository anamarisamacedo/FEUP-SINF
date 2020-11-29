import React from 'react';
import Navigator from './HomeStack';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import WarehouseScreen from './screens/WarehouseScreen';
import EntryScreen from './screens/EntryScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import StockListingScreen from './screens/StockListingScreen';
import ClientOrdersScreen from './screens/ClientOrdersScreen';
import SupplierOrdersScreen from './screens/SupplierOrdersScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import NavigationDrawerStructure from './components/NavigationDrawerStructure';
import OPScreen from './screens/OPScreen';
import PickersListScren from './screens/PickersListScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//import * as firebase from 'firebase';
import { firebase } from '@firebase/app';
//import 'firebase/firebase-firestore'; 


var firebaseConfig = {
  apiKey: "AIzaSyDiHGyvCIdS47a2IVzgXeux5A37Wptz114",
  authDomain: "react-firebase-bfbe7.firebaseapp.com",
  databaseURL: "https://react-firebase-bfbe7.firebaseio.com",
  projectId: "react-firebase-bfbe7",
  storageBucket: "react-firebase-bfbe7.appspot.com",
  messagingSenderId: "722858081202",
  appId: "1:722858081202:web:c11d4295f506fa3c2d02ab",
  measurementId: "G-6MN71Q5EEH"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}


export default function App() {
  /*return (
    <Navigator />
  );  
  <Drawer.Navigator drawerContent={props => <NavigationDrawerStructure {...props} />}>
        <Drawer.Screen name="Warehouse" component={WarehouseScreen} />
      </Drawer.Navigator>


      <Stack.Navigator>
        <Stack.Screen name="EntryScreen" component={EntryScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="WarehouseScreen" component={WarehouseScreen} />
        <Stack.Screen name="StockListingScreen" component={StockListingScreen} />
        <Stack.Screen name="ClientOrdersScreen" component={ClientOrdersScreen} />
        <Stack.Screen name="SupplierOrdersScreen" component={SupplierOrdersScreen} />
        <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />

      </Stack.Navigator>
  */
  return (
    <NavigationContainer>
      
      <Drawer.Navigator drawerContent={props => <NavigationDrawerStructure navigation={props.navigation} />}>
        <Drawer.Screen name="EntryScreen" component={EntryScreen} />
        <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        <Drawer.Screen name="SignUpScreen" component={SignUpScreen} />
        <Drawer.Screen name="WarehouseScreen" component={WarehouseScreen} />
        <Drawer.Screen name="StockListingScreen" component={StockListingScreen} />
        <Drawer.Screen name="ClientOrdersScreen" component={ClientOrdersScreen} />
        <Drawer.Screen name="SupplierOrdersScreen" component={SupplierOrdersScreen} />
        <Drawer.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
        <Drawer.Screen name="OPScreen" component={OPScreen} />
        <Drawer.Screen name="PickersListScreen" component={PickersListScren} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
}

