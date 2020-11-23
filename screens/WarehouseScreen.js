import React from 'react';
import { StyleSheet, Button, View, Dimensions } from 'react-native';
import WarehouseButton from '../components/WarehouseButton';

export default function WarehouseScreen({ navigation }) {

    const pressHandler = () => {
        //navigation.navigate('EntryScreen');
        navigation.push('EntryScreen');
    }

    //const { nagivate } = this.props.nagivation;
    return (
        <View style={styles.main}>
            <View style={styles.warehouseBtns}>
                <View style={styles.row}>
                    <WarehouseButton id="A1" name="CPU"/>
                    <WarehouseButton id="B1" name="HDD" />
                    <WarehouseButton id="C1" name="Case" />
                </View>
                <View style={styles.row}>
                    <WarehouseButton id="A2" name="GPU" />
                    <WarehouseButton id="B2" name="SSD" />
                    <WarehouseButton id="C2" name="Cooler" />
                </View>
                <View style={styles.row}>
                    <WarehouseButton id="A3" name="MB" />
                    <WarehouseButton id="B3" name="RAM" />
                    <WarehouseButton id="C3" name="PSU" />
                </View>
                <View style={[styles.row, { marginTop: 50 }]}>
                    <WarehouseButton id="OP" name="" />
                </View>
            </View>
            <Button title='Nagivate to entry - TEMP' onPress={pressHandler} />
            <Button title='Nagivate to stock list - TEMP' onPress={() => navigation.navigate('StockListingScreen', {id: 'A1', name: 'CPU'})} />
        </View>
    );

}

const styles = StyleSheet.create({
    main: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: 'black',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginHorizontal: 15,
        marginVertical: 15,
    },
    warehouseBtns: {
        marginTop: 180
    }
});
