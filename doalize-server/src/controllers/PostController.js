import Post from '../models/Post.js';

import User from '../models/User.js';


// GARANTE QUE images SEJA SEMPRE UM ARRAY
function parseImages(images) {

  if (Array.isArray(images)) return images;

  if (typeof images === 'string') {

    try {

      const parsed = JSON.parse(images);

      return Array.isArray(parsed) ? parsed : [];

    } catch {

      return [];
    }
  }

  return [];
}


class PostController {

  // LISTAR POSTS
  async index(req, res) {

    try {

      const posts =
        await Post.findAll({

          include: [
            {
              model: User,

              as: 'user',

              attributes: [
                'id',
                'name',
                'photo',
              ],
            },
          ],

          order: [
            ['promoted', 'DESC'],
            ['created_at', 'DESC'],
          ],
        });


      const normalizedPosts = posts.map(
        (post) => ({
          ...post.toJSON(),
          images: parseImages(post.images),
        })
      );


      return res.status(200).json(
        normalizedPosts
      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message: 'Erro ao buscar posts',
      });
    }
  }


  // CRIAR POST
  async store(req, res) {

    try {

      const userId = req.userId;

      const {
        description,
        images,
      } = req.body;


      if (!description?.trim()) {

        return res.status(400).json({
          message: 'Digite uma descrição',
        });
      }


      const post = await Post.create({

        user_id: userId,

        description,

        images:
          Array.isArray(images) && images.length > 0
            ? images
            : [],

        promoted: false,
      });


      const createdPost =
        await Post.findByPk(post.id, {

          include: [
            {
              model: User,

              as: 'user',

              attributes: [
                'id',
                'name',
                'photo',
              ],
            },
          ],
        });


      return res.status(201).json({
        ...createdPost.toJSON(),
        images: parseImages(createdPost.images),
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message: 'Erro ao criar post',
      });
    }
  }


  // DETALHES
  async show(req, res) {

    try {

      const { id } = req.params;


      const post =
        await Post.findByPk(id, {

          include: [
            {
              model: User,

              as: 'user',

              attributes: [
                'id',
                'name',
                'photo',
              ],
            },
          ],
        });


      if (!post) {

        return res.status(404).json({
          message: 'Post não encontrado',
        });
      }


      return res.status(200).json({
        ...post.toJSON(),
        images: parseImages(post.images),
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message: 'Erro ao buscar post',
      });
    }
  }


  // PROMOVER
  async promote(req, res) {

    try {

      const userId = req.userId;

      const { id } = req.params;


      const post = await Post.findByPk(id);

      if (!post) {

        return res.status(404).json({
          message: 'Post não encontrado',
        });
      }


      if (post.user_id !== userId) {

        return res.status(403).json({
          message: 'Sem permissão',
        });
      }


      await post.update({
        promoted: !post.promoted,
      });


      return res.status(200).json({

        message:
          post.promoted
            ? 'Post promovido'
            : 'Promoção removida',

        promoted: post.promoted,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message: 'Erro ao promover post',
      });
    }
  }


  // DELETE
  async delete(req, res) {

    try {

      const userId = req.userId;

      const { id } = req.params;


      const post = await Post.findByPk(id);

      if (!post) {

        return res.status(404).json({
          message: 'Post não encontrado',
        });
      }


      if (post.user_id !== userId) {

        return res.status(403).json({
          message: 'Sem permissão',
        });
      }


      await post.destroy();


      return res.status(200).json({
        message: 'Post removido',
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message: 'Erro ao remover post',
      });
    }
  }

}


export default new PostController();