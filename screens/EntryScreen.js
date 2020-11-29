import React, {useState} from 'react';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { createDrawerNavigator, DrawerActions } from '@react-navigation/drawer';
import GeneralButton from '../components/GeneralButton';

import LogoImage from "../images/logo.png";

import {db} from '../config';


const Drawer = createDrawerNavigator();

export default function EntryScreen({ navigation }) {
    const [value, setValue] = useState(0);
    db.ref('/artigo').once('value', querySnapShot => {
        setValue(querySnapShot.val());
        //console.log(value);
    });
    //console.log(value);
    return (
        <View style={styles.main}>
            <Text style={{color: 'white', fontSize: 50}}>{value}</Text>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={LogoImage}
                />
                <View style={{ marginVertical: 30 }}></View>
                <GeneralButton name="login" onPress={() => navigation.navigate('LoginScreen')} />
                <View style={{ marginVertical: 30 }}></View>
                <GeneralButton name="sign up" onPress={() => navigation.navigate('SignUpScreen')} />
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
    content: {
        paddingVertical: 220,
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: '25%',
    }
});
