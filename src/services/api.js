/**
 * api.js - Configuração central do Axios.
 *
 * Todas as chamadas HTTP do projeto passam por aqui.
 * A baseURL aponta para a API Flask rodando localmente.
 * O interceptor de request injeta o token JWT automaticamente
 * em toda requisição, caso ele exista no localStorage.
 */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor: adiciona o token JWT em toda requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
