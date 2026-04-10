/**
 * SeletorProfissional - Seção para o cliente escolher o barbeiro de preferência.
 * Cada profissional é exibido como um card com avatar (iniciais) e especialidade.
 * A seção fica visualmente "travada" (opaca) enquanto o serviço não for escolhido.
 *
 * Props:
 *   - profissionais: array de objetos { id, nome, especialidade, iniciais }
 *   - profissionalSelecionado: objeto do profissional selecionado (ou null)
 *   - onSelecionar: função chamada ao clicar em um profissional
 *   - habilitado: boolean que controla se a seção está acessível
 */
export default function SeletorProfissional({ profissionais, profissionalSelecionado, onSelecionar, habilitado }) {
  return (
    <section
      className={`max-w-2xl mx-auto px-6 py-12 transition-opacity duration-500 ${
        habilitado ? "opacity-100" : "opacity-30 pointer-events-none"
      }`}
    >
      {/* Divisor visual entre seções */}
      <div className="border-t border-zinc-800 mb-12" />

      <h2 className="text-2xl font-bold text-white mb-1">Escolha o Profissional</h2>
      <p className="text-zinc-500 text-sm mb-8">Quem você prefere?</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {profissionais.map((profissional) => {
          const estaSelecionado = profissionalSelecionado?.id === profissional.id;

          return (
            <button
              key={profissional.id}
              onClick={() => onSelecionar(profissional)}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all duration-200 ${
                estaSelecionado
                  ? "bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/30"
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {/* Avatar circular com as iniciais do profissional */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-colors ${
                  estaSelecionado
                    ? "bg-amber-500 text-zinc-950"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {profissional.iniciais}
              </div>

              {/* Nome e especialidade */}
              <div className="text-center">
                <p className="font-semibold text-zinc-100">{profissional.nome}</p>
                <p className="text-zinc-500 text-xs mt-1">{profissional.especialidade}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
