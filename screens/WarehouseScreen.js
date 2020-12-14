import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import WarehouseButton from '../components/WarehouseButton';
import Navbar from '../components/Navbar';

export default function WarehouseScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <Navbar navigation={navigation}/>
            <View style={styles.warehouseBtns}>
                <View style={styles.row}>
                    <WarehouseButton id="A1" name="CPU" onPress={() => navigation.navigate('StockListingScreen', {warehouseId: 'a2dd6d80-0829-eb11-8441-0003ff245b52', warehouseName: 'A1', warehouseDescription: 'CPU'})}/>
                    <WarehouseButton id="B1" name="HDD" onPress={() => navigation.navigate('StockListingScreen', {warehouseId: '684335ba-0829-eb11-8441-0003ff2907ea', warehouseName: 'B1', warehouseDescription: 'HDD'})}/>
                    <WarehouseButton id="C1" name="Case" onPress={() => navigation.navigate('StockListingScreen', {warehouseId: 'f18187e2-0829-eb11-8441-0003ff2907ea', warehouseName: 'C1', warehouseDescription: 'Case'})}/>
                </View>
                <View style={styles.row}>
                    <WarehouseButton id="A2" name="GPU" onPress={() => navigation.navigate('StockListingScreen', { warehouseId: 'afe35498-0829-eb11-8441-0003ff2907ea', warehouseName: 'A2', warehouseDescription: 'GPU'})}/>
                    <WarehouseButton id="B2" name="SSD" onPress={() => navigation.navigate('StockListingScreen', {warehouseId: 'e4f2dfca-0829-eb11-8441-0003ff290dc5', warehouseName: 'B2', warehouseDescription: 'SSD'})}/>
                    <WarehouseButton id="C2" name="Cooler" onPress={() => navigation.navigate('StockListingScreen', {warehouseId: 'e67297ee-0829-eb11-8441-0003ff245b52', warehouseName: 'C2', warehouseDescription: 'Cooler'})}/>
                </View>
                <View style={styles.row}>
                    <WarehouseButton id="A3" name="MB" onPress={() => navigation.navigate('StockListingScreen', {warehouseId: '0b559aaa-0829-eb11-8441-0003ff290dc5', warehouseName: 'A3', warehouseDescription: 'MB'})}/>
                    <WarehouseButton id="B3" name="RAM" onPress={() => navigation.navigate('StockListingScreen', {warehouseId: 'a2dd6d80-0829-eb11-8441-0003ff245b52', warehouseName: 'B3', warehouseDescription: 'RAM'})} />
                    <WarehouseButton id="C3" name="PSU" onPress={() => navigation.navigate('StockListingScreen', {warehouseId: '1884bcf9-0829-eb11-8441-0003ff290dc5', warehouseName: 'C3', warehouseDescription: 'PSU'})}/>
                </View>
                <View style={[styles.row, { marginTop: 30 }]}>
                    <WarehouseButton id="OP" name="" onPress={() => navigation.navigate('StockListingScreen', {warehouseId: 'afc2f33c-c4c3-4a6a-9fea-9e2cc6a4dba6', warehouseName: 'OP', warehouseDescription: 'OutPoint'})}/>
                </View>
            </View>
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
        marginTop: 120
    }
});
