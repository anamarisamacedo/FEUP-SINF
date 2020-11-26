import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TextInput } from 'react-native';
import GeneralButton from '../components/GeneralButton';

import LogoImage from "../images/logo.png"

export default function SignUpScreen({ navigation }) {

    function GoHome() {
        console.log("Navigating to warehouse screen...");
        navigation.navigate('WarehouseScreen');
    }

    return (
        <View style={styles.main}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={LogoImage}
                />
                <View style={{ marginVertical: 30 }}></View>
                <Text style={styles.text}>username</Text>
                <View style={{ marginVertical: 4 }}></View>
                <TextInput style={styles.textInput} onChangeText={text => {}}/>

                <View style={{ marginVertical: 15 }}></View>

                <Text style={styles.text}>password</Text>
                <View style={{ marginVertical: 4 }}></View>
                <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={text => {}}/>

                <View style={{ marginVertical: 15 }}></View>

                <Text style={styles.text}>authorization code</Text>
                <View style={{ marginVertical: 4 }}></View>
                <TextInput style={styles.textInput} onChangeText={text => {}}/>

                <View style={{ marginVertical: 30 }}></View>
                <GeneralButton name="sign up" onPress={GoHome} />
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
    text: {
        color: 'white',
        fontFamily: 'Corbel',
        fontStyle: 'normal',
    },
    textInput: {
        color: 'white',
        fontFamily: 'Corbel',
        fontStyle: 'normal',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: '50%',
    },
    content: {
        paddingVertical: 220,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '15%',
    }
});
