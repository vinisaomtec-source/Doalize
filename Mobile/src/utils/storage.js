import AsyncStorage from '@react-native-async-storage/async-storage';


// SALVAR ITEM
export async function setStorage(
  key,
  value
) {

  try {

    const data =
      typeof value === 'string'
        ? value
        : JSON.stringify(value);

    await AsyncStorage.setItem(
      key,
      data
    );

    return true;

  } catch (error) {

    console.log(
      'Erro ao salvar no storage:',
      error
    );

    return false;
  }
}


// PEGAR ITEM
export async function getStorage(key) {

  try {

    const data =
      await AsyncStorage.getItem(key);

    if (!data) return null;

    try {

      return JSON.parse(data);

    } catch {

      return data;
    }

  } catch (error) {

    console.log(
      'Erro ao buscar no storage:',
      error
    );

    return null;
  }
}


// REMOVER ITEM
export async function removeStorage(key) {

  try {

    await AsyncStorage.removeItem(key);

    return true;

  } catch (error) {

    console.log(
      'Erro ao remover do storage:',
      error
    );

    return false;
  }
}


// LIMPAR STORAGE
export async function clearStorage() {

  try {

    await AsyncStorage.clear();

    return true;

  } catch (error) {

    console.log(
      'Erro ao limpar storage:',
      error
    );

    return false;
  }
}