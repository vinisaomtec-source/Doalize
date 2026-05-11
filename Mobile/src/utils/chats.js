import AsyncStorage from '@react-native-async-storage/async-storage';


// KEY
const CHATS_KEY = '@doalize_chats';


// PEGAR TODOS OS CHATS
export async function getChats() {

  try {

    const chats =
      await AsyncStorage.getItem(
        CHATS_KEY
      );

    return chats
      ? JSON.parse(chats)
      : [];

  } catch (error) {

    console.log(
      'Erro ao buscar chats:',
      error
    );

    return [];
  }
}


// SALVAR TODOS OS CHATS
export async function saveChats(chats) {

  try {

    await AsyncStorage.setItem(
      CHATS_KEY,
      JSON.stringify(chats)
    );

  } catch (error) {

    console.log(
      'Erro ao salvar chats:',
      error
    );
  }
}


// PEGAR CHAT POR ID
export async function getChatById(chatId) {

  try {

    const chats = await getChats();

    const chat = chats.find(
      (item) => item.id === chatId
    );

    return chat || null;

  } catch (error) {

    console.log(
      'Erro ao buscar chat:',
      error
    );

    return null;
  }
}


// CRIAR CHAT
export async function createChat(chatData) {

  try {

    const chats = await getChats();

    const updatedChats = [
      ...chats,
      chatData,
    ];

    await saveChats(updatedChats);

    return chatData;

  } catch (error) {

    console.log(
      'Erro ao criar chat:',
      error
    );

    return null;
  }
}


// ADICIONAR MENSAGEM
export async function addMessage(
  chatId,
  message
) {

  try {

    const chats = await getChats();

    const updatedChats = chats.map(
      (chat) => {

        if (chat.id === chatId) {

          return {
            ...chat,

            messages: [
              ...(chat.messages || []),
              message,
            ],

            lastMessage:
              message.content,

            lastMessageTime:
              message.time,
          };
        }

        return chat;
      }
    );

    await saveChats(updatedChats);

  } catch (error) {

    console.log(
      'Erro ao adicionar mensagem:',
      error
    );
  }
}


// REMOVER CHAT
export async function deleteChat(chatId) {

  try {

    const chats = await getChats();

    const filteredChats =
      chats.filter(
        (chat) => chat.id !== chatId
      );

    await saveChats(filteredChats);

  } catch (error) {

    console.log(
      'Erro ao remover chat:',
      error
    );
  }
}


// LIMPAR TODOS
export async function clearChats() {

  try {

    await AsyncStorage.removeItem(
      CHATS_KEY
    );

  } catch (error) {

    console.log(
      'Erro ao limpar chats:',
      error
    );
  }
}