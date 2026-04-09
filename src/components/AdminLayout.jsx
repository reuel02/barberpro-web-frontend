import { Outlet } from "react-router-dom";
import BarraLateral from "./BarraLateral";
import Cabecalho from "./Cabecalho";

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-zinc-950 overflow-hidden text-white">
            {/* Barra lateral na Esquerda fixa */}
            <BarraLateral />

            <div className="flex flex-col flex-1">
                {/* Cabeçalho no topo */}
                <Cabecalho />

                {/* Área rolável */}
                <main className="flex-1 overflow-y-auto p-6 bg-zinc-900 m-2 rounded-xl border border-zinc-800">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}