import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import Header
  from '../../components/Header';

import ChatBubble
  from '../../components/ChatBubble';

import {
  useTheme,
} from '../../hooks/useTheme';

import {
  useSocket,
} from '../../hooks/useSocket';

import {
  useAuth,
} from '../../hooks/useAuth';

import api
  from '../../services/api';

import styles
  from './styles';


export default function ChatScreen({
  route,
}) {

  const {
    chatId,
    user,
  } = route.params;

  const { theme } =
    useTheme();

  const {
    socket,
    joinRoom,
    sendMessage,
  } = useSocket();

  const {
    user: currentUser,
  } = useAuth();


  const flatListRef =
    useRef(null);


  const [message, setMessage] =
    useState('');

  const [messages, setMessages] =
    useState([]);


  // BUSCAR MENSAGENS
  async function loadMessages() {

    try {

      const response =
        await api.get(
          `/chat/messages/${user.id}`
        );

      setMessages(
        response.data
      );

    } catch (error) {

      console.log(
        'Erro ao buscar mensagens:',
        error.response?.data ||
        error.message
      );
    }
  }


  // INIT
  useEffect(() => {

    loadMessages();

    joinRoom(chatId);


    socket.on(
      'receive_message',
      (newMessage) => {

        const isCurrentChat =

          Number(
            newMessage.sender_id
          ) === Number(user.id)

          ||

          Number(
            newMessage.receiver_id
          ) === Number(user.id);


        if (isCurrentChat) {

          setMessages(
            (oldMessages) => {

              const exists =
                oldMessages.some(
                  (msg) =>
                    msg.id ===
                    newMessage.id
                );

              if (exists) {
                return oldMessages;
              }

              return [
                ...oldMessages,
                newMessage,
              ];
            }
          );


          setTimeout(() => {

            flatListRef.current
              ?.scrollToEnd({
                animated: true,
              });

          }, 100);
        }
      }
    );


    return () => {

      socket.off(
        'receive_message'
      );
    };

  }, []);


  // ENVIAR TEXTO
  async function handleSendMessage() {

    if (!message.trim()) {
      return;
    }

    try {

      const body = {

        receiver_id:
          user.id,

        message:
          message,
      };


      // SALVAR NO BANCO
      const response =
        await api.post(
          '/chat/send',
          body
        );


      // MENSAGEM SALVA
      const savedMessage =
        response.data;


      // SOCKET
      sendMessage(
        savedMessage
      );


      // ADICIONAR LOCAL
      setMessages(
        (old) => [

          ...old,
          savedMessage,
        ]
      );

      setMessage('');


      setTimeout(() => {

        flatListRef.current
          ?.scrollToEnd({
            animated: true,
          });

      }, 100);

    } catch (error) {

      console.log(
        'Erro ao enviar:',
        error.response?.data ||
        error.message
      );
    }
  }


  return (

    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}

      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >

      {/* HEADER */}
      <Header
        title={user.name}

        showBackButton
      />


      {/* LISTA */}
      <FlatList
        ref={flatListRef}

        data={messages}

        keyExtractor={(item, index) =>
          String(
            item.id || index
          )
        }

        contentContainerStyle={
          styles.messagesContainer
        }

        showsVerticalScrollIndicator={
          false
        }

        renderItem={({ item }) => (

          <ChatBubble
            message={item}

            currentUserId={
              currentUser.id
            }
          />
        )}

        onContentSizeChange={() => {

          flatListRef.current
            ?.scrollToEnd({
              animated: true,
            });
        }}
      />


      {/* INPUT */}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor:
              theme.card,

            borderTopColor:
              theme.border,
          },
        ]}
      >

        <TextInput
          style={[
            styles.input,
            {
              color:
                theme.text,

              backgroundColor:
                theme.inputBackground,
            },
          ]}

          placeholder="Digite uma mensagem..."

          placeholderTextColor={
            theme.textSecondary
          }

          value={message}

          onChangeText={setMessage}
        />


        {/* ENVIAR */}
        <TouchableOpacity
          onPress={
            handleSendMessage
          }

          style={
            styles.sendButton
          }
        >

          <Ionicons
            name="send"

            size={22}

            color="#ffffff"
          />

        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  );
}