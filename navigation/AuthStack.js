import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EntryScreen from '../screens/EntryScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='EntryScreen' component={EntryScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}