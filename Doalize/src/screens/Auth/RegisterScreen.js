import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';

import Button from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';

import { useTheme } from '../../hooks/useTheme';

import styles from './styles';


export default function RegisterScreen() {

  const navigation = useNavigation();

  const { signUp } = useAuth();

  const { theme } = useTheme();


  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [loading, setLoading] = useState(false);


  // CADASTRO
  async function handleRegister() {

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert(
        'Atenção',
        'As senhas não coincidem.'
      );
    }

    try {

      setLoading(true);

      const response = await signUp({
        name,
        email,
        password,
      });

      if (!response.success) {

        return Alert.alert(
          'Erro',
          response.message
        );
      }

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso.'
      );

      navigation.goBack();

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível criar a conta.'
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}

      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* LOGO */}
        <View style={styles.logoContainer}>

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

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Crie sua conta gratuitamente.
          </Text>

        </View>


        {/* FORM */}
        <View style={styles.form}>

          <Input
            placeholder="Nome"

            value={name}

            onChangeText={setName}
          />

          <Input
            placeholder="E-mail"

            value={email}

            onChangeText={setEmail}

            keyboardType="email-address"
          />

          <Input
            placeholder="Senha"

            value={password}

            onChangeText={setPassword}

            secureTextEntry
          />

          <Input
            placeholder="Confirmar senha"

            value={confirmPassword}

            onChangeText={
              setConfirmPassword
            }

            secureTextEntry
          />

          <Button
            title="Criar conta"

            onPress={handleRegister}

            loading={loading}
          />

        </View>


        {/* LOGIN */}
        <View style={styles.footer}>

          <Text
            style={[
              styles.footerText,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Já possui uma conta?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text
              style={[
                styles.registerText,
                {
                  color: theme.primary,
                },
              ]}
            >
              Fazer login
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}