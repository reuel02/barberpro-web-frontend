
export default function Scoreboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardMetrica nome="Faturamento Hoje" variavel={metricas.faturamentoEstimado + " R$"} />
            <CardMetrica nome="Total de Agendamentos" variavel={metricas.totalAgendamentos} />
            <CardMetrica nome="Clientes Atendidos" variavel={metricas.clientesAtendidos} />
            <CardMetrica nome="Horários Vagos" variavel={metricas.horariosVagos} />
        </div>
    )
}