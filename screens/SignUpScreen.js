import React, {useState, useContext} from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TextInput } from 'react-native';
import GeneralButton from '../components/GeneralButton';
import LogoImage from "../images/logo.png"

import { AuthContext } from '../navigation/AuthProvider';

export default function SignUpScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { register } = useContext(AuthContext);

    function registerSubmit() {
        register(email, password).then((res) => {
            setErrorMsg(res);
        })
    }

    return (
        <View style={styles.main}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={LogoImage}
                />
                <View style={{ marginVertical: 30 }}></View>
                <Text style={styles.text}>email</Text>
                <View style={{ marginVertical: 4 }}></View>
                <TextInput style={styles.textInput} onChangeText={email => setEmail(email)}/>

                <View style={{ marginVertical: 15 }}></View>

                <Text style={styles.text}>password</Text>
                <View style={{ marginVertical: 4 }}></View>
                <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={password => setPassword(password)}/>

                <View style={{ marginVertical: 15 }}></View>

                <Text style={styles.text}>authorization code</Text>
                <View style={{ marginVertical: 4 }}></View>
                <TextInput style={styles.textInput} onChangeText={text => {}}/>

                <Text style={styles.feedback}> {errorMsg} </Text>

                <View style={{ marginVertical: 30 }}></View>
                <GeneralButton name="sign up" onPress={() => registerSubmit(email, password)} />
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
    },
    feedback: {
        color: 'red',
        marginTop: 20
    }
});
