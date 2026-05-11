import { io } from 'socket.io-client';


// ALTERE PARA O IP DO SEU BACKEND
const SOCKET_URL =
  'http://192.168.0.10:3333';


// SOCKET
const socket = io(SOCKET_URL, {

  autoConnect: false,

  transports: ['websocket'],

  reconnection: true,

  reconnectionAttempts: 10,

  reconnectionDelay: 1000,
});


export default socket;