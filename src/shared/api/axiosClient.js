import axios from 'axios';
import { store } from '../../app/store'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // will change per environment later
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  const lang = store.getState().language.current;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Accept-Language'] = lang;

  return config;
});

export default api;