/**
 * agendamentosService.js - Chamadas HTTP relacionadas a Agendamentos.
 *
 * Funções:
 *   - criarAgendamento(dados): cria um novo agendamento (requer JWT).
 *
 * IMPORTANTE: O cliente precisa estar logado para usar esta função.
 * O token JWT é injetado automaticamente pelo interceptor do Axios.
 */
import api from "./api";

/**
 * Cria um novo agendamento na API.
 * Requer autenticação JWT (token é enviado automaticamente pelo interceptor).
 *
 * @param {Object} dados - { barbeiro_id, servico_id, data_hora }
 *   data_hora deve estar no formato ISO: "2026-04-15T14:00:00"
 * @returns {Promise<Object>} { mensagem, agendamento }
 */
export async function criarAgendamento(dados) {
  const resposta = await api.post("/agendamentos/cadastrar", dados);
  return resposta.data;
}
