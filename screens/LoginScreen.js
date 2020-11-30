import React, {useState, useContext} from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TextInput } from 'react-native';
import GeneralButton from '../components/GeneralButton';

import { AuthContext } from '../navigation/AuthProvider';

import LogoImage from "../images/logo.png"

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { login } = useContext(AuthContext);

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
                <TextInput email="email" style={styles.textInput} onChangeText={email => setEmail(email)}/>

                <View style={{ marginVertical: 20 }}></View>

                <Text style={styles.text}>password</Text>
                <View style={{ marginVertical: 4 }}></View>
                <TextInput name="password" secureTextEntry={true} style={styles.textInput} onChangeText={password => setPassword(password)}/>

                <View style={{ marginVertical: 30 }}></View>
                <GeneralButton name="login" onPress={() => login(email, password)} />
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
        width: '80%',
        height: '15%',
    }
});
