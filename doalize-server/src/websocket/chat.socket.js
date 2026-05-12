    import Message from '../models/Message.js';


export default function chatSocket(
  io,
  socket
) {

  console.log(
    `Socket conectado: ${socket.id}`
  );


  // ENTRAR NA SALA
  socket.on(
    'join_room',
    (userId) => {

      socket.join(String(userId));

      console.log(
        `Usuário ${userId} entrou na sala`
      );
    }
  );


  // ENVIAR MENSAGEM
  socket.on(
    'send_message',
    async (data) => {

      try {

        const {
          sender_id,
          receiver_id,
          message,
          image,
          audio,
        } = data;


        // SALVA NO BANCO
        const newMessage =
          await Message.create({

            sender_id,

            receiver_id,

            message,

            image,

            audio,
          });


        // ENVIA PARA DESTINO
        io.to(
          String(receiver_id)
        ).emit(
          'receive_message',
          newMessage
        );


        // ENVIA PARA REMETENTE
        io.to(
          String(sender_id)
        ).emit(
          'message_sent',
          newMessage
        );

      } catch (error) {

        console.log(
          'Erro socket mensagem:',
          error
        );
      }
    }
  );


  // DIGITANDO
  socket.on(
    'typing',
    (data) => {

      io.to(
        String(data.receiver_id)
      ).emit('typing', {

        sender_id:
          data.sender_id,
      });
    }
  );


  // PAROU DE DIGITAR
  socket.on(
    'stop_typing',
    (data) => {

      io.to(
        String(data.receiver_id)
      ).emit(
        'stop_typing',
        {
          sender_id:
            data.sender_id,
        }
      );
    }
  );


  // DESCONECTADO
  socket.on(
    'disconnect',
    () => {

      console.log(
        `Socket desconectado: ${socket.id}`
      );
    }
  );
}