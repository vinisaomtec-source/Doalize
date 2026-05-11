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

import styles from './styles';


export default function HomeScreen({
  navigation,
}) {

  const { theme } = useTheme();


  const [posts, setPosts] = useState([]);

  const [refreshing, setRefreshing] =
    useState(false);


  // MOCK TEMPORÁRIO
  useEffect(() => {

    loadPosts();

  }, []);


  // CARREGAR POSTS
  async function loadPosts() {

    try {

      setRefreshing(true);

      // MOCK
      const data = [
        {
          id: 1,

          description:
            'Precisamos de ajuda com alimentos e roupas para uma família em situação difícil.',

          createdAt: 'Agora',

          user: {
            id: 10,

            name: 'Maria Oliveira',

            photo:
              'https://i.pravatar.cc/150?img=12',
          },

          images: [
            'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200',
          ],
        },

        {
          id: 2,

          description:
            'Estamos arrecadando materiais escolares para crianças da comunidade.',

          createdAt: '2h atrás',

          user: {
            id: 11,

            name: 'Lucas Santos',

            photo:
              'https://i.pravatar.cc/150?img=15',
          },

          images: [
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200',
          ],
        },
      ];

      setPosts(data);

    } catch (error) {

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
  function handlePromote(post) {

    Alert.alert(
      'Promover',
      `Promover publicação de ${post.user.name}`
    );
  }


  // ITEM
  function renderItem({ item }) {

    return (
      <PostCard
        post={item}

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