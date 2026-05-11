import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

import socket from '../services/socket';


// CONTEXT
export const SocketContext = createContext({});


// PROVIDER
export function SocketProvider({ children }) {

  const [connected, setConnected] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState([]);


  // CONECTAR SOCKET
  useEffect(() => {

    socket.connect();


    // CONECTADO
    socket.on('connect', () => {

      console.log('Socket conectado');

      setConnected(true);

    });


    // DESCONECTADO
    socket.on('disconnect', () => {

      console.log('Socket desconectado');

      setConnected(false);

    });


    // USUÁRIOS ONLINE
    socket.on('online_users', (users) => {

      setOnlineUsers(users);

    });


    // CLEANUP
    return () => {

      socket.off('connect');

      socket.off('disconnect');

      socket.off('online_users');

      socket.disconnect();

    };

  }, []);


  // ENTRAR EM ROOM
  function joinRoom(chatId) {

    socket.emit('join_room', chatId);

  }


  // SAIR DA ROOM
  function leaveRoom(chatId) {

    socket.emit('leave_room', chatId);

  }


  // ENVIAR MENSAGEM
  function sendMessage(data) {

    socket.emit('send_message', data);

  }


  // USUÁRIO ONLINE
  function setUserOnline(userId) {

    socket.emit('user_online', userId);

  }


  // DIGITANDO
  function typing(chatId) {

    socket.emit('typing', chatId);

  }


  // PAROU DE DIGITAR
  function stopTyping(chatId) {

    socket.emit('stop_typing', chatId);

  }


  return (
    <SocketContext.Provider
      value={{
        socket,

        connected,

        onlineUsers,

        joinRoom,
        leaveRoom,

        sendMessage,

        setUserOnline,

        typing,
        stopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}