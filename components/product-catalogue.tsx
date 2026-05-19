"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { productGroups } from "@/lib/products";
import { useOrderStore } from "@/store/order-store";
import { formatCOP } from "@/lib/money";

export function ProductCatalogue() {
  const addItem = useOrderStore((state) => state.addItem);
  const [activeId, setActiveId] = useState<string | null>(productGroups[0].id);
  const [selectedFlavors, setSelectedFlavors] = useState<Record<string, string>>({});

  const getOptionKey = (groupId: string, optionLabel: string) => `${groupId}:${optionLabel}`;

  const getSelectedFlavor = (groupId: string, optionLabel: string, fallbackFlavor: string) => {
    const optionKey = getOptionKey(groupId, optionLabel);
    return selectedFlavors[optionKey] ?? fallbackFlavor;
  };

  const onSelectFlavor = (groupId: string, optionLabel: string, flavor: string) => {
    const optionKey = getOptionKey(groupId, optionLabel);
    setSelectedFlavors((prev) => ({
      ...prev,
      [optionKey]: flavor
    }));
  };

  return (
    <section id="catalogo" className="grid gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Pide por producto</h2>
          <p className="text-sm text-white/60">Selecciona el sabor y luego agrega. Puedes combinar granizados, jugos, latas y torta en un solo pedido.</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {productGroups.map((group) => {
          const open = activeId === group.id;
          const firstOption = group.options[0];
          const selectedFlavor = firstOption
            ? getSelectedFlavor(group.id, firstOption.label, firstOption.flavors[0])
            : undefined;
          const displayImage = selectedFlavor && firstOption?.flavorImages
            ? (firstOption.flavorImages[selectedFlavor] ?? group.image)
            : group.image;

          return (
            <article
              key={group.id}
              className="overflow-hidden rounded-[1.5rem] border border-[#39FF14]/50 bg-[rgba(18,18,18,0.82)] shadow-lg shadow-[#39FF14]/15"
            >
              <div className="grid w-full gap-4 p-4 text-left md:grid-cols-[180px_1fr] md:p-5">
                <div className="relative h-44 overflow-hidden rounded-[1.25rem] border border-[#39FF14]/35 md:h-full md:min-h-44">
                  <Image src={displayImage} alt={group.title} fill className="object-cover opacity-90" />
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-200">
                        {formatCOP(group.basePrice)}
                      </span>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-white/65">{group.description}</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/20"
                    onClick={() => setActiveId(open ? null : group.id)}
                  >
                    {open ? "Ocultar sabores" : "Ver sabores"}
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="border-t border-[#39FF14]/40"
                  >
                    <div className="space-y-4 p-4 md:p-5">
                      {group.options.map((option) => {
                        const selectedFlavor = getSelectedFlavor(group.id, option.label, option.flavors[0]);

                        return (
                          <div key={option.label} className="space-y-3 rounded-[1.25rem] border border-[#39FF14]/35 bg-white/5 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <h4 className="text-lg font-medium text-white">{option.label}</h4>
                                <p className="text-sm text-white/55">Desde {formatCOP(option.price ?? group.basePrice)}</p>
                              </div>
                              <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70">
                                Sabor: {selectedFlavor}
                              </span>
                            </div>
                            <div>
                              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/45">Selecciona sabor</p>
                              <div className="flex flex-wrap gap-2">
                                {option.flavors.map((flavor) => {
                                  const isSelected = selectedFlavor === flavor;

                                  return (
                                    <button
                                      key={flavor}
                                      className={`rounded-full border px-4 py-2 text-sm transition ${
                                        isSelected
                                          ? "border-emerald-300 bg-emerald-400/20 text-emerald-100 hover:-translate-y-0.5"
                                          : "border-white/10 bg-black/30 text-white hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/10"
                                      }`}
                                      onClick={() => onSelectFlavor(group.id, option.label, flavor)}
                                    >
                                      {flavor}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <button
                              className="rounded-full border border-emerald-300/40 bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200/80 hover:bg-emerald-300"
                              onClick={() =>
                                addItem({
                                  name: group.title,
                                  category: group.id,
                                  price: option.price ?? group.basePrice,
                                  quantity: 1,
                                  variant: option.label,
                                  flavor: selectedFlavor
                                })
                              }
                            >
                              Agregar al pedido
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}