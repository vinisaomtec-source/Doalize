import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';

import Header
  from '../../components/Header';

import {
  useTheme,
} from '../../hooks/useTheme';

import api
  from '../../services/api';

import styles
  from './styles';


export default function ContactsScreen() {

  const navigation =
    useNavigation();

  const { theme } =
    useTheme();


  const [contacts, setContacts] =
    useState([]);


  // BUSCAR CONVERSAS
  async function loadContacts() {

    try {

      const response =
        await api.get('/chat');

      setContacts(
        response.data
      );

    } catch (error) {

      console.log(
        'Erro ao buscar contatos:',
        error.response?.data ||
        error.message
      );
    }
  }


  // ATUALIZAR AO ABRIR TELA
  useFocusEffect(
    React.useCallback(() => {

      loadContacts();

    }, [])
  );


  // ABRIR CHAT
  function openChat(contact) {

    navigation.navigate(
      'ChatScreen',
      {
        chatId:
          contact.id,

        user:
          contact.user,
      }
    );
  }


  // FORMATAR HORA
  function formatTime(date) {

    if (!date) {
      return '';
    }

    return new Date(date)
      .toLocaleTimeString(
        'pt-BR',
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      );
  }


  // ITEM
  function renderItem({ item }) {

    return (

      <TouchableOpacity
        activeOpacity={0.8}

        onPress={() =>
          openChat(item)
        }

        style={[
          styles.contactItem,
          {
            backgroundColor:
              theme.card,

            borderColor:
              theme.border,
          },
        ]}
      >

        {/* FOTO */}
        <Image
          source={{
            uri:
              item?.user?.photo ||

              'https://i.pravatar.cc/150',
          }}

          style={styles.avatar}
        />


        {/* INFO */}
        <View style={styles.contactInfo}>

          <Text
            style={[
              styles.name,
              {
                color:
                  theme.text,
              },
            ]}
          >
            {item?.user?.name}
          </Text>

          <Text
            numberOfLines={1}

            style={[
              styles.lastMessage,
              {
                color:
                  theme.textSecondary,
              },
            ]}
          >
            {item?.lastMessage ||
              'Nenhuma mensagem'}
          </Text>

        </View>


        {/* LADO DIREITO */}
        <View style={styles.rightContent}>

          <Text
            style={[
              styles.time,
              {
                color:
                  theme.textSecondary,
              },
            ]}
          >
            {formatTime(
              item?.lastMessageTime
            )}
          </Text>

        </View>

      </TouchableOpacity>
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
      <Header title="Contatos" />


      {/* LISTA */}
      <FlatList
        data={contacts}

        keyExtractor={(item) =>
          String(item.id)
        }

        renderItem={renderItem}

        contentContainerStyle={
          styles.list
        }

        showsVerticalScrollIndicator={
          false
        }
      />

    </View>
  );
}