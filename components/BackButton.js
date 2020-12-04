import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const BackButton = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Icon name="chevron-left" color="#a9a9a9" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    alignItems: "center",
  },
});

export default BackButton;
