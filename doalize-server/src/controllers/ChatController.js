import Message from '../models/Message.js';

import User from '../models/User.js';

import { Op } from 'sequelize';


class ChatController {

  // LISTAR CONVERSAS
  async getConversations(req, res) {

    try {

      const userId = req.userId;


      // BUSCA TODAS AS MENSAGENS
      const messages =
        await Message.findAll({

          where: {
            [Op.or]: [
              {
                sender_id: userId,
              },
              {
                receiver_id: userId,
              },
            ],
          },

          order: [
            ['created_at', 'DESC'],
          ],
        });


      // AGRUPAR CONVERSAS
      const conversationsMap = {};


      for (const message of messages) {

        const otherUserId =
          message.sender_id === userId
            ? message.receiver_id
            : message.sender_id;


        if (
          !conversationsMap[
            otherUserId
          ]
        ) {

          const user =
            await User.findByPk(
              otherUserId
            );

          conversationsMap[
            otherUserId
          ] = {

            id: otherUserId,

            user: {
              id: user.id,

              name: user.name,

              photo: user.photo,
            },

            lastMessage:
              message.message,

            lastMessageTime:
              message.created_at,
          };
        }
      }


      const conversations =
        Object.values(
          conversationsMap
        );


      return res.status(200).json(
        conversations
      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao buscar conversas',
      });
    }
  }


  // LISTAR MENSAGENS
  async getMessages(req, res) {

    try {

      const userId = req.userId;

      const { receiverId } =
        req.params;


      const messages =
        await Message.findAll({

          where: {

            [Op.or]: [

              {
                sender_id: userId,

                receiver_id:
                  receiverId,
              },

              {
                sender_id:
                  receiverId,

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


      // CRIA MENSAGEM
      const newMessage =
        await Message.create({

          sender_id: senderId,

          receiver_id,

          message,

          image,

          audio,
        });


      return res.status(201).json(
        newMessage
      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro ao enviar mensagem',
      });
    }
  }

}


export default new ChatController();