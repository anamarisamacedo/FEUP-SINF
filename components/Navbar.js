import React from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements'


import LogoImage from "../images/logo.png"

const Navbar = props => {
    return (
        <View style={styles.navbar}>
            <TouchableHighlight style={styles.hamburger} onPress={() => props.navigation.toggleDrawer()}>
                <Icon 
                    style={styles.icon}
                    size={35}
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
    navbar:{
        padding: 10,
        margin: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 35,

    },
    icon:{
        paddingLeft: 10,
        paddingRight: 10
    }
});

export default Navbar;