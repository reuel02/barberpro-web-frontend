import { useState } from "react";
import CardServico from "../../components/CardServico";

export default function Servicos() {
  const [modalEstaAberto, setModalEstaAberto] = useState(false);
  const [servicos, setServicos] = useState([
    { id: 1, nome: "Corte Masculino", preco: 40.00, duracao: "30min" },
    { id: 2, nome: "Barba Completa", preco: 35.00, duracao: "25min" },
    { id: 3, nome: "Corte + Barba", preco: 65.00, duracao: "50min" },
    { id: 4, nome: "Pigmentação", preco: 55.00, duracao: "40min" },
    { id: 5, nome: "Sobrancelha", preco: 15.00, duracao: "10min" },
    { id: 6, nome: "Hidratação Capilar", preco: 45.00, duracao: "35min" },
  ]);

  function excluirServico(id) {
    const novaLista = servicos.filter((servico) => servico.id !== id);
    setServicos(novaLista);
}

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Serviços</h1>
          <p className="text-zinc-400">Gerencie os serviços da sua barbearia</p>
        </div>

        <button
          className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
          onClick={() => setModalEstaAberto(true)}
        >
          + Adicionar Novo Serviço
        </button>
      </div>

      <div>
        {servicos.map((servico) => (
          <CardServico key={servico.id} servico={servico} onExcluir={excluirServico}/>
        ))}
      </div>
    </div>
  );
}
