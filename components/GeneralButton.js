import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const GeneralButton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    alignItems: 'center',
    height: 45,
    width: 110,
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 2,
    borderWidth: 1,
  },
  text: {
    color: 'white',
    fontFamily: 'Corbel',
    fontStyle: 'normal',
    fontSize: 18,
  }
});

export default GeneralButton;