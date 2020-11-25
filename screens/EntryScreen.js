import React from 'react';
import { StyleSheet, View, Dimensions, Image, ActionSheetIOS } from 'react-native';
import GeneralButton from '../components/GeneralButton';

import LogoImage from "../images/logo.png"

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
