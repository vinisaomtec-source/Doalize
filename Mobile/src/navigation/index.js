import React, {
  useContext,
} from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  AuthContext,
} from '../context/AuthContext';


// ROTAS
import AuthRoutes
  from './AuthRoutes';

import AppRoutes
  from './AppRoutes';


const Stack =
  createNativeStackNavigator();


// NAVIGATION
export default function Navigation() {

  const {
    user,
    loading,
  } = useContext(AuthContext);


  console.log(
    'USER:',
    user
  );


  if (loading) {
    return null;
  }


  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        {user ? (

          <Stack.Screen
            name="App"
            component={AppRoutes}
          />

        ) : (

          <Stack.Screen
            name="Auth"
            component={AuthRoutes}
          />

        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}