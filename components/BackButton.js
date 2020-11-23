import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const BackButton = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" color='#a9a9a9' size='26'/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    alignItems: 'center'
  }
});

export default BackButton;
