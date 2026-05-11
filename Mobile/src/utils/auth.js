import AsyncStorage from '@react-native-async-storage/async-storage';


// TOKEN
const TOKEN_KEY = '@doalize_token';


// USER
const USER_KEY = '@doalize_user';


// SALVAR TOKEN
export async function saveToken(token) {

  try {

    await AsyncStorage.setItem(
      TOKEN_KEY,
      token
    );

  } catch (error) {

    console.log(
      'Erro ao salvar token:',
      error
    );
  }
}


// PEGAR TOKEN
export async function getToken() {

  try {

    const token =
      await AsyncStorage.getItem(
        TOKEN_KEY
      );

    return token;

  } catch (error) {

    console.log(
      'Erro ao buscar token:',
      error
    );

    return null;
  }
}


// REMOVER TOKEN
export async function removeToken() {

  try {

    await AsyncStorage.removeItem(
      TOKEN_KEY
    );

  } catch (error) {

    console.log(
      'Erro ao remover token:',
      error
    );
  }
}


// SALVAR USUÁRIO
export async function saveUser(user) {

  try {

    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );

  } catch (error) {

    console.log(
      'Erro ao salvar usuário:',
      error
    );
  }
}


// PEGAR USUÁRIO
export async function getUser() {

  try {

    const user =
      await AsyncStorage.getItem(
        USER_KEY
      );

    return user
      ? JSON.parse(user)
      : null;

  } catch (error) {

    console.log(
      'Erro ao buscar usuário:',
      error
    );

    return null;
  }
}


// REMOVER USUÁRIO
export async function removeUser() {

  try {

    await AsyncStorage.removeItem(
      USER_KEY
    );

  } catch (error) {

    console.log(
      'Erro ao remover usuário:',
      error
    );
  }
}


// LIMPAR AUTH
export async function clearAuth() {

  try {

    await removeToken();

    await removeUser();

  } catch (error) {

    console.log(
      'Erro ao limpar autenticação:',
      error
    );
  }
}