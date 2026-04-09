

export default function ModalNovoAgendamento({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            {/*Caixa do Modal*/}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl">

                <h2 className="text-xl font-bold text-white mb-6">Novo Agendamento</h2>

                {/* Corpo do Form */}
                <div className="py-8 bg-zinc-950 border border-zinc-800 rounded-lg text-center text-sm font-medium text-zinc-500 mb-6">
                    <label>Nome do Cliente</label>
                    <input type="text" />
                </div>

                {/* { Rodape com botoes de ação} */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => { setModalEstaAberto(false) }}
                        className="px-4 py-2 font-medium text-zinc-400 hover:text-white transition-colors"
                    >Cancelar
                    </button>

                    <button
                        onClick={() => setModalEstaAberto(false)} // (No futuro isso vai salvar os dados em vez de só fechar)
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-lg transition-colors"
                    >
                        Salvar Agendamento
                    </button>
                </div>
            </div>

        </div>
    )
}