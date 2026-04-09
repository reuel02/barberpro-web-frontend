import CardMetrica from "../../components/CardMetrica";
import { useState } from "react";
import ModalNovoAgendamento from "../../components/ModalNovoAgendamento";
import CardAgendamento from "../../components/cardAgendamento";
import Scoreboard from "../../components/Scoreboard";

export default function Dashboard() {
    const [modalEstaAberto, setModalEstaAberto] = useState(false)
    const metricas = {
        totalAgendamentos: 8,
        faturamentoEstimado: 380.00,
        clientesAtendidos: 3,
        horariosVagos: 2
    }

    function marcarComoConcluido(id) {
        const novaLista = agendamentos.map((agendamento) => {
            if (agendamento.id == id) {
                return { ...agendamento, status: "concluido" }
            }

            return agendamento
        })
        setAgendamentos(novaLista)
    }

    const [agendamentos, setAgendamentos] = useState([
        { id: 1, cliente: "João Silva", servico: "Cabelo e Barba", horario: "13:00", valor: 70, status: "concluido" },
        { id: 2, cliente: "Lucas Almeida", servico: "Só Corte", horario: "14:00", valor: 40, status: "em_atendimento" }, // Vamos fingir que agora é 14h!
        { id: 3, cliente: "Pedro Henrique", servico: "Barba Terapia", horario: "15:30", valor: 45, status: "pendente" },
        { id: 4, cliente: "Marcos", servico: "Cabelo", horario: "17:00", valor: 40, status: "pendente" }
    ])

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* CABEÇALHO DO DASHBOARD (Título e BOTAO DE ENCAIXAR CLIENTE) */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Agenda do dia</h1>
                    <p className="text-zinc-400">Terça feira, 15 de Outubro</p>
                </div>

                {/* Botão de ENCAIXAR CLIENTE (Novo Agendamento) */}
                <button
                    className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
                    onClick={() => setModalEstaAberto(true)}
                >
                    + Encaixar Cliente
                </button>
            </div>

            {/* SCOREBOARD (Métricas Rápidas) */}
            <Scoreboard />

            {/* PROXIMOS HORARIOS - LINHA DO TEMPO (Agenda) */}
            <div className="flex flex-col gap-4 flex-1">
                <h2 className="text-lg font-semibold text-zinc-300">Próximos Horários</h2>

                <div>
                    {agendamentos.map((agendamento) => (
                        <CardAgendamento agendamento={agendamento} marcarComoConcluido={marcarComoConcluido} />
                    ))}
                </div>
            </div>
            <ModalNovoAgendamento
                isOpen={modalEstaAberto}
                onClose={() => setModalEstaAberto(false)}
            />
        </div>
    )
}