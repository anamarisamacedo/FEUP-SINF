import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import WarehouseScreen from '../screens/WarehouseScreen';
import StockListingScreen from '../screens/StockListingScreen';
import ClientOrdersScreen from '../screens/ClientOrdersScreen';
import SupplierOrdersScreen from '../screens/SupplierOrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import NavigationDrawerStructure from '../components/NavigationDrawerStructure';
import OPScreen from '../screens/OPScreen';
import PickersListScren from '../screens/PickersListScreen';
import GeneratePickingWaveScreen from '../screens/GeneratePickingWaveScreen';
import PickingWavesScreen from '../screens/PickingWavesScreen';
import PickerWaveScreen from '../screens/PickerWaveScreen';
import PickerInputScreen from '../screens/PickerInputScreen';

const Drawer = createDrawerNavigator();

export default function HomeStack() {
    return (
      
      <Drawer.Navigator drawerContent={props => <NavigationDrawerStructure navigation={props.navigation} />}>
      <Drawer.Screen name="WarehouseScreen" component={WarehouseScreen} />
      <Drawer.Screen name="StockListingScreen" component={StockListingScreen} />
      <Drawer.Screen name="ClientOrdersScreen" component={ClientOrdersScreen} />
      <Drawer.Screen name="SupplierOrdersScreen" component={SupplierOrdersScreen} />
      <Drawer.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Drawer.Screen name="OPScreen" component={OPScreen} />
      <Drawer.Screen name="PickingWavesScreen" component={PickingWavesScreen} />
      <Drawer.Screen name="GeneratePickingWaveScreen" component={GeneratePickingWaveScreen} />
      <Drawer.Screen name="PickersListScreen" component={PickersListScren} />
      <Drawer.Screen name="PickerWaveScreen" component={PickerWaveScreen} />
      <Drawer.Screen name="PickerInputScreen" component={PickerInputScreen} />
      </Drawer.Navigator>
      
    );
}