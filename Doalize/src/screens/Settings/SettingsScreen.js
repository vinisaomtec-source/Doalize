import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';

import Header from '../../components/Header';

import Input from '../../components/Input';

import Button from '../../components/Button';

import { useTheme } from '../../hooks/useTheme';

import { useAuth } from '../../hooks/useAuth';

import styles from './styles';


export default function SettingsScreen() {

  const { theme } = useTheme();

  const {
    user,
    updateUser,
    signOut,
  } = useAuth();


  const [name, setName] = useState(
    user?.name || ''
  );

  const [email, setEmail] = useState(
    user?.email || ''
  );

  const [password, setPassword] =
    useState('');

  const [location, setLocation] =
    useState(user?.location || '');

  const [loading, setLoading] =
    useState(false);


  // SALVAR
  async function handleSave() {

    try {

      setLoading(true);

      const updatedUser = {
        ...user,

        name,
        email,
        location,
      };

      // API FUTURA

      await updateUser(updatedUser);

      Alert.alert(
        'Sucesso',
        'Dados atualizados.'
      );

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível salvar.'
      );

    } finally {

      setLoading(false);

    }
  }


  // SAIR
  function handleLogout() {

    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Sair',

          onPress: signOut,
        },
      ]
    );
  }


  // EXCLUIR
  function handleDeleteAccount() {

    Alert.alert(
      'Excluir conta',
      'Essa ação não poderá ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',

          style: 'destructive',

          onPress: () => {
            signOut();
          },
        },
      ]
    );
  }


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
      <Header
        title="Configurações"

        showBackButton
      />


      <ScrollView
        contentContainerStyle={
          styles.content
        }

        showsVerticalScrollIndicator={
          false
        }
      >

        {/* NOME */}
        <Text
          style={[
            styles.label,
            {
              color: theme.text,
            },
          ]}
        >
          Nome
        </Text>

        <Input
          placeholder="Nome"

          value={name}

          onChangeText={setName}
        />


        {/* EMAIL */}
        <Text
          style={[
            styles.label,
            {
              color: theme.text,
            },
          ]}
        >
          E-mail
        </Text>

        <Input
          placeholder="E-mail"

          value={email}

          onChangeText={setEmail}

          keyboardType="email-address"
        />


        {/* SENHA */}
        <Text
          style={[
            styles.label,
            {
              color: theme.text,
            },
          ]}
        >
          Nova senha
        </Text>

        <Input
          placeholder="Nova senha"

          value={password}

          onChangeText={setPassword}

          secureTextEntry
        />


        {/* LOCALIZAÇÃO */}
        <Text
          style={[
            styles.label,
            {
              color: theme.text,
            },
          ]}
        >
          Localização
        </Text>

        <Input
          placeholder="Sua localização"

          value={location}

          onChangeText={setLocation}
        />


        {/* SALVAR */}
        <Button
          title="Salvar alterações"

          onPress={handleSave}

          loading={loading}
        />


        {/* SAIR */}
        <Button
          title="Sair da conta"

          onPress={handleLogout}

          type="secondary"
        />


        {/* EXCLUIR */}
        <Button
          title="Excluir conta"

          onPress={
            handleDeleteAccount
          }

          type="danger"
        />

      </ScrollView>

    </View>
  );
}