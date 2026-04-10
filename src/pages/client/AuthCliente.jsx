/**
 * AuthCliente - Página de Login/Cadastro para o CLIENTE (público).
 *
 * O cliente chega aqui quando tenta confirmar um agendamento sem estar logado.
 * Os dados do agendamento ficam salvos no localStorage para serem recuperados
 * após o login, redirecionando de volta à Landing para concluir.
 *
 * Fluxo:
 *   1. Cliente preenche o formulário de Cadastro ou Login
 *   2. Ao se autenticar, o token JWT é salvo no localStorage
 *   3. É redirecionado de volta para a Landing para finalizar o agendamento
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCliente } from "../../services/authService";
import { cadastrarCliente } from "../../services/usuariosService";

// TODO: Substituir pelo ID real da sua empresa (buscar no banco de dados)
const EMPRESA_ID = "a8112c44-f6f1-4195-8e9b-e273620702af";

export default function AuthCliente() {
  const navigate = useNavigate();

  // Controla se o formulário exibe Login ou Cadastro
  const [modoLogin, setModoLogin] = useState(true);

  // Estado dos campos do formulário
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
  });

  // Estado para mensagens de erro/loading
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  /**
   * Lida com o envio do formulário.
   * Se for Login: autentica e redireciona.
   * Se for Cadastro: cadastra, faz login automático e redireciona.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      if (modoLogin) {
        // === MODO LOGIN ===
        await loginCliente(form.email, form.senha);
      } else {
        // === MODO CADASTRO ===
        // 1. Cadastra o cliente na API
        await cadastrarCliente(EMPRESA_ID, {
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          telefone: form.telefone,
        });

        // 2. Faz login automático para obter o token
        await loginCliente(form.email, form.senha);
      }

      // Redireciona de volta para a Landing para concluir o agendamento
      navigate("/");
    } catch (error) {
      // Exibe a mensagem de erro retornada pela API
      const mensagem =
        error.response?.data?.mensagem || "Erro inesperado. Tente novamente.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-xl shadow-sm w-full max-w-md border border-zinc-800">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wider">
            BARBER<span className="text-amber-500">PRO</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            {modoLogin
              ? "Entre para confirmar seu agendamento"
              : "Crie sua conta para agendar"}
          </p>
        </div>

        {/* Mensagem de erro */}
        {erro && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-6">
            {erro}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nome (só aparece no Cadastro) */}
          {!modoLogin && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                required
              />
            </div>
          )}

          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              required
            />
          </div>

          {/* Campo Senha */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              required
            />
          </div>

          {/* Campo Telefone (só aparece no Cadastro) */}
          {!modoLogin && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>
          )}

          {/* Botão de ação */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-zinc-950 font-bold py-3 px-4 rounded-lg transition-colors duration-200 mt-4"
          >
            {carregando
              ? "Aguarde..."
              : modoLogin
              ? "Entrar"
              : "Criar Conta"}
          </button>
        </form>

        {/* Alternar entre Login e Cadastro */}
        <div className="mt-6 text-center text-sm text-zinc-500">
          {modoLogin ? "Não tem conta? " : "Já tem conta? "}
          <button
            onClick={() => {
              setModoLogin(!modoLogin);
              setErro("");
            }}
            className="text-amber-500 hover:underline font-medium"
          >
            {modoLogin ? "Criar conta" : "Fazer login"}
          </button>
        </div>

        {/* Voltar */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
          >
            ← Voltar para o início
          </button>
        </div>
      </div>
    </div>
  );
}
