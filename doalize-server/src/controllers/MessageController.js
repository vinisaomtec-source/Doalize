import Message from '../models/Message.js';

import User from '../models/User.js';

import { Op } from 'sequelize';


class MessageController {

  // BUSCAR MENSAGENS
  async getMessages(req, res) {

    try {

      const userId = req.userId;

      const { userId: otherUserId } =
        req.params;


      const messages =
        await Message.findAll({

          where: {

            [Op.or]: [

              {
                sender_id: userId,

                receiver_id:
                  otherUserId,
              },

              {
                sender_id:
                  otherUserId,

                receiver_id: userId,
              },
            ],
          },

          order: [
            ['created_at', 'ASC'],
          ],
        });


      return res.status(200).json(
        messages
      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao buscar mensagens',
      });
    }
  }


  // ENVIAR MENSAGEM
  async sendMessage(req, res) {

    try {

      const senderId = req.userId;

      const {
        receiver_id,
        message,
        image,
        audio,
      } = req.body;


      // VALIDAÇÃO
      if (
        !receiver_id ||
        (!message &&
          !image &&
          !audio)
      ) {

        return res.status(400).json({
          message:
            'Mensagem inválida',
        });
      }


      // VERIFICA DESTINATÁRIO
      const receiver =
        await User.findByPk(
          receiver_id
        );

      if (!receiver) {

        return res.status(404).json({
          message:
            'Usuário não encontrado',
        });
      }


      // CRIA MENSAGEM
      const newMessage =
        await Message.create({

          sender_id: senderId,

          receiver_id,

          message,

          image,

          audio,
        });


      return res.status(201).json({

        message:
          'Mensagem enviada',

        data: newMessage,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao enviar mensagem',
      });
    }
  }


  // DELETAR MENSAGEM
  async deleteMessage(req, res) {

    try {

      const userId = req.userId;

      const { id } = req.params;


      const message =
        await Message.findByPk(id);

      if (!message) {

        return res.status(404).json({
          message:
            'Mensagem não encontrada',
        });
      }


      // SOMENTE O REMETENTE
      if (
        message.sender_id !== userId
      ) {

        return res.status(403).json({
          message:
            'Sem permissão',
        });
      }


      await message.destroy();


      return res.status(200).json({
        message:
          'Mensagem removida',
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao remover mensagem',
      });
    }
  }

}


export default new MessageController();