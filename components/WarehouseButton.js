import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ImagePropTypes, YellowBox } from 'react-native';

const WarehouseButton = props =>  {
     return (
        <Button style={styles.container} title={props.name} onPress={() => console.log("test")}/>
     );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     marginHorizontal: 16,
     width: 200,
     color: '#ff0000',
   },
 });

export default WarehouseButton;