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
import { AuthContext, AuthProvider } from "../navigation/AuthProvider";
import LogoImage from "../images/logo.png";
import BackButton from "../components/BackButton";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const [shouldShow, setShouldShow] = useState(false);

  function loginSubmit() {
    login(email, password).then((res) => {
      if (res == false) {
        setShouldShow(true);
      } else {
        setShouldShow(false);
      }
    });
  }

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <Image style={styles.image} source={LogoImage} />
        <View style={{ marginVertical: 60 }}></View>
        <Text style={styles.text}>username</Text>
        <View style={{ marginVertical: 4 }}></View>
        <TextInput
          email="email"
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
        />

        <View style={{ marginVertical: 20 }}></View>

        <Text style={styles.text}>password</Text>
        <View style={{ marginVertical: 4 }}></View>
        <TextInput
          name="password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(password) => setPassword(password)}
        />

        <Text style={styles.feedback}>
          {shouldShow ? "Wrong email or password!" : ""}{" "}
        </Text>

        <View style={{ marginVertical: 30 }}></View>
        <GeneralButton name="login" onPress={() => loginSubmit()} />
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
