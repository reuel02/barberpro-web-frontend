/**
 * usuariosService.js - Chamadas HTTP relacionadas a Usuários.
 *
 * Funções:
 *   - buscarBarbeiros(): lista todos os funcionários (barbeiros).
 *   - cadastrarCliente(empresaId, dados): cadastra um novo cliente.
 */
import api from "./api";

/**
 * Busca a lista de barbeiros (funcionários) de uma empresa específica.
 * Rota pública — não precisa de autenticação.
 *
 * @param {string} empresaId - UUID da empresa
 * @returns {Promise<Array>} Lista de usuários { id, nome, email, telefone, role }
 */
export async function buscarBarbeiros(empresaId) {
  const resposta = await api.get(`/usuarios/listar/barbeiros/${empresaId}`);
  return resposta.data;
}

/**
 * Cadastra um novo cliente na barbearia.
 * Rota pública — o cliente se cadastra sem estar logado.
 *
 * @param {string} empresaId - UUID da empresa
 * @param {Object} dados - { nome, email, senha, telefone }
 * @returns {Promise<Object>} { mensagem: "Usuario cadastrado com sucesso." }
 */
export async function cadastrarCliente(empresaId, dados) {
  const resposta = await api.post(`/usuarios/cadastrar/cliente/${empresaId}`, dados);
  return resposta.data;
}
