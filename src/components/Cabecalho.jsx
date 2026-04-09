
export default function Cabecalho() {
    return (
        <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
            <h2 className="text-lg font-semibold text-zinc-200">Painel de Controle</h2>
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-zinc-200">Bem vindo, Admin! Você tem X clientes para hoje</span>
            </div>
        </header>

    )
}