import React from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';

import styles from './styles';

import { useTheme } from '../../hooks/useTheme';


export default function ChatBubble({
  message,
  currentUserId,
}) {

  const { theme } = useTheme();

  const isMine =
    message?.senderId === currentUserId;


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
      {message?.type === 'text' && (
        <View
          style={[
            styles.bubble,

            {
              backgroundColor: isMine
                ? theme.primary
                : theme.card,
            },
          ]}
        >

          <Text
            style={[
              styles.messageText,

              {
                color: isMine
                  ? '#ffffff'
                  : theme.text,
              },
            ]}
          >
            {message?.content}
          </Text>

        </View>
      )}


      {/* IMAGEM */}
      {message?.type === 'image' && (
        <Image
          source={{
            uri: message?.content,
          }}
          style={styles.image}
        />
      )}


      {/* HORÁRIO */}
      <Text
        style={[
          styles.time,

          {
            color: theme.textSecondary,
          },
        ]}
      >
        {message?.time || ''}
      </Text>

    </View>
  );
}