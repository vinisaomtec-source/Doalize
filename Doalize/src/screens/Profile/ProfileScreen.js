import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Header from '../../components/Header';

import { useTheme } from '../../hooks/useTheme';

import { useAuth } from '../../hooks/useAuth';

import styles from './styles';


export default function ProfileScreen({
  navigation,
}) {

  const { theme, darkMode, toggleTheme } =
    useTheme();

  const { user } = useAuth();


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

      {/* HEADER */}
      <Header title="Conta" />


      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* PERFIL */}
        <View style={styles.profileContainer}>

          <Image
            source={{
              uri:
                user?.photo ||
                'https://i.pravatar.cc/150',
            }}

            style={styles.avatar}
          />

          <Text
            style={[
              styles.name,
              {
                color: theme.text,
              },
            ]}
          >
            {user?.name || 'Usuário'}
          </Text>

          <Text
            style={[
              styles.description,
              {
                color:
                  theme.textSecondary,
              },
            ]}
          >
            {user?.description ||
              'Nenhuma descrição adicionada.'}
          </Text>

        </View>


        {/* BOTÕES */}
        <View style={styles.actionsContainer}>

          {/* PUBLICADOS */}
          <TouchableOpacity
            activeOpacity={0.8}

            onPress={() =>
              navigation.navigate(
                'PublishedScreen'
              )
            }

            style={[
              styles.actionButton,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >

            <Ionicons
              name="images-outline"

              size={22}

              color={theme.primary}
            />

            <Text
              style={[
                styles.actionText,
                {
                  color: theme.text,
                },
              ]}
            >
              Publicados
            </Text>

          </TouchableOpacity>


          {/* TEMA */}
          <TouchableOpacity
            activeOpacity={0.8}

            onPress={toggleTheme}

            style={[
              styles.actionButton,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >

            <Ionicons
              name={
                darkMode
                  ? 'sunny-outline'
                  : 'moon-outline'
              }

              size={22}

              color={theme.primary}
            />

            <Text
              style={[
                styles.actionText,
                {
                  color: theme.text,
                },
              ]}
            >
              {darkMode
                ? 'Modo Claro'
                : 'Modo Escuro'}
            </Text>

          </TouchableOpacity>


          {/* CONFIGURAÇÕES */}
          <TouchableOpacity
            activeOpacity={0.8}

            onPress={() =>
              navigation.navigate(
                'SettingsScreen'
              )
            }

            style={[
              styles.actionButton,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >

            <Ionicons
              name="settings-outline"

              size={22}

              color={theme.primary}
            />

            <Text
              style={[
                styles.actionText,
                {
                  color: theme.text,
                },
              ]}
            >
              Configurações
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>
  );
}