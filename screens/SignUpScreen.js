import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TextInput,
} from "react-native";
import GeneralButton from "../components/GeneralButton";
import LogoImage from "../images/logo.png";

import { AuthContext } from "../navigation/AuthProvider";
import queries from "../db/accounts";
import BackButton from "../components/BackButton";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { register } = useContext(AuthContext);

  function registerSubmit() {
    queries.validateAuthCode(authCode).then(result => {
      if(result) {
        register(email, password).then((res) => {
          setErrorMsg(res);
          console.log(res);
          if(res == "")
            queries.addAccount(email);
        });
      } else {
        setErrorMsg("Invalid authorization code!");
      }
    })
  }

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <Image style={styles.image} source={LogoImage} />
        <View style={{ marginVertical: 60 }}></View>
        <Text style={styles.text}>email</Text>
        <View style={{ marginVertical: 4 }}></View>
        <TextInput
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
        />

        <View style={{ marginVertical: 15 }}></View>

        <Text style={styles.text}>password</Text>
        <View style={{ marginVertical: 4 }}></View>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(password) => setPassword(password)}
        />

        <View style={{ marginVertical: 15 }}></View>

        <Text style={styles.text}>authorization code</Text>
        <View style={{ marginVertical: 4 }}></View>
        <TextInput style={styles.textInput} onChangeText={(authCode) => setAuthCode(authCode)} />

        <Text style={styles.feedback}> {errorMsg} </Text>
        <View style={{ marginVertical: 10 }}></View>
        <GeneralButton
          name="sign up"
          onPress={() => registerSubmit()}
        />
      </View>
      <View style={styles.bottom}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 17,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
    alignItems: "center",
  },
  textInput: {
    color: "white",
    fontFamily: "Corbel",
    fontStyle: "normal",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "50%",
  },
  content: {
    justifyContent: "space-evenly",
    paddingVertical: 120,
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "15%",
  },
  feedback: {
    color: "red",
    marginTop: 20,
  },
});
