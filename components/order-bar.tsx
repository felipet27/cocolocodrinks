"use client";

import { useOrderStore } from "@/store/order-store";
import { formatCOP } from "@/lib/money";

export function OrderBar() {
  const items = useOrderStore((state) => state.items);
  const subtotal = useOrderStore((state) => state.subtotal());
  const total = useOrderStore((state) => state.total());
  const setPaymentOpen = useOrderStore((state) => state.setPaymentOpen);
  const hasItems = items.length > 0;

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-[#39FF14]/55 bg-[rgba(8,8,8,0.92)] px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{items.length} ítems</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Subtotal {formatCOP(subtotal)}</span>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">Total {formatCOP(total)}</span>
        </div>
        <button
          className="rounded-full border border-emerald-300/40 bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200/80 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-45"
          onClick={() => setPaymentOpen(true)}
          disabled={!hasItems}
        >
          {hasItems ? "Revisar y programar entrega" : "Agrega productos para continuar"}
        </button>
      </div>
    </aside>
  );
}