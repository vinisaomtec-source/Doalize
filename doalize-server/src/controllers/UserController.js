import bcrypt from 'bcryptjs';

import User from '../models/User.js';


class UserController {

  // PERFIL
  async profile(req, res) {

    try {

      const userId = req.userId;


      const user =
        await User.findByPk(userId, {

          attributes: {
            exclude: ['password'],
          },
        });


      if (!user) {

        return res.status(404).json({
          message:
            'Usuário não encontrado',
        });
      }


      return res.status(200).json(
        user
      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao buscar perfil',
      });
    }
  }


  // ATUALIZAR
  async update(req, res) {

    try {

      const userId = req.userId;

      const {
        name,
        email,
        password,
        photo,
        description,
        location,
      } = req.body;


      const user =
        await User.findByPk(userId);

      if (!user) {

        return res.status(404).json({
          message:
            'Usuário não encontrado',
        });
      }


      // VERIFICA EMAIL
      if (
        email &&
        email !== user.email
      ) {

        const emailExists =
          await User.findOne({
            where: { email },
          });

        if (emailExists) {

          return res.status(400).json({
            message:
              'E-mail já está em uso',
          });
        }
      }


      // HASH NOVA SENHA
      let hashedPassword =
        user.password;

      if (password) {

        hashedPassword =
          await bcrypt.hash(
            password,
            10
          );
      }


      // UPDATE
      await user.update({

        name:
          name || user.name,

        email:
          email || user.email,

        password:
          hashedPassword,

        photo:
          photo || user.photo,

        description:
          description ||
          user.description,

        location:
          location ||
          user.location,
      });


      return res.status(200).json({

        message:
          'Perfil atualizado',

        user: {
          id: user.id,

          name: user.name,

          email: user.email,

          photo: user.photo,

          description:
            user.description,

          location:
            user.location,
        },
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao atualizar perfil',
      });
    }
  }


  // EXCLUIR CONTA
  async delete(req, res) {

    try {

      const userId = req.userId;


      const user =
        await User.findByPk(userId);

      if (!user) {

        return res.status(404).json({
          message:
            'Usuário não encontrado',
        });
      }


      await user.destroy();


      return res.status(200).json({
        message:
          'Conta removida com sucesso',
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao excluir conta',
      });
    }
  }

}


export default new UserController();