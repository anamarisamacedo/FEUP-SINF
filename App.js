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



export default function App() {

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

