import React, {
  useContext,
} from 'react';

import { createNativeStackNavigator }
  from '@react-navigation/native-stack';

import { AuthContext }
  from '../context/AuthContext';


// TELAS
import LoginScreen
  from '../screens/Auth/LoginScreen';

import RegisterScreen
  from '../screens/Auth/RegisterScreen';


// STACK
const Stack =
  createNativeStackNavigator();


// AUTH ROUTES
export default function AuthRoutes() {

  const { user } =
    useContext(AuthContext);


  console.log(user);


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        animation:
          'slide_from_right',
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