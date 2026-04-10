/**
 * servicosService.js - Chamadas HTTP relacionadas a Serviços.
 *
 * Funções:
 *   - buscarServicos(empresaId): busca todos os serviços ativos de uma empresa.
 */
import api from "./api";

/**
 * Busca a lista de serviços de uma empresa específica.
 * Rota pública — não precisa de autenticação.
 *
 * @param {string} empresaId - UUID da empresa
 * @returns {Promise<Array>} Lista de serviços { id, nome, preco, duracao, ativo }
 */
export async function buscarServicos(empresaId) {
  const resposta = await api.get(`/servicos/listar/${empresaId}`);
  return resposta.data;
}
