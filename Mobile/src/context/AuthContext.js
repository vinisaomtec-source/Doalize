import React, {
  createContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';


// CONTEXT
export const AuthContext = createContext({});


// PROVIDER
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // CARREGAR USUÁRIO
  async function loadUser() {

    try {

      const token = await AsyncStorage.getItem('@doalize_token');

      const userData = await AsyncStorage.getItem('@doalize_user');


      if (token && userData) {

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(JSON.parse(userData));
      }

    } catch (error) {

      console.log('Erro ao carregar usuário:', error);

    } finally {

      setLoading(false);

    }
  }


  // LOGIN
  async function signIn(email, password) {

    try {

      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;


      // SALVAR TOKEN
      await AsyncStorage.setItem(
        '@doalize_token',
        token
      );


      // SALVAR USER
      await AsyncStorage.setItem(
        '@doalize_user',
        JSON.stringify(user)
      );


      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser(user);

      return {
        success: true,
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Erro ao fazer login',
      };

    }
  }


  // CADASTRO
  async function signUp(data) {

    try {

      const response = await api.post('/auth/register', data);

      return {
        success: true,
        data: response.data,
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Erro ao cadastrar usuário',
      };

    }
  }


  // LOGOUT
  async function signOut() {

    await AsyncStorage.removeItem('@doalize_token');

    await AsyncStorage.removeItem('@doalize_user');

    setUser(null);
  }


  // UPDATE USER
  async function updateUser(userData) {

    setUser(userData);

    await AsyncStorage.setItem(
      '@doalize_user',
      JSON.stringify(userData)
    );
  }


  // INIT
  useEffect(() => {

    loadUser();

  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        signed: !!user,

        signIn,
        signUp,
        signOut,

        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}