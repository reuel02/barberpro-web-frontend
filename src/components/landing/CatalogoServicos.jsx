/**
 * CatalogoServicos - Seção que exibe a lista de serviços disponíveis.
 * Cada serviço é renderizado como um card clicável. O serviço selecionado
 * recebe destaque visual com borda amber.
 *
 * Props:
 *   - servicos: array de objetos { id, nome, preco, duracao (int minutos) }
 *   - servicoSelecionado: objeto do serviço atualmente selecionado (ou null)
 *   - onSelecionar: função chamada ao clicar em um serviço
 */
export default function CatalogoServicos({ servicos, servicoSelecionado, onSelecionar }) {

  /** Formata a duração de minutos (int) para texto legível */
  function formatarDuracao(minutos) {
    if (minutos >= 60) {
      const horas = Math.floor(minutos / 60);
      const mins = minutos % 60;
      return mins > 0 ? `${horas}h${mins}min` : `${horas}h`;
    }
    return `${minutos}min`;
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-white mb-1">Nossos Serviços</h2>
      <p className="text-zinc-500 text-sm mb-8">Escolha o serviço desejado</p>

      <div className="flex flex-col gap-3">
        {servicos.map((servico) => {
          const estaSelecionado = servicoSelecionado?.id === servico.id;

          return (
            <button
              key={servico.id}
              onClick={() => onSelecionar(servico)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                estaSelecionado
                  ? "bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/30"
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {/* Linha: nome do serviço, duração e preço */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-100">{servico.nome}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 text-sm">
                    {formatarDuracao(servico.duracao)}
                  </span>
                  <span className="text-amber-500 font-bold">
                    R$ {Number(servico.preco).toFixed(2)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

