import { useNavigate } from "react-router-dom";

export default function Sucesso() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">

        {/* Ícone de Sucesso */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-5xl">✓</span>
          </div>
        </div>

        {/* Mensagem Principal */}
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Agendamento Confirmado!
        </h1>
        <p className="text-zinc-400 mb-10">
          Tudo certo! Você receberá uma confirmação pelo WhatsApp em instantes.
        </p>

        {/* Card com Resumo */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-10 text-left">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 text-center">
            Detalhes do Agendamento
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Serviço</span>
              <span className="text-zinc-100 font-medium">Corte Degradê</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Profissional</span>
              <span className="text-zinc-100 font-medium">Reuel</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Data</span>
              <span className="text-zinc-100 font-medium">15/04</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Horário</span>
              <span className="text-zinc-100 font-medium">14:00</span>
            </div>
            <div className="border-t border-zinc-800 pt-3 flex justify-between items-center">
              <span className="text-zinc-400 text-sm font-semibold">Total</span>
              <span className="text-amber-500 font-bold text-lg">R$ 50.00</span>
            </div>
          </div>
        </div>

        {/* Aviso */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 mb-8">
          <p className="text-amber-500/80 text-sm">
            ⚠️ Caso precise cancelar ou remarcar, entre em contato pelo WhatsApp da barbearia com pelo menos <strong>2 horas de antecedência</strong>.
          </p>
        </div>

        {/* Botão Voltar */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium py-3 px-4 rounded-lg transition-colors border border-zinc-700"
        >
          ← Voltar para o Início
        </button>

        {/* Footer */}
        <p className="text-zinc-700 text-xs mt-8">
          BARBER<span className="text-amber-500/40">PRO</span> · Obrigado pela preferência
        </p>
      </div>
    </div>
  );
}