import React from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Header from '../../components/Header';

import { useTheme } from '../../hooks/useTheme';

import styles from './styles';


export default function DetailsScreen({
  route,
  navigation,
}) {

  const { post } = route.params;

  const { theme } = useTheme();


  // ABRIR CHAT
  function handleOpenChat() {

    navigation.navigate(
      'ChatScreen',
      {
        chatId: post.user.id,

        user: post.user,
      }
    );
  }


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >

      {/* HEADER */}
      <Header
        title="Detalhes"

        showBackButton
      />


      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* USUÁRIO */}
        <View style={styles.userContainer}>

          <Image
            source={{
              uri:
                post?.user?.photo ||
                'https://i.pravatar.cc/150',
            }}

            style={styles.avatar}
          />


          <View style={styles.userInfo}>

            <Text
              style={[
                styles.username,
                {
                  color: theme.text,
                },
              ]}
            >
              {post?.user?.name}
            </Text>

            <Text
              style={[
                styles.date,
                {
                  color:
                    theme.textSecondary,
                },
              ]}
            >
              {post?.createdAt}
            </Text>

          </View>

        </View>


        {/* IMAGENS */}
        <ScrollView
          horizontal

          pagingEnabled

          showsHorizontalScrollIndicator={
            false
          }
        >

          {post?.images?.map(
            (image, index) => (
              <Image
                key={index}

                source={{
                  uri: image,
                }}

                style={styles.image}
              />
            )
          )}

        </ScrollView>


        {/* TEXTO */}
        <View style={styles.content}>

          <Text
            style={[
              styles.description,
              {
                color: theme.text,
              },
            ]}
          >
            {post?.description}
          </Text>

        </View>


        {/* BOTÃO CHAT */}
        <TouchableOpacity
          activeOpacity={0.8}

          onPress={handleOpenChat}

          style={[
            styles.chatButton,
            {
              backgroundColor:
                theme.primary,
            },
          ]}
        >

          <Ionicons
            name="chatbubble"

            size={22}

            color="#ffffff"
          />

          <Text style={styles.chatButtonText}>
            Conversar
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}