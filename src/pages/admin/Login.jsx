import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function submitForm(e) {
    e.preventDefault();

    console.log("Tentando logar com:", email, senha);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-xl shadow-sm w-full max-w-md border border-zinc-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wider">
            BARBER<span className="text-amber-500">PRO</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Gestão exclusiva para barbearias de alto padrão.
          </p>
        </div>
        {/* Formulário */}
        <form onSubmit={submitForm} className="space-y-6">
          {/* Campo E-mail */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="contato@suabarbearia.com"
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Campo Senha */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {/* Botão de Entrar */}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-3 px-4 rounded-lg transition-colors duration-200 mt-4"
          >
            Acessar Sistema
          </button>
        </form>

        {/* Rodapé */}
        <div className="mt-6 text-center text-sm text-zinc-500">
          Problemas para acessar?{" "}
          <a href="#" className="text-amber-500 hover:underline">
            Fale com o suporte
          </a>
        </div>
      </div>
    </div>
  );
}
