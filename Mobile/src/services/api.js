import axios from 'axios';


// ALTERE PARA O IP DO SEU BACKEND
const api = axios.create({

  baseURL: 'http://10.0.2.2:3333',

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;