/**
 * FormCheckout - Seção final de confirmação do agendamento.
 * Exibe um resumo completo do que o cliente escolheu (serviço, profissional,
 * data, horário e valor) e um formulário para coletar nome e WhatsApp.
 *
 * Props:
 *   - servicoSelecionado: objeto do serviço escolhido
 *   - profissionalSelecionado: objeto do profissional escolhido
 *   - dataSelecionada: objeto do dia escolhido { dataCompleta, ... }
 *   - horarioSelecionado: string do horário escolhido
 *   - formData: objeto { nome, whatsapp } com os dados do formulário
 *   - onFormChange: função para atualizar os campos do formulário
 *   - onConfirmar: função chamada ao submeter o formulário
 *   - habilitado: boolean que controla se a seção está acessível
 */
export default function FormCheckout({
  servicoSelecionado,
  profissionalSelecionado,
  dataSelecionada,
  horarioSelecionado,
  formData,
  onFormChange,
  onConfirmar,
  habilitado,
}) {
  // Verifica se todos os dados do resumo estão disponíveis
  const temResumoCompleto =
    servicoSelecionado && profissionalSelecionado && horarioSelecionado && dataSelecionada;

  return (
    <section
      className={`max-w-2xl mx-auto px-6 py-12 pb-20 transition-opacity duration-500 ${
        habilitado ? "opacity-100" : "opacity-30 pointer-events-none"
      }`}
    >
      {/* Divisor visual entre seções */}
      <div className="border-t border-zinc-800 mb-12" />

      <h2 className="text-2xl font-bold text-white mb-1">Confirmar Agendamento</h2>
      <p className="text-zinc-500 text-sm mb-8">Preencha seus dados para finalizar</p>

      {/* Card de Resumo — mostra todos os itens selecionados */}
      {temResumoCompleto && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Resumo do Agendamento
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Serviço</span>
              <span className="text-zinc-100 font-medium">{servicoSelecionado.nome}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Profissional</span>
              <span className="text-zinc-100 font-medium">{profissionalSelecionado.nome}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Data</span>
              <span className="text-zinc-100 font-medium">{dataSelecionada.dataCompleta}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Horário</span>
              <span className="text-zinc-100 font-medium">{horarioSelecionado}</span>
            </div>

            {/* Linha do total com destaque amber */}
            <div className="border-t border-zinc-800 pt-3 flex justify-between items-center">
              <span className="text-zinc-400 text-sm font-semibold">Total</span>
              <span className="text-amber-500 font-bold text-lg">
                R$ {Number(servicoSelecionado.preco).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de dados do cliente */}
      <form onSubmit={onConfirmar} className="space-y-4">
        {/* Campo Nome */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Seu Nome
          </label>
          <input
            type="text"
            placeholder="Como podemos te chamar?"
            value={formData.nome}
            onChange={(e) => onFormChange({ ...formData, nome: e.target.value })}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            required
          />
        </div>

        {/* Campo WhatsApp — usado para confirmação e contato */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            WhatsApp
          </label>
          <input
            type="tel"
            placeholder="(11) 99999-9999"
            value={formData.whatsapp}
            onChange={(e) => onFormChange({ ...formData, whatsapp: e.target.value })}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            required
          />
        </div>

        {/* Botão de confirmação */}
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 mt-4 text-lg"
        >
          Confirmar Agendamento
        </button>

        <p className="text-zinc-600 text-xs text-center mt-3">
          Você receberá uma confirmação pelo WhatsApp
        </p>
      </form>
    </section>
  );
}
