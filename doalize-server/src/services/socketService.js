import { getIO } from '../config/socket.js';


// ENVIAR MENSAGEM
export function emitMessage(data) {

  try {

    const io = getIO();

    io.to(
      String(data.receiver_id)
    ).emit(
      'receive_message',
      data
    );

  } catch (error) {

    console.log(
      'Erro ao enviar socket:',
      error
    );
  }
}


// USUÁRIO DIGITANDO
export function emitTyping(data) {

  try {

    const io = getIO();

    io.to(
      String(data.receiver_id)
    ).emit('typing', {

      sender_id:
        data.sender_id,
    });

  } catch (error) {

    console.log(
      'Erro typing socket:',
      error
    );
  }
}


// PAROU DE DIGITAR
export function emitStopTyping(
  data
) {

  try {

    const io = getIO();

    io.to(
      String(data.receiver_id)
    ).emit(
      'stop_typing',
      {
        sender_id:
          data.sender_id,
      }
    );

  } catch (error) {

    console.log(
      'Erro stop typing:',
      error
    );
  }
}