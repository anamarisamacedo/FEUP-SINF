import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

const NavigationDrawerStructure = props => {
    return (
        <View style={styles.menu}>
            <View style={styles.list}>
                <TouchableHighlight onPress={() => props.nagivation.navigate('WarehouseScreen')}>
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
                <TouchableHighlight onPress={() => props.nagivation.navigate('ListSuppliersOrders')}>
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
                <TouchableHighlight onPress={() => props.nagivation.navigate('ListClientsOrders')}>
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
                <TouchableHighlight onPress={() => props.nagivation.navigate('ListPickingWaves')}>
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
                <TouchableHighlight onPress={() => props.nagivation.navigate('GeneratePickingWaves')}>
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
            </View>
            <View style={styles.logout}>
                <TouchableHighlight onPress={() => props.nagivation.navigate('Logout')}>
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
        backgroundColor: '#C4C4C4',
        flex: 1,
    },
    text: {
      color: '#171717',
      fontFamily: 'Corbel',
      fontStyle: 'normal',
      fontSize: 18,
    },
    logout:{
        backgroundColor: '#464646'
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
    },
    list:{
        flex: 1,
    }
});

export default NavigationDrawerStructure