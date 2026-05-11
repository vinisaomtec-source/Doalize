import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../hooks/useTheme';

import styles from './styles';


export default function Header({
  title,
  showBackButton = false,
  rightIcon = null,
  onRightPress = null,
}) {

  const navigation = useNavigation();

  const { theme } = useTheme();


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
        },
      ]}
    >

      {/* BOTÃO VOLTAR */}
      <View style={styles.leftContainer}>

        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.text}
            />
          </TouchableOpacity>
        )}

      </View>


      {/* TÍTULO */}
      <View style={styles.centerContainer}>

        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

      </View>


      {/* ÍCONE DIREITA */}
      <View style={styles.rightContainer}>

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightPress}
            style={styles.iconButton}
          >
            <Ionicons
              name={rightIcon}
              size={24}
              color={theme.text}
            />
          </TouchableOpacity>
        )}

      </View>

    </View>
  );
}