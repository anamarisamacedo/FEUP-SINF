import React from 'react';
import Navigator from './HomeStack';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import WarehouseScreen from './screens/WarehouseScreen';
import NavigationDrawerStructure from './components/NavigationDrawerStructure';

const Drawer = createDrawerNavigator();

export default function App() {
  /*return (
    <Navigator />
  );  */
  return(
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <NavigationDrawerStructure {...props} />}>
        <Drawer.Screen name="Warehouse" component={WarehouseScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


