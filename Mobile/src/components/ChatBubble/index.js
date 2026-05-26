import React from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';

import {
  useTheme,
} from '../../hooks/useTheme';

import styles from './styles';


export default function ChatBubble({
  message,
  currentUserId,
}) {

  const { theme } = useTheme();


  // VERIFICAR SE É MINHA
  const isMine =

    Number(
      message?.sender_id
    ) === Number(currentUserId)


    ||

    Number(
      message?.senderId
    ) === Number(currentUserId);


  // TEXTO DA MENSAGEM
  const content =

    message?.message ||

    message?.content ||

    '';


  // TIPO
  const type =

    message?.type ||

    (message?.image
      ? 'image'
      : 'text');


  // HORÁRIO
  const time =

    message?.created_at ||

    message?.time ||

    '';


  return (

    <View
      style={[
        styles.container,

        isMine
          ? styles.myMessageContainer
          : styles.otherMessageContainer,
      ]}
    >

      {/* TEXTO */}
      {type === 'text' && (

        <View
          style={[
            styles.bubble,

            {
              backgroundColor:
                isMine
                  ? theme.primary
                  : theme.card,
            },
          ]}
        >

          <Text
            style={[
              styles.messageText,

              {
                color:
                  isMine
                    ? '#ffffff'
                    : theme.text,
              },
            ]}
          >
            {content}
          </Text>

        </View>
      )}


      {/* IMAGEM */}
      {type === 'image' && (

        <Image
          source={{
            uri:
              message?.image ||
              content,
          }}

          style={styles.image}
        />
      )}


      {/* HORÁRIO */}
      <Text
        style={[
          styles.time,

          {
            color:
              theme.textSecondary,
          },
        ]}
      >
        {String(time)}
      </Text>

    </View>
  );
}