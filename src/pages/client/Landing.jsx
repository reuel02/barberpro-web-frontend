/**
 * Landing - Página pública de agendamento para os clientes.
 *
 * Esta página é a "vitrine" da barbearia, acessada via link na bio do Instagram.
 * Ela orquestra o fluxo de agendamento em 5 etapas progressivas:
 *   1. Hero (CTA inicial)
 *   2. Catálogo de Serviços (dados vindos da API)
 *   3. Seleção de Profissional (dados vindos da API)
 *   4. Calendário + Horários
 *   5. Checkout com formulário (requer autenticação)
 *
 * Integração com a API Flask:
 *   - Serviços: GET /api/servicos/listar/<empresa_id> (pública)
 *   - Barbeiros: GET /api/usuarios/listar/FUNCIONARIO (pública)
 *   - Agendamento: POST /api/agendamentos/cadastrar (requer JWT)
 */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../components/landing/HeroSection";
import CatalogoServicos from "../../components/landing/CatalogoServicos";
import SeletorProfissional from "../../components/landing/SeletorProfissional";
import CalendarioHorarios from "../../components/landing/CalendarioHorarios";
import FormCheckout from "../../components/landing/FormCheckout";
import { buscarServicos } from "../../services/servicosService";
import { buscarBarbeiros } from "../../services/usuariosService";
import { criarAgendamento } from "../../services/agendamentosService";
import { estaLogado } from "../../services/authService";

// TODO: Substituir pelo ID real da sua empresa (buscar no banco de dados)
const EMPRESA_ID = "a8112c44-f6f1-4195-8e9b-e273620702af";

export default function Landing() {
  const navigate = useNavigate();

  // =============================================
  // ESTADOS — dados da API
  // =============================================
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // =============================================
  // ESTADOS — seleções do cliente
  // =============================================
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [formData, setFormData] = useState({ nome: "", whatsapp: "" });

  // =============================================
  // REFS — referências para scroll suave entre seções
  // =============================================
  const servicosRef = useRef(null);
  const profissionaisRef = useRef(null);
  const calendarioRef = useRef(null);
  const checkoutRef = useRef(null);

  /** Rola suavemente até uma seção da página */
  function scrollParaSecao(ref) {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  // =============================================
  // EFEITO — buscar dados da API ao montar a página
  // =============================================
  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);

        // Busca serviços e barbeiros em paralelo para ser mais rápido
        const [servicosAPI, barbeirosAPI] = await Promise.all([
          buscarServicos(EMPRESA_ID),
          buscarBarbeiros(EMPRESA_ID),
        ]);

        setServicos(servicosAPI);

        // Mapeia os barbeiros para incluir as iniciais do nome (para o avatar)
        const barbeirosFormatados = barbeirosAPI.map((barbeiro) => ({
          ...barbeiro,
          iniciais: barbeiro.nome
            .split(" ")
            .map((palavra) => palavra[0])
            .join("")
            .toUpperCase()
            .slice(0, 2),
          especialidade: "Barbeiro", // TODO: Adicioanr campo de especialidade no backend
        }));

        setProfissionais(barbeirosFormatados);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErro("Não foi possível carregar os dados. Verifique se a API está rodando.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  // =============================================
  // DADOS DERIVADOS
  // =============================================

  // Gera os próximos 7 dias a partir de hoje para o seletor de data
  const diasDisponiveis = Array.from({ length: 7 }, (_, i) => {
    const data = new Date();
    data.setDate(data.getDate() + i);
    return {
      data: data,
      diaSemana: data.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
      diaNumero: data.getDate(),
      dataCompleta: data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
    };
  });

  // Horários que já estão ocupados (TODO: buscar da API futuramente)
  const horariosOcupados = [];

  // =============================================
  // HANDLERS — funções de interação do usuário
  // =============================================

  /** Seleciona um serviço e avança para a seção de profissionais */
  function selecionarServico(servico) {
    setServicoSelecionado(servico);
    scrollParaSecao(profissionaisRef);
  }

  /** Seleciona um profissional e avança para o calendário */
  function selecionarProfissional(profissional) {
    setProfissionalSelecionado(profissional);
    scrollParaSecao(calendarioRef);
  }

  /** Seleciona um horário e avança para o checkout */
  function selecionarHorario(horario) {
    setHorarioSelecionado(horario);
    scrollParaSecao(checkoutRef);
  }

  /**
   * Confirma o agendamento:
   * 1. Verifica se o cliente está logado
   * 2. Se não estiver, salva as seleções no localStorage e redireciona para auth
   * 3. Se estiver, envia o agendamento para a API
   */
  async function handleConfirmar(e) {
    e.preventDefault();

    // Verifica se o cliente está autenticado
    if (!estaLogado()) {
      // Salva as seleções no localStorage para recuperar após o login
      localStorage.setItem(
        "agendamentoPendente",
        JSON.stringify({
          servicoId: servicoSelecionado.id,
          barbeiro_id: profissionalSelecionado.id,
          data: dataSelecionada,
          horario: horarioSelecionado,
        })
      );

      // Redireciona para a página de autenticação do cliente
      navigate("/auth");
      return;
    }

    // Cliente está logado — cria o agendamento
    try {
      // Monta a data_hora no formato ISO (ex: "2026-04-15T14:00:00")
      const ano = dataSelecionada.data.getFullYear();
      const mes = String(dataSelecionada.data.getMonth() + 1).padStart(2, "0");
      const dia = String(dataSelecionada.data.getDate()).padStart(2, "0");
      const dataHoraISO = `${ano}-${mes}-${dia}T${horarioSelecionado}:00`;

      await criarAgendamento({
        barbeiro_id: profissionalSelecionado.id,
        servico_id: servicoSelecionado.id,
        data_hora: dataHoraISO,
      });

      // Limpa agendamento pendente se existir
      localStorage.removeItem("agendamentoPendente");

      // Redireciona para tela de sucesso
      navigate("/sucesso");
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem || "Erro ao criar agendamento.";
      alert(mensagem);
    }
  }

  // =============================================
  // RENDER
  // =============================================

  // Tela de carregamento enquanto busca dados da API
  if (carregando) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Tela de erro se a API não respondeu
  if (erro) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md text-center">
          <p className="text-red-400 text-lg font-medium mb-2">⚠️ Erro</p>
          <p className="text-zinc-400 text-sm">{erro}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* 1. Hero — Cartão de visitas com CTA */}
      <HeroSection onAgendarClick={() => scrollParaSecao(servicosRef)} />

      {/* Divisor decorativo */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-zinc-800" />
      </div>

      {/* 2. Catálogo de Serviços (dados da API) */}
      <div ref={servicosRef}>
        <CatalogoServicos
          servicos={servicos}
          servicoSelecionado={servicoSelecionado}
          onSelecionar={selecionarServico}
        />
      </div>

      {/* 3. Seleção de Profissional (dados da API) */}
      <div ref={profissionaisRef}>
        <SeletorProfissional
          profissionais={profissionais}
          profissionalSelecionado={profissionalSelecionado}
          onSelecionar={selecionarProfissional}
          habilitado={!!servicoSelecionado}
        />
      </div>

      {/* 4. Calendário + Horários */}
      <div ref={calendarioRef}>
        <CalendarioHorarios
          diasDisponiveis={diasDisponiveis}
          dataSelecionada={dataSelecionada}
          onSelecionarData={setDataSelecionada}
          horarioSelecionado={horarioSelecionado}
          onSelecionarHorario={selecionarHorario}
          horariosOcupados={horariosOcupados}
          habilitado={!!profissionalSelecionado}
        />
      </div>

      {/* 5. Checkout — Resumo + Formulário (requer auth para confirmar) */}
      <div ref={checkoutRef}>
        <FormCheckout
          servicoSelecionado={servicoSelecionado}
          profissionalSelecionado={profissionalSelecionado}
          dataSelecionada={dataSelecionada}
          horarioSelecionado={horarioSelecionado}
          formData={formData}
          onFormChange={setFormData}
          onConfirmar={handleConfirmar}
          habilitado={!!horarioSelecionado}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center">
        <p className="text-zinc-600 text-sm">
          BARBER<span className="text-amber-500/60">PRO</span> · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}