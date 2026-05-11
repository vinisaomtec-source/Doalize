import AsyncStorage from '@react-native-async-storage/async-storage';


// KEY
const POSTS_KEY = '@doalize_posts';


// PEGAR POSTS
export async function getPosts() {

  try {

    const posts =
      await AsyncStorage.getItem(
        POSTS_KEY
      );

    return posts
      ? JSON.parse(posts)
      : [];

  } catch (error) {

    console.log(
      'Erro ao buscar posts:',
      error
    );

    return [];
  }
}


// SALVAR POSTS
export async function savePosts(posts) {

  try {

    await AsyncStorage.setItem(
      POSTS_KEY,
      JSON.stringify(posts)
    );

  } catch (error) {

    console.log(
      'Erro ao salvar posts:',
      error
    );
  }
}


// CRIAR POST
export async function createPost(postData) {

  try {

    const posts = await getPosts();

    const newPost = {
      id: Date.now(),

      createdAt: new Date(),

      promoted: false,

      ...postData,
    };

    const updatedPosts = [
      newPost,
      ...posts,
    ];

    await savePosts(updatedPosts);

    return newPost;

  } catch (error) {

    console.log(
      'Erro ao criar post:',
      error
    );

    return null;
  }
}


// PEGAR POST POR ID
export async function getPostById(postId) {

  try {

    const posts = await getPosts();

    const post = posts.find(
      (item) => item.id === postId
    );

    return post || null;

  } catch (error) {

    console.log(
      'Erro ao buscar post:',
      error
    );

    return null;
  }
}


// ATUALIZAR POST
export async function updatePost(
  postId,
  newData
) {

  try {

    const posts = await getPosts();

    const updatedPosts = posts.map(
      (post) => {

        if (post.id === postId) {

          return {
            ...post,
            ...newData,
          };
        }

        return post;
      }
    );

    await savePosts(updatedPosts);

  } catch (error) {

    console.log(
      'Erro ao atualizar post:',
      error
    );
  }
}


// REMOVER POST
export async function deletePost(postId) {

  try {

    const posts = await getPosts();

    const filteredPosts =
      posts.filter(
        (post) => post.id !== postId
      );

    await savePosts(filteredPosts);

  } catch (error) {

    console.log(
      'Erro ao remover post:',
      error
    );
  }
}


// PROMOVER POST
export async function promotePost(postId) {

  try {

    const posts = await getPosts();

    const updatedPosts = posts.map(
      (post) => {

        if (post.id === postId) {

          return {
            ...post,
            promoted: true,
          };
        }

        return post;
      }
    );

    await savePosts(updatedPosts);

  } catch (error) {

    console.log(
      'Erro ao promover post:',
      error
    );
  }
}


// LIMPAR POSTS
export async function clearPosts() {

  try {

    await AsyncStorage.removeItem(
      POSTS_KEY
    );

  } catch (error) {

    console.log(
      'Erro ao limpar posts:',
      error
    );
  }
}