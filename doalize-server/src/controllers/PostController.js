import Post from '../models/Post.js';

import User from '../models/User.js';


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
            ['created_at', 'DESC'],
          ],
        });


      return res.status(200).json(
        posts
      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao buscar posts',
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


      // VALIDAÇÃO
      if (
        !description ||
        !images ||
        images.length === 0
      ) {

        return res.status(400).json({
          message:
            'Preencha todos os campos',
        });
      }


      // CRIAR POST
      const post = await Post.create({

        user_id: userId,

        description,

        images:
          JSON.stringify(images),
      });


      return res.status(201).json({

        message:
          'Post criado com sucesso',

        post,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao criar post',
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
          message:
            'Post não encontrado',
        });
      }


      return res.status(200).json(
        post
      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao buscar post',
      });
    }
  }


  // PROMOVER
  async promote(req, res) {

    try {

      const userId = req.userId;

      const { id } = req.params;


      const post =
        await Post.findByPk(id);

      if (!post) {

        return res.status(404).json({
          message:
            'Post não encontrado',
        });
      }


      // VERIFICA DONO
      if (
        post.user_id !== userId
      ) {

        return res.status(403).json({
          message:
            'Sem permissão',
        });
      }


      await post.update({
        promoted: true,
      });


      return res.status(200).json({
        message:
          'Post promovido',
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao promover post',
      });
    }
  }


  // DELETE
  async delete(req, res) {

    try {

      const userId = req.userId;

      const { id } = req.params;


      const post =
        await Post.findByPk(id);

      if (!post) {

        return res.status(404).json({
          message:
            'Post não encontrado',
        });
      }


      // DONO
      if (
        post.user_id !== userId
      ) {

        return res.status(403).json({
          message:
            'Sem permissão',
        });
      }


      await post.destroy();


      return res.status(200).json({
        message:
          'Post removido',
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao remover post',
      });
    }
  }

}


export default new PostController();