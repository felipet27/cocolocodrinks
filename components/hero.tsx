import Image from "next/image";
import logoImage from "@/imagenes/logo.jpeg";

export function Hero() {
  return (
    <section className="grid gap-8 rounded-[2rem] border border-[#39FF14]/55 bg-[rgba(12,12,12,0.84)] p-6 shadow-2xl shadow-[#39FF14]/20 backdrop-blur-xl lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 pr-4 text-xs text-emerald-100">
          <Image
            src={logoImage}
            alt="Logo Cocoloco Drinks"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full border border-white/20 object-cover"
          />
          <span className="uppercase tracking-[0.2em]">Cocoloco Drinks</span>
          <span className="hidden text-emerald-200/80 md:inline">@cocoloco_drinks1</span>
        </div>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            Granizados y cócteles para prender el parche sin salir de casa.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Arma tu pedido en segundos, paga por QR y confírmanos por WhatsApp. Rápido, claro y sin enredos.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-white/75">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Pago por QR</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Domicilio por zona</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Cierre por WhatsApp</span>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#catalogo"
            className="rounded-full border border-emerald-300/40 bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200/80 hover:bg-emerald-300"
          >
            Pedir ahora
          </a>
          <a
            href="https://www.instagram.com/cocoloco_drinks1/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/20"
          >
            Ir a Instagram
          </a>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#39FF14]/45 bg-black/30 p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(140,255,107,0.2),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(54,217,107,0.15),_transparent_38%)]" />
        <Image
          src={logoImage}
          alt="Cocoloco Drinks"
          width={720}
          height={720}
          className="relative h-full w-full rounded-[1.25rem] object-cover"
          priority
        />
      </div>
    </section>
  );
}