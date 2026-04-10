export default function CardAgendamento({ agendamento, marcarComoConcluido }) {

    const coresStatus = {
        concluido: "text-emerald-400 bg-emerald-400/10",
        em_atendimento: "text-blue-400 bg-blue-400/10",
        pendente: "text-amber-500 bg-amber-500/10",
        cancelado: "text-red-500 bg-red-500/10"
    }

    return (
        <div key={agendamento.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex items-center justify-between">

            {/* Lado Esquerdo: Horário e Info */}
            <div className="flex items-center gap-6">
                <span className="text-xl font-bold text-zinc-300 w-16">{agendamento.horario}</span>
                <div className="flex flex-col">
                    <p className="text-zinc-100 font-medium text-lg leading-tight">{agendamento.cliente}</p>
                    <p className="text-sm text-zinc-500">{agendamento.servico}</p>
                </div>
            </div>


            {/* Lado Direito: Ações / Status */}
            <div className="flex items-center gap-3">
                <span
                    className={`px-3 py-1 rounded-full uppercase tracking-wider text-xs font-medium ${coresStatus[agendamento.status]}`}
                >
                    {agendamento.status.replace("_", " ")}
                </span>

                {agendamento.status !== "concluido" && (
                    <button
                        onClick={() => marcarComoConcluido(agendamento.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-400 transition-colors border border-zinc-700 hover:border-emerald-500"
                        title="Marcar como Concluído"
                    >✓
                    </button>
                )}
            </div>
        </div>
    )
}