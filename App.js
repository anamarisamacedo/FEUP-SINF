import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import WarehouseScreen from './screens/WarehouseScreen';
//import Navigator from './HomeStack';

const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ alignItems: 'left', justifyContent: 'center', backgroundColor: '#E5E5E5'}}>
        <TouchableHighlight onPress={() => navigation.navigate('WarehouseScreen')}>
            <View style={styles.line}>
                <Text style={styles.text}>
                    <Icon
                        style={styles.icon}
                        name='warehouse'
                        type='font-awesome-5' />
                    Warehouse
                </Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('ListSuppliersOrders')}>
            <View style={styles.line}>
                <Text style={styles.text}>
                    <Icon 
                        style={styles.icon}
                        name='sign-in-alt'
                        type='font-awesome-5' />
                    List Supplier's Orders
                </Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('ListClientsOrders')}>
            <View style={styles.line}>
                <Text style={styles.text}>
                    <Icon 
                        style={styles.icon}
                        name='sign-out-alt'
                        type='font-awesome-5' />
                    List Client's Orders
                </Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('ListPickingWaves')}>
            <View style={styles.line}>
                <Text style={styles.text}>
                    <Icon 
                        style={styles.icon}
                        name='water'
                        type='font-awesome-5' />
                    List Picking Waves
                </Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('GeneratePickingWaves')}>
            <View style={styles.line}>
                <Text style={styles.text}>
                    <Icon 
                        style={styles.icon}
                        name='plus'
                        type='font-awesome-5' />
                    Generate Picking Wave
                </Text>
            </View>
        </TouchableHighlight>
        <View style={styles.logout}>
            <TouchableHighlight onPress={() => navigation.navigate('Logout')}>
                <View style={styles.line}>
                    <Text style={styles.text_logout}>
                        <Icon 
                            style={styles.icon}
                            color='#E5E5E5'
                            name='door-open'
                            type='font-awesome-5' />
                        Logout
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    </View>
  );
};

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


