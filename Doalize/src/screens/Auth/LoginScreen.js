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


export default function LoginScreen() {

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const { theme } = useTheme();


  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);


  // LOGIN
  async function handleLogin() {

    if (!email || !password) {
      return Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );
    }

    try {

      setLoading(true);

      const response = await signIn(
        email,
        password
      );

      if (!response.success) {

        Alert.alert(
          'Erro',
          response.message
        );
      }

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível fazer login.'
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
            Conectando pessoas para ajudar.
          </Text>

        </View>


        {/* FORM */}
        <View style={styles.form}>

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

          <Button
            title="Entrar"

            onPress={handleLogin}

            loading={loading}
          />

        </View>


        {/* CADASTRO */}
        <View style={styles.footer}>

          <Text
            style={[
              styles.footerText,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Não possui uma conta?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'RegisterScreen'
              )
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
              Criar conta
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}