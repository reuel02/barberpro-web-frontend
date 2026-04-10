/**
 * authService.js - Chamadas HTTP relacionadas a Autenticação.
 *
 * Funções:
 *   - loginCliente(email, senha): autentica o cliente e retorna o JWT token.
 *
 * O token é salvo no localStorage para uso automático pelo interceptor do Axios.
 */
import api from "./api";

/**
 * Realiza o login do cliente e salva o token no localStorage.
 *
 * @param {string} email - Email do cliente
 * @param {string} senha - Senha do cliente
 * @returns {Promise<Object>} { mensagem, token }
 */
export async function loginCliente(email, senha) {
  const resposta = await api.post("/auth/login", { email, senha });

  // Salva o token no navegador para uso futuro em requisições autenticadas
  localStorage.setItem("token", resposta.data.token);

  return resposta.data;
}

/**
 * Remove o token do localStorage (faz logout).
 */
export function logoutCliente() {
  localStorage.removeItem("token");
}

/**
 * Verifica se existe um token salvo (cliente logado).
 *
 * @returns {boolean}
 */
export function estaLogado() {
  return !!localStorage.getItem("token");
}
