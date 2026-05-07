import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';


// ROTAS
import AppRoutes from './AppRoutes';

import AuthRoutes from './AuthRoutes';


// CONTEXT
import { AuthContext } from '../context/AuthContext';


// NAVIGATION
export default function Navigation() {

  const { user, loading } = useContext(AuthContext);


  // LOADING
  if (loading) {
    return null;
  }


  return (
    <NavigationContainer>

      {user ? <AppRoutes /> : <AuthRoutes />}

    </NavigationContainer>
  );
}