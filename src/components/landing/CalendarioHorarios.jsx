/**
 * CalendarioHorarios - Seção de seleção de data e horário.
 * Exibe os próximos 7 dias como um seletor horizontal e, ao clicar em um dia,
 * mostra os horários disponíveis divididos em Manhã, Tarde e Noite.
 * Horários ocupados ficam desabilitados e riscados.
 *
 * Props:
 *   - diasDisponiveis: array de objetos { data, diaSemana, diaNumero, dataCompleta }
 *   - dataSelecionada: objeto do dia selecionado (ou null)
 *   - onSelecionarData: função chamada ao clicar em um dia
 *   - horarioSelecionado: string do horário selecionado (ou null)
 *   - onSelecionarHorario: função chamada ao clicar em um horário
 *   - horariosOcupados: array de strings com horários indisponíveis
 *   - habilitado: boolean que controla se a seção está acessível
 */
export default function CalendarioHorarios({
  diasDisponiveis,
  dataSelecionada,
  onSelecionarData,
  horarioSelecionado,
  onSelecionarHorario,
  horariosOcupados,
  habilitado,
}) {
  // Horários fixos divididos por período do dia
  const horariosManha = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
  const horariosTarde = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
  const horariosNoite = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];

  /**
   * Renderiza um grid de botões de horário para um período do dia.
   * Cada botão pode estar: disponível, selecionado ou ocupado (desabilitado).
   */
  function renderizarGradeHorarios(horarios) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {horarios.map((horario) => {
          const ocupado = horariosOcupados.includes(horario);
          const selecionado = horarioSelecionado === horario;

          return (
            <button
              key={horario}
              onClick={() => !ocupado && onSelecionarHorario(horario)}
              disabled={ocupado}
              className={`py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                ocupado
                  ? "bg-zinc-900/50 border-zinc-800/50 text-zinc-700 cursor-not-allowed line-through"
                  : selecionado
                  ? "bg-amber-500/10 border-amber-500/50 text-amber-500 ring-1 ring-amber-500/30"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              {horario}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section
      className={`max-w-2xl mx-auto px-6 py-12 transition-opacity duration-500 ${
        habilitado ? "opacity-100" : "opacity-30 pointer-events-none"
      }`}
    >
      {/* Divisor visual entre seções */}
      <div className="border-t border-zinc-800 mb-12" />

      <h2 className="text-2xl font-bold text-white mb-1">Escolha Data e Horário</h2>
      <p className="text-zinc-500 text-sm mb-8">Selecione o melhor dia e horário para você</p>

      {/* Seletor de Data — próximos 7 dias */}
      <div className="grid grid-cols-7 gap-2 mb-10">
        {diasDisponiveis.map((dia, index) => {
          const estaSelecionado = dataSelecionada?.diaNumero === dia.diaNumero;

          return (
            <button
              key={index}
              onClick={() => onSelecionarData(dia)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border transition-all duration-200 ${
                estaSelecionado
                  ? "bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/30"
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <span className="text-zinc-500 text-xs uppercase">{dia.diaSemana}</span>
              <span
                className={`text-lg font-bold ${
                  estaSelecionado ? "text-amber-500" : "text-zinc-200"
                }`}
              >
                {dia.diaNumero}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grade de Horários — só aparece quando uma data é selecionada */}
      {dataSelecionada && (
        <div className="space-y-6">
          {/* Manhã */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              ☀️ Manhã
            </h3>
            {renderizarGradeHorarios(horariosManha)}
          </div>

          {/* Tarde */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              🌤️ Tarde
            </h3>
            {renderizarGradeHorarios(horariosTarde)}
          </div>

          {/* Noite */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              🌙 Noite
            </h3>
            {renderizarGradeHorarios(horariosNoite)}
          </div>
        </div>
      )}
    </section>
  );
}
