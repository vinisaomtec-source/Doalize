import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


// TELAS
import LoginScreen from '../screens/Auth/LoginScreen';

import RegisterScreen from '../screens/Auth/RegisterScreen';


// STACK
const Stack = createNativeStackNavigator();


// AUTH ROUTES
export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        animation: 'slide_from_right',
      }}
    >
      {/* LOGIN */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />

      {/* CADASTRO */}
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}