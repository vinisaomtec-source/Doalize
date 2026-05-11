import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

import { useTheme } from '../../hooks/useTheme';


export default function PostCard({
  post,
  onPress,
  onShare,
  onPromote,
}) {

  const { theme } = useTheme();


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
        },
      ]}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <View style={styles.userInfo}>

          <Image
            source={{
              uri:
                post?.user?.photo ||
                'https://i.pravatar.cc/150',
            }}
            style={styles.avatar}
          />

          <View>

            <Text
              style={[
                styles.username,
                {
                  color: theme.text,
                },
              ]}
            >
              {post?.user?.name || 'Usuário'}
            </Text>

            <Text
              style={[
                styles.date,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              {post?.createdAt || 'Agora'}
            </Text>

          </View>

        </View>

      </View>


      {/* IMAGEM */}
      {post?.images?.length > 0 && (
        <Image
          source={{
            uri: post.images[0],
          }}
          style={styles.postImage}
        />
      )}


      {/* TEXTO */}
      <View style={styles.content}>

        <Text
          numberOfLines={4}
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


      {/* AÇÕES */}
      <View style={styles.actions}>

        {/* SHARE */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onShare}
        >
          <Ionicons
            name="paper-plane-outline"
            size={24}
            color={theme.primary}
          />

          <Text
            style={[
              styles.actionText,
              {
                color: theme.primary,
              },
            ]}
          >
            Compartilhar
          </Text>

        </TouchableOpacity>


        {/* PROMOVER */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onPromote}
        >
          <Ionicons
            name="rocket-outline"
            size={24}
            color={theme.primary}
          />

          <Text
            style={[
              styles.actionText,
              {
                color: theme.primary,
              },
            ]}
          >
            Promover
          </Text>

        </TouchableOpacity>

      </View>

    </TouchableOpacity>
  );
}