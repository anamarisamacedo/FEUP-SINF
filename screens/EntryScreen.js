import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { createDrawerNavigator, DrawerActions } from '@react-navigation/drawer';
import GeneralButton from '../components/GeneralButton';
import Functions from '../logic/routes';
import LogoImage from "../images/logo.png";

const Drawer = createDrawerNavigator();

export default function EntryScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={LogoImage}
                />
                <View style={{ marginVertical: 30 }}></View>
                <GeneralButton name="login" onPress={() => navigation.navigate('LoginScreen')} />
                <View style={{ marginVertical: 30 }}></View>
                <GeneralButton name="sign up" onPress={() => navigation.navigate('SignUpScreen')} />

                <GeneralButton name="temp" onPress={() => console.log(Functions.findBestRoute
                    (['A21', 'A31', 'B22', 'B21', 'B11', 'C32']))} />
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
