"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-4">
      <div className="max-w-md rounded-[2rem] border border-[#39FF14]/55 bg-[rgba(14,14,14,0.96)] p-8 text-center shadow-2xl shadow-[#39FF14]/20">
        <h2 className="mb-2 text-2xl font-semibold text-white">Algo salió mal</h2>
        <p className="mb-6 text-sm text-white/60">Ocurrió un error inesperado. Intenta de nuevo.</p>
        <button
          onClick={reset}
          className="rounded-full border border-emerald-300/40 bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200/80 hover:bg-emerald-300"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
