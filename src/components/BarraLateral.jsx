
export default function BarraLateral() {
    return (
        // Barra lateral fixa
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 text-white flex flex-col hidden md:flex">
            <div className="p-6 border-b border-zinc-800 text-xl font-bold tracking-wider">
                BARBER<span className="text-amber-500">PRO</span>
            </div>
            <nav className="p-4 flex-1">
                <p className="p-2 bg-zinc-900 rounded text-amber-500">Dashboard</p>
                <p className="p-2 mt-2 text-zinc-400 hover:text-zinc-200">Serviços</p>
            </nav>
        </aside>
    )
}