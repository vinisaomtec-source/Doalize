import React from 'react';

import {
  View,
  TextInput,
} from 'react-native';

import styles from './styles';

import { useTheme } from '../../hooks/useTheme';


export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  editable = true,
}) {

  const { theme } = useTheme();


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.inputBackground,
          borderColor: theme.border,
        },
      ]}
    >

      <TextInput
        style={[
          styles.input,
          {
            color: theme.text,
          },
        ]}

        placeholder={placeholder}

        placeholderTextColor={theme.textSecondary}

        value={value}

        onChangeText={onChangeText}

        secureTextEntry={secureTextEntry}

        keyboardType={keyboardType}

        multiline={multiline}

        numberOfLines={numberOfLines}

        editable={editable}
      />

    </View>
  );
}