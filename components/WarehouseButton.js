import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const WarehouseButton = props =>  {
     return (
        <TouchableOpacity style={styles.button} onPress={() => console.log("warehouse button pressed")}>
          <Text style={[styles.text, styles.warehouseId]}>{props.id}</Text>
          <Text style={styles.text}>{props.name}</Text>
        </TouchableOpacity> 
     );
}

const styles = StyleSheet.create({
   button: {
     backgroundColor: 'black',
     alignItems: "center",
     height: 90,
     width: 90,
     paddingTop: 8,
     borderColor: 'white',
     borderRadius: 7,
     borderWidth: 1,
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