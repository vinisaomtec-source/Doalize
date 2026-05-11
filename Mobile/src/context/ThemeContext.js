import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import lightTheme from '../styles/theme';

import darkTheme from '../styles/darkTheme';


// CONTEXT
export const ThemeContext = createContext({});


// PROVIDER
export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(lightTheme);

  const [darkMode, setDarkMode] = useState(false);

  const [loadingTheme, setLoadingTheme] = useState(true);


  // CARREGAR TEMA
  async function loadTheme() {

    try {

      const savedTheme = await AsyncStorage.getItem(
        '@doalize_theme'
      );


      if (savedTheme === 'dark') {

        setTheme(darkTheme);

        setDarkMode(true);

      } else {

        setTheme(lightTheme);

        setDarkMode(false);

      }

    } catch (error) {

      console.log('Erro ao carregar tema:', error);

    } finally {

      setLoadingTheme(false);

    }
  }


  // ALTERAR TEMA
  async function toggleTheme() {

    try {

      if (darkMode) {

        setTheme(lightTheme);

        setDarkMode(false);

        await AsyncStorage.setItem(
          '@doalize_theme',
          'light'
        );

      } else {

        setTheme(darkTheme);

        setDarkMode(true);

        await AsyncStorage.setItem(
          '@doalize_theme',
          'dark'
        );

      }

    } catch (error) {

      console.log('Erro ao alterar tema:', error);

    }
  }


  // INIT
  useEffect(() => {

    loadTheme();

  }, []);


  return (
    <ThemeContext.Provider
      value={{
        theme,

        darkMode,

        loadingTheme,

        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}