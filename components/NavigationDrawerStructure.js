import * as React from 'react';
import { StyleSheet, Text, Button, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';


const NavigationDrawerStructure = (props) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={styles.menu}>
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

const styles = StyleSheet.create({
    menu:{
        alignItems: 'left',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5'
    },
    text: {
      color: '#171717',
      fontFamily: 'Corbel',
      fontStyle: 'normal',
      fontSize: 18,
    },
    logout:{
        backgroundColor: '#171717'
    },
    text_logout:{
        color: '#E5E5E5',
      fontFamily: 'Corbel',
      fontStyle: 'normal',
      fontSize: 18,
    },
    line:{
        padding: 7,
        margin: 7,
    },
    icon:{
        paddingRight: 10
    }
});

export default NavigationDrawerStructure