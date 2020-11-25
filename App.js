import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import WarehouseScreen from './screens/WarehouseScreen';
import NavigationDrawerStructure from './components/NavigationDrawerStructure';
//import Navigator from './HomeStack';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="EntryScreen">
          <Drawer.Screen
            name="WarehouseScreen"
            component={WarehouseScreen}
            options={{
              title: 'First Page', //Set Header Title
              headerLeft: () => (
                <NavigationDrawerStructure navigationProps={navigation} />
              ),
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}/>
        </Drawer.Navigator>
      </NavigationContainer>
  );  
  /* return (
      <Navigator />
    ); */
}


