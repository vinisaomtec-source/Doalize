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

import api from '../../services/api';

const BASE_URL =
  api.defaults.baseURL;

function resolveImageUrl(uri) {

  if (!uri) {
    return null;
  }

  if (
    uri.startsWith('http://') ||
    uri.startsWith('https://')
  ) {
    return uri;
  }

  if (
    uri.startsWith('/uploads')
  ) {
    return `${BASE_URL}${uri}`;
  }

  if (
    uri.startsWith('file://')
  ) {
    return uri;
  }

  return uri;
}

export default function PostCard({
  post,
  onPress,
  onShare,
  onPromote,
}) {

  const { theme } =
    useTheme();

  const hasImages =
    Array.isArray(post?.images) &&
    post.images.length > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor:
            theme.card,
        },
      ]}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <View style={styles.userInfo}>

          <Image
            source={{
              uri:
                post?.user?.photo
                  ? resolveImageUrl(
                      post.user.photo
                    )
                  : 'https://i.pravatar.cc/150',
            }}
            style={styles.avatar}
          />

          <View>

            <Text
              style={[
                styles.username,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {post?.user?.name ||
                'Usuário'}
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
              {post?.created_at ||
                'Agora'}
            </Text>

          </View>

        </View>

      </View>

      {/* IMAGEM */}
      {hasImages && (
        <Image
          source={{
            uri:
              resolveImageUrl(
                post.images[0]
              ),
          }}
          style={styles.postImage}
          resizeMode="cover"
          onError={(e) => {

            console.log(
              'ERRO IMAGEM:',
              e.nativeEvent
            );

            console.log(
              'URI:',
              resolveImageUrl(
                post.images[0]
              )
            );
          }}
        />
      )}

      {/* TEXTO */}
      <View
        style={styles.content}
      >

        <Text
          numberOfLines={4}
          style={[
            styles.description,
            {
              color:
                theme.text,
            },
          ]}
        >
          {post?.description}
        </Text>

      </View>

      {/* AÇÕES */}
      <View
        style={styles.actions}
      >

        <TouchableOpacity
          style={
            styles.actionButton
          }
          onPress={onShare}
        >
          <Ionicons
            name="paper-plane-outline"
            size={24}
            color={
              theme.primary
            }
          />

          <Text
            style={[
              styles.actionText,
              {
                color:
                  theme.primary,
              },
            ]}
          >
            Compartilhar
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.actionButton
          }
          onPress={onPromote}
        >
          <Ionicons
            name="rocket-outline"
            size={24}
            color={
              theme.primary
            }
          />

          <Text
            style={[
              styles.actionText,
              {
                color:
                  theme.primary,
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