import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  FlatList,
  Alert,
} from 'react-native';

import Header from '../../components/Header';

import PostCard from '../../components/PostCard';

import { useTheme } from '../../hooks/useTheme';

import { useAuth } from '../../hooks/useAuth';

import styles from './styles';


export default function PublishedScreen({
  navigation,
}) {

  const { theme } = useTheme();

  const { user } = useAuth();


  const [posts, setPosts] = useState([]);


  // MOCK TEMPORÁRIO
  useEffect(() => {

    loadPosts();

  }, []);


  // CARREGAR POSTS
  async function loadPosts() {

    try {

      const data = [
        {
          id: 1,

          description:
            'Publicação criada por mim.',

          createdAt: 'Agora',

          promoted: false,

          user: {
            id: user?.id,

            name: user?.name,

            photo: user?.photo,
          },

          images: [
            'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200',
          ],
        },
      ];

      setPosts(data);

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível carregar os posts.'
      );
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


  // PROMOVER
  function handlePromote(post) {

    Alert.alert(
      'Promover',
      `Publicação ${post.id} promovida novamente.`
    );
  }


  // EXCLUIR
  function handleDelete(postId) {

    Alert.alert(
      'Excluir publicação',
      'Deseja realmente excluir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',

          style: 'destructive',

          onPress: () => {

            const filtered =
              posts.filter(
                (post) =>
                  post.id !== postId
              );

            setPosts(filtered);
          },
        },
      ]
    );
  }


  // ITEM
  function renderItem({ item }) {

    return (
      <View style={styles.postContainer}>

        <PostCard
          post={item}

          onPress={() =>
            handleOpenPost(item)
          }

          onPromote={() =>
            handlePromote(item)
          }

          onShare={() => {}}
        />


        {/* EXCLUIR */}
        <View style={styles.deleteContainer}>

          <View style={styles.deleteButton}>

            <PostCard />

          </View>

        </View>

      </View>
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
      <Header
        title="Publicados"

        showBackButton
      />


      {/* LISTA */}
      <FlatList
        data={posts}

        keyExtractor={(item) =>
          String(item.id)
        }

        renderItem={({ item }) => (
          <View>

            <PostCard
              post={item}

              onPress={() =>
                handleOpenPost(item)
              }

              onShare={() => {}}

              onPromote={() =>
                handlePromote(item)
              }
            />

            {/* BOTÃO EXCLUIR */}
            <View
              style={
                styles.removeButtonContainer
              }
            >

              <View
                style={[
                  styles.removeButton,
                  {
                    backgroundColor:
                      '#ef4444',
                  },
                ]}
              >

                <Text
                  onPress={() =>
                    handleDelete(item.id)
                  }

                  style={
                    styles.removeButtonText
                  }
                >
                  Excluir publicação
                </Text>

              </View>

            </View>

          </View>
        )}

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