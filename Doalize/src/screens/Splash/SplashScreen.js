import React, { useEffect } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import { useTheme } from '../../hooks/useTheme';

import styles from './styles';


export default function SplashScreen({
  navigation,
}) {

  const { theme } = useTheme();


  useEffect(() => {

    const timer = setTimeout(() => {

      navigation.replace('LoginScreen');

    }, 2500);


    return () => clearTimeout(timer);

  }, []);


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >

      {/* LOGO */}
      <Text
        style={[
          styles.logo,
          {
            color: theme.primary,
          },
        ]}
      >
        DOALIZE
      </Text>


      {/* SUBTÍTULO */}
      <Text
        style={[
          styles.subtitle,
          {
            color:
              theme.textSecondary,
          },
        ]}
      >
        Conectando pessoas para ajudar
      </Text>


      {/* LOADING */}
      <ActivityIndicator
        size="large"

        color={theme.primary}

        style={styles.loader}
      />

    </View>
  );
}