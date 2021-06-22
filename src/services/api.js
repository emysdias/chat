import axios from 'axios';

const api = axios.create({
  baseURL: 'https://60c9584d772a760017203569.mockapi.io/api',
});

export default api;