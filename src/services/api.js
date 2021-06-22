import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rqlml.sse.codesandbox.io',
});

export default api;