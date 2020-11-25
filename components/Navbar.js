import React from 'react';
import { StyleSheet, TouchableHighlight, View, Image } from 'react-native';
import { Icon } from 'react-native-elements'

import LogoImage from "../images/logo.png"

export default function Navbar({ navigation }) {
    return(
        <View>
            <TouchableHighlight onPress={() => navigation.toggleDrawer()}>
                <Icon 
                    style={styles.icon}
                    color='#E5E5E5'
                    name='bars'
                    type='font-awesome-5' />
            </TouchableHighlight>
            <Image
                style={styles.image}
                source={LogoImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      color: '#171717',
      fontFamily: 'Corbel',
      fontStyle: 'normal',
      fontSize: 18,
    },
    image: {
        width: '60%'
    },
    icon:{
        paddingRight: 10
    }
});