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
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import Header from '../../components/Header';

import ChatBubble from '../../components/ChatBubble';

import { useTheme } from '../../hooks/useTheme';

import { useSocket } from '../../hooks/useSocket';

import { useAuth } from '../../hooks/useAuth';

import styles from './styles';


export default function ChatScreen({
  route,
}) {

  const { chatId, user } = route.params;

  const { theme } = useTheme();

  const { socket, joinRoom, sendMessage } =
    useSocket();

  const { user: currentUser } = useAuth();


  const flatListRef = useRef(null);


  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);


  // ENTRAR NO CHAT
  useEffect(() => {

    joinRoom(chatId);


    socket.on(
      'receive_message',
      (newMessage) => {

        setMessages((oldMessages) => [
          ...oldMessages,
          newMessage,
        ]);
      }
    );


    return () => {

      socket.off('receive_message');

    };

  }, []);


  // ENVIAR TEXTO
  function handleSendMessage() {

    if (!message.trim()) return;


    const newMessage = {
      chatId,

      senderId: currentUser.id,

      type: 'text',

      content: message,

      time: new Date().toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      ),
    };


    sendMessage(newMessage);

    setMessages((old) => [
      ...old,
      newMessage,
    ]);

    setMessage('');


    setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  }


  // ENVIAR IMAGEM
  async function handlePickImage() {

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        quality: 0.7,
      });


    if (!result.canceled) {

      const imageUri =
        result.assets[0].uri;


      const newMessage = {
        chatId,

        senderId: currentUser.id,

        type: 'image',

        content: imageUri,

        time: new Date().toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
          }
        ),
      };


      sendMessage(newMessage);

      setMessages((old) => [
        ...old,
        newMessage,
      ]);
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

      {/* HEADER */}
      <Header
        title={user.name}

        showBackButton
      />


      {/* LISTA */}
      <FlatList
        ref={flatListRef}

        data={messages}

        keyExtractor={(_, index) =>
          String(index)
        }

        contentContainerStyle={
          styles.messagesContainer
        }

        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (
          <ChatBubble
            message={item}

            currentUserId={
              currentUser.id
            }
          />
        )}
      />


      {/* INPUT */}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
        ]}
      >

        {/* IMAGEM */}
        <TouchableOpacity
          onPress={handlePickImage}
          style={styles.iconButton}
        >
          <Ionicons
            name="image"
            size={24}
            color={theme.primary}
          />
        </TouchableOpacity>


        {/* TEXTO */}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
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
          onPress={handleSendMessage}
          style={styles.sendButton}
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