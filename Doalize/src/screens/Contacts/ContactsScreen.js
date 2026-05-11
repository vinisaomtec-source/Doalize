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

import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

import { useTheme } from '../../hooks/useTheme';

import styles from './styles';


export default function ContactsScreen() {

  const navigation = useNavigation();

  const { theme } = useTheme();


  const [contacts, setContacts] =
    useState([]);


  // MOCK TEMPORÁRIO
  useEffect(() => {

    setContacts([
      {
        id: 1,

        name: 'Maria Silva',

        photo:
          'https://i.pravatar.cc/150?img=5',

        lastMessage:
          'Olá, ainda está disponível?',

        time: '14:32',

        unread: 2,
      },

      {
        id: 2,

        name: 'Lucas Almeida',

        photo:
          'https://i.pravatar.cc/150?img=12',

        lastMessage:
          'Obrigado pela ajuda!',

        time: '12:15',

        unread: 0,
      },

      {
        id: 3,

        name: 'Fernanda Costa',

        photo:
          'https://i.pravatar.cc/150?img=32',

        lastMessage:
          'Posso conversar com você?',

        time: 'Ontem',

        unread: 5,
      },
    ]);

  }, []);


  // ABRIR CHAT
  function openChat(contact) {

    navigation.navigate(
      'ChatScreen',
      {
        chatId: contact.id,

        user: contact,
      }
    );
  }


  // ITEM
  function renderItem({ item }) {

    return (
      <TouchableOpacity
        activeOpacity={0.8}

        onPress={() => openChat(item)}

        style={[
          styles.contactItem,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >

        {/* FOTO */}
        <Image
          source={{
            uri: item.photo,
          }}

          style={styles.avatar}
        />


        {/* INFO */}
        <View style={styles.contactInfo}>

          <Text
            style={[
              styles.name,
              {
                color: theme.text,
              },
            ]}
          >
            {item.name}
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
            {item.lastMessage}
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
            {item.time}
          </Text>


          {item.unread > 0 && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    theme.primary,
                },
              ]}
            >

              <Text
                style={styles.badgeText}
              >
                {item.unread}
              </Text>

            </View>
          )}

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