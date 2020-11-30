import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import WarehouseButton from '../components/WarehouseButton';
import Navbar from '../components/Navbar';

const accountKey = "242968"; // TODO: put your account key here
const subscriptionKey = "242968-0001"; // TODO: put your account key here
const urlJ = "https://my.jasminsoftware.com/";
const accessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDY3NDk3OTUsImV4cCI6MTYwNjc2NDE5NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.Zhc0-5xPiNiuI---U-nq72UhFEBsKpv_qMWSnGUisUGn5umR35H9bk35UZwwBjZfNSnPXRJQjxlE5T_taEF7refWavrewpTuXCdelFGhcSo5AdJLpcVLEAUrBgjHbPRe23Z1g_c2GABYgiwrUg5LrIc64CZs0mhSG4VyOHcQZr8Qin7MPy9CRm0WpDHcgDj2c_gggOY80eP2tgtxpQlFXiN-nqgCkKLlqmJIJe413jgqFGQpkFfTEo1HPFMFMT1fpaGbIlZQN3z2HKOBkMCu55Yz9iWLjon4S2l2fsizddG6YLQ7OgW20h0yhym_nWFApaBFyp5m-RCnpRJ2QMIrpw"; // TODO: put the authorization access token here (this should be obtained previously)
  
export default function WarehouseScreen({ navigation }) {
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const apiUrl = urlJ + "/api/" + accountKey + "/" + subscriptionKey + "/materialscore/warehouses";
        console.log(apiUrl);
        fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        })
          .then((response) => response.json())
          .then((respWarehouses) => {setWarehouses(respWarehouses), console.log(respWarehouses)})
          .finally(setLoading(false));
      }, []);
    return (
        <View style={styles.main}>
            <Navbar navigation={navigation}/>
            <View style={styles.warehouseBtns}>
                <View style={styles.row}>
                    <WarehouseButton id="A1" name="CPU" onPress={() => navigation.navigate('StockListingScreen', {id: 'A1', name: 'CPU'})}/>
                    <WarehouseButton id="B1" name="HDD" onPress={() => navigation.navigate('StockListingScreen', {id: 'B1', name: 'HDD'})}/>
                    <WarehouseButton id="C1" name="Case" onPress={() => navigation.navigate('StockListingScreen', {id: 'C1', name: 'Case'})}/>
                </View>
                <View style={styles.row}>
                    <WarehouseButton id="A2" name="GPU" onPress={() => navigation.navigate('StockListingScreen', {id: 'A2', name: 'GPU'})}/>
                    <WarehouseButton id="B2" name="SSD" onPress={() => navigation.navigate('StockListingScreen', {id: 'B2', name: 'SSD'})}/>
                    <WarehouseButton id="C2" name="Cooler" onPress={() => navigation.navigate('StockListingScreen', {id: 'C2', name: 'Cooler'})}/>
                </View>
                <View style={styles.row}>
                    <WarehouseButton id="A3" name="MB" onPress={() => navigation.navigate('StockListingScreen', {id: 'A3', name: 'MB'})}/>
                    <WarehouseButton id="B3" name="RAM" onPress={() => navigation.navigate('StockListingScreen', {id: 'B3', name: 'RAM'})} />
                    <WarehouseButton id="C3" name="PSU" onPress={() => navigation.navigate('StockListingScreen', {id: 'C3', name: 'PSU'})}/>
                </View>
                <View style={[styles.row, { marginTop: 50 }]}>
                    <WarehouseButton id="OP" name="" onPress={() => navigation.navigate('OPScreen')} />
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
        marginTop: 180
    }
});
