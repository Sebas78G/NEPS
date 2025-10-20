import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5432/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
    id: string;
    username: string;
    role: 'admin' | 'advisor';
    full_name: string;
}

export interface MatrizRecord {
    id: string;
    data: any;
    assigned_asesor_id: string;
    status: 'completed' | 'in_progress' | 'pending';
    validacion_duplicados: string;
}

export default api;
