import axios from 'axios';


// ALTERE PARA O IP DO SEU BACKEND
const api = axios.create({

  baseURL: 'http://192.168.0.10:3333',

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;