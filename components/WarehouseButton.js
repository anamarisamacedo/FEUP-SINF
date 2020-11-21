import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ImagePropTypes } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WarehouseButton = props =>  {
     return (
        <TouchableOpacity style={styles.button} onPress={() => console.log("test")}>
          <Text style={[styles.text, styles.warehouseId]}>{props.id}</Text>
          <Text style={styles.text}>{props.name}</Text>
        </TouchableOpacity> 
     );
}

const styles = StyleSheet.create({
   button: {
     backgroundColor: 'black',
     alignItems: "center",
     paddingHorizontal: 24,
     paddingVertical: 13,
     borderColor: 'white',
     borderRadius: 7,
     borderWidth: 1,
     color: 'white',
   },
   text: {
    color: 'white',
    fontFamily: 'Corbel',
    fontStyle: 'normal',
    fontSize: 24,
   },
   warehouseId: {
     fontWeight: 'bold',
     marginBottom: 5,
     fontSize: 27,
   }
 });

export default WarehouseButton;