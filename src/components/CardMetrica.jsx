
export default function CardMetrica({ nome, variavel }) {
    return (
        <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-400">{nome}</span>
            {/* Exibindo a nossa variável mockada! */}
            <span className="text-3xl font-bold text-amber-500">{variavel}</span>
        </div>
    )
}