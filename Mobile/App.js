import React from 'react';

import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './src/navigation/AuthRoutes';

import { AuthProvider } from './src/context/AuthContext';

import { ThemeProvider } from './src/context/ThemeContext';

import { SocketProvider } from './src/context/SocketContext';


export default function App() {

  return (

    <ThemeProvider>

      <AuthProvider>

        <SocketProvider>

          <NavigationContainer>

            <StatusBar style="auto" />

            <AppRoutes />

          </NavigationContainer>

        </SocketProvider>

      </AuthProvider>

    </ThemeProvider>

  );
}