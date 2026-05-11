import { Server } from 'socket.io';


// SOCKET.IO
let io;


// INICIALIZAR SOCKET
export function initializeSocket(server) {

  io = new Server(server, {

    cors: {
      origin: '*',

      methods: ['GET', 'POST'],
    },

    transports: ['websocket'],
  });


  // CONEXÃO
  io.on('connection', (socket) => {

    console.log(
      `Usuário conectado: ${socket.id}`
    );


    // ENTRAR NA SALA DO USUÁRIO
    socket.on('join', (userId) => {

      socket.join(String(userId));

      console.log(
        `Usuário ${userId} entrou na sala`
      );
    });


    // ENVIAR MENSAGEM
    socket.on('send_message', (data) => {

      const {
        receiverId,
        message,
      } = data;


      // ENVIA PARA DESTINATÁRIO
      io.to(String(receiverId)).emit(
        'receive_message',
        data
      );


      console.log(
        `Mensagem enviada para ${receiverId}`
      );
    });


    // DIGITANDO
    socket.on('typing', (data) => {

      io.to(
        String(data.receiverId)
      ).emit('typing', {
        senderId: data.senderId,
      });
    });


    // PAROU DE DIGITAR
    socket.on(
      'stop_typing',
      (data) => {

        io.to(
          String(data.receiverId)
        ).emit('stop_typing', {
          senderId: data.senderId,
        });
      }
    );


    // DESCONECTADO
    socket.on('disconnect', () => {

      console.log(
        `Usuário desconectado: ${socket.id}`
      );
    });

  });


  return io;
}


// PEGAR SOCKET
export function getIO() {

  if (!io) {

    throw new Error(
      'Socket.io não inicializado'
    );
  }

  return io;
}