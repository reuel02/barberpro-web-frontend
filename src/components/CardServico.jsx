
export default function CardServico({ servico, onExcluir }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex items-center justify-between">
      {/* Lado Esquerdo: Info do Serviço */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <p className="text-zinc-100 font-medium text-lg leading-tight">
            {servico.nome}
          </p>
          <p className="text-sm text-zinc-500">{servico.duracao}</p>
        </div>
      </div>

      {/* Lado Direito: Preço e Ações */}
      <div className="flex items-center gap-6">
        <span className="text-amber-500 font-bold text-lg">
          R$ {servico.preco.toFixed(2)}
        </span>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded-lg text-sm font-medium text-zinc-400 bg-zinc-800 hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700"
            title="Editar Serviço"
          >
            Editar
          </button>
          <button
            onClick={() => onExcluir(servico.id)}
            className="px-3 py-1 rounded-lg text-sm font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors border border-red-500/20"
            title="Excluir Serviço"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}