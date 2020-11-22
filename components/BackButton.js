import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const BackButton = () => {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Icon name="chevron-left" size={25} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 13,
    color: 'lightgrey'
  },
  icon: {
      color: 'lighgrey'
  }
});

export default BackButton;
