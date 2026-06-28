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
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const getOptionKey = (groupId: string, optionLabel: string) => `${groupId}:${optionLabel}`;

  const getSelected = (map: Record<string, string>, groupId: string, optionLabel: string, fallback: string) => {
    return map[getOptionKey(groupId, optionLabel)] ?? fallback;
  };

  const onSelect = (map: Record<string, string>, setter: typeof setSelectedFlavors, groupId: string, optionLabel: string, value: string) => {
    setter((prev) => ({ ...prev, [getOptionKey(groupId, optionLabel)]: value }));
  };

  const isSizeKey = (group: typeof productGroups[number], flavor: string) =>
    !!group.sizePrices?.[flavor];

  return (
    <section id="catalogo" className="grid gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Pide por producto</h2>
          <p className="text-sm text-white/60">Elige tu producto, selecciona el tamaño o sabor y agrégalo. Puedes combinar granizados, jugos, latas y torta en un solo pedido.</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {productGroups.map((group) => {
          const open = activeId === group.id;
          const firstOption = group.options[0];
          const selectedFlavor = firstOption
            ? getSelected(selectedFlavors, group.id, firstOption.label, firstOption.flavors[0])
            : undefined;

          const hasSizes = !!group.sizePrices;
          const sizeKeys = hasSizes ? Object.keys(group.sizePrices!) : [];
          const isSizeOnly = hasSizes && firstOption
            ? firstOption.flavors.every((f) => sizeKeys.includes(f))
            : false;
          const isSizeAndFlavor = hasSizes && firstOption
            ? firstOption.flavors.some((f) => !sizeKeys.includes(f))
            : false;
          const isFlavorOnly = !hasSizes && firstOption && firstOption.flavors.length > 1;
          const isSingle = !hasSizes && firstOption && firstOption.flavors.length === 1;

          const firstSizeKey = sizeKeys[0] ?? "";
          const selectedSize = firstOption
            ? getSelected(selectedSizes, group.id, firstOption.label, firstSizeKey)
            : "";

          const displayImage = selectedFlavor && firstOption?.flavorImages
            ? (firstOption.flavorImages[selectedFlavor] ?? group.image)
            : group.image;

          const btnLabel = isSingle
            ? (open ? "Ocultar detalle" : "Ver detalle")
            : (open
                ? `Ocultar ${hasSizes ? "tamaños" : "sabores"}`
                : `Ver ${hasSizes ? "tamaños" : "sabores"}`);

          const getBadge = () => {
            if (isSizeAndFlavor) {
              return `${selectedSize} - ${selectedFlavor} (${formatCOP(group.sizePrices![selectedSize])})`;
            }
            if (isSizeOnly) {
              return `${selectedFlavor} - ${formatCOP(group.sizePrices![selectedFlavor!])}`;
            }
            if (isFlavorOnly) {
              return `Sabor: ${selectedFlavor}`;
            }
            return null;
          };

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
                    {btnLabel}
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
                        const optFlavor = getSelected(selectedFlavors, group.id, option.label, option.flavors[0]);
                        const optSize = getSelected(selectedSizes, group.id, option.label, sizeKeys[0] ?? "");

                        const showSizeSection = hasSizes;
                        const showFlavorSection = (hasSizes && !isSizeOnly) || isFlavorOnly;

                        return (
                          <div key={option.label} className="space-y-3 rounded-[1.25rem] border border-[#39FF14]/35 bg-white/5 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <h4 className="text-lg font-medium text-white">{option.label}</h4>
                                <p className="text-sm text-white/55">Desde {formatCOP(option.price ?? group.basePrice)}</p>
                              </div>
                              {getBadge() ? (
                                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70">
                                  {getBadge()}
                                </span>
                              ) : null}
                            </div>

                            {showSizeSection ? (
                              <div>
                                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/45">Selecciona tamaño</p>
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(group.sizePrices!).map(([size, price]) => {
                                    const isSelected = (isSizeAndFlavor ? optSize : optFlavor) === size;
                                    return (
                                      <button
                                        key={size}
                                        className={`rounded-full border px-4 py-2 text-sm transition ${
                                          isSelected
                                            ? "border-emerald-300 bg-emerald-400/20 text-emerald-100 hover:-translate-y-0.5"
                                            : "border-white/10 bg-black/30 text-white hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/10"
                                        }`}
                                        onClick={() => {
                                          if (isSizeAndFlavor) {
                                            onSelect(selectedSizes, setSelectedSizes, group.id, option.label, size);
                                          } else {
                                            onSelect(selectedFlavors, setSelectedFlavors, group.id, option.label, size);
                                          }
                                        }}
                                      >
                                        {size} ({formatCOP(price)})
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}

                            {showFlavorSection ? (
                              <div>
                                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/45">Selecciona sabor</p>
                                <div className="flex flex-wrap gap-2">
                                  {option.flavors.map((flavor) => {
                                    const isSelected = optFlavor === flavor;
                                    return (
                                      <button
                                        key={flavor}
                                        className={`rounded-full border px-4 py-2 text-sm transition ${
                                          isSelected
                                            ? "border-emerald-300 bg-emerald-400/20 text-emerald-100 hover:-translate-y-0.5"
                                            : "border-white/10 bg-black/30 text-white hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/10"
                                        }`}
                                        onClick={() => onSelect(selectedFlavors, setSelectedFlavors, group.id, option.label, flavor)}
                                      >
                                        {flavor}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}

                            {group.flavorNote ? (
                              <p className="text-xs leading-5 text-white/50">{group.flavorNote}</p>
                            ) : null}

                            <button
                              className="rounded-full border border-emerald-300/40 bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200/80 hover:bg-emerald-300"
                              onClick={() => {
                                const payload: Parameters<typeof addItem>[0] = {
                                  name: group.title,
                                  category: group.id,
                                  price: option.price ?? group.basePrice,
                                  quantity: 1,
                                  variant: option.label,
                                };

                                if (isSizeOnly) {
                                  payload.size = optFlavor;
                                  payload.price = group.sizePrices![optFlavor];
                                } else if (isSizeAndFlavor) {
                                  payload.size = optSize;
                                  payload.flavor = optFlavor;
                                  payload.price = group.sizePrices![optSize];
                                } else if (isFlavorOnly) {
                                  payload.flavor = optFlavor;
                                }

                                addItem(payload);
                              }}
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
