import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';

import Header from '../../components/Header';

import PostCard from '../../components/PostCard';

import { useTheme } from '../../hooks/useTheme';

import api from '../../services/api';

import styles from './styles';


export default function HomeScreen({
  navigation,
}) {

  const { theme } = useTheme();


  const [posts, setPosts] = useState([]);

  const [refreshing, setRefreshing] =
    useState(false);


  // INIT
  useEffect(() => {

    loadPosts();

  }, []);


  // CARREGAR POSTS
  async function loadPosts() {

    try {

      setRefreshing(true);

      const response =
        await api.get('/posts');

      setPosts(response.data);

    } catch (error) {

      console.log(
        'Erro ao carregar posts:',
        error.response?.data ||
        error.message
      );

      Alert.alert(
        'Erro',
        'Não foi possível carregar o feed.'
      );

    } finally {

      setRefreshing(false);

    }
  }


  // ABRIR DETALHES
  function handleOpenPost(post) {

    navigation.navigate(
      'DetailsScreen',
      {
        post,
      }
    );
  }


  // COMPARTILHAR
  function handleShare(post) {

    Alert.alert(
      'Compartilhar',
      `Compartilhar publicação de ${post.user.name}`
    );
  }


  // PROMOVER
  async function handlePromote(post) {

    try {

      await api.post(
        `/posts/promote/${post.id}`
      );

      Alert.alert(
        'Sucesso',
        'Publicação promovida.'
      );

      loadPosts();

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );

      Alert.alert(
        'Erro',
        'Não foi possível promover.'
      );
    }
  }


  // ITEM
  function renderItem({ item }) {

    return (
      <PostCard
        post={{
          ...item,

          // FEED MOSTRA SOMENTE A PRIMEIRA IMAGEM
          images:
            item.images?.length > 0
              ? [item.images[0]]
              : [],
        }}

        onPress={() =>
          handleOpenPost(item)
        }

        onShare={() =>
          handleShare(item)
        }

        onPromote={() =>
          handlePromote(item)
        }
      />
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
      <Header title="DOALIZE" />


      {/* FEED */}
      <FlatList
        data={posts}

        keyExtractor={(item) =>
          String(item.id)
        }

        renderItem={renderItem}

        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.feed
        }

        refreshControl={
          <RefreshControl
            refreshing={refreshing}

            onRefresh={loadPosts}

            tintColor={theme.primary}
          />
        }
      />

    </View>
  );
}