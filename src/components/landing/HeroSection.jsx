/**
 * HeroSection - Seção inicial da landing page (cartão de visitas).
 * Exibe o logo, endereço, status de funcionamento e o botão CTA principal.
 *
 * Props:
 *   - onAgendarClick: função chamada ao clicar no botão "Agendar Agora"
 */
export default function HeroSection({ onAgendarClick }) {
  return (
    <section className="relative overflow-hidden">
      {/* Efeitos decorativos de gradiente no fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 pt-16 pb-12 text-center">
        {/* Logo / Nome da Barbearia */}
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          BARBER<span className="text-amber-500">PRO</span>
        </h1>
        <p className="text-zinc-500 text-sm tracking-widest uppercase mb-6">
          Barbearia Premium
        </p>

        {/* Endereço */}
        <p className="text-zinc-400 text-sm mb-4">
          📍 Rua das Palmeiras, 123 — Centro, São Paulo
        </p>

        {/* Badge de Status (Aberto/Fechado) */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Aberto agora · Fecha às 20:00
        </div>

        {/* Botão CTA principal - rola até a seção de serviços */}
        <div>
          <button
            onClick={onAgendarClick}
            className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-3 px-10 rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 text-lg"
          >
            Agendar Agora
          </button>
        </div>
      </div>
    </section>
  );
}
