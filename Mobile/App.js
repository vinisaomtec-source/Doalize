import React from 'react';

import { StatusBar }
  from 'expo-status-bar';

import {
  AuthProvider,
} from './src/context/AuthContext';

import {
  ThemeProvider,
} from './src/context/ThemeContext';

import {
  SocketProvider,
} from './src/context/SocketContext';

import Navigation
  from './src/navigation';


// APP
export default function App() {

  return (

    <ThemeProvider>

      <AuthProvider>

        <SocketProvider>

          <StatusBar style="auto" />

          <Navigation />

        </SocketProvider>

      </AuthProvider>

    </ThemeProvider>
  );
}