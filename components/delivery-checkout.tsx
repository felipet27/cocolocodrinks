"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { deliveryZoneOptions, useOrderStore } from "@/store/order-store";
import { productGroupMap } from "@/lib/products";
import { formatCOP } from "@/lib/money";
import paymentQrImage from "@/imagenes/pago.jpeg";

const whatsappNumber = "573000000000";
const accountText = "54100035637";
const paymentKey = "0092130882";
type CopyAction = "amount" | "account" | "key" | "qr" | null;

export function DeliveryCheckout() {
  const paymentOpen = useOrderStore((state) => state.paymentOpen);
  const setPaymentOpen = useOrderStore((state) => state.setPaymentOpen);
  const items = useOrderStore((state) => state.items);
  const address = useOrderStore((state) => state.address);
  const neighborhood = useOrderStore((state) => state.neighborhood);
  const notes = useOrderStore((state) => state.notes);
  const deliveryZone = useOrderStore((state) => state.deliveryZone);
  const increaseItem = useOrderStore((state) => state.increaseItem);
  const decreaseItem = useOrderStore((state) => state.decreaseItem);
  const removeItem = useOrderStore((state) => state.removeItem);
  const updateItemFlavor = useOrderStore((state) => state.updateItemFlavor);
  const clearOrder = useOrderStore((state) => state.clearOrder);
  const setAddress = useOrderStore((state) => state.setAddress);
  const setNeighborhood = useOrderStore((state) => state.setNeighborhood);
  const setNotes = useOrderStore((state) => state.setNotes);
  const setDeliveryZone = useOrderStore((state) => state.setDeliveryZone);
  const subtotal = useOrderStore((state) => state.subtotal());
  const total = useOrderStore((state) => state.total());
  const message = useOrderStore((state) => state.whatsappMessage());

  const waLink = useMemo(
    () => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    [message]
  );
  const deliveryOptionsByGroup = useMemo(() => {
    const grouped: Record<string, typeof deliveryZoneOptions> = {};
    for (const option of deliveryZoneOptions) {
      if (!grouped[option.group]) grouped[option.group] = [];
      grouped[option.group].push(option);
    }
    // Ordenar cada grupo alfabéticamente por label
    Object.keys(grouped).forEach((group) => {
      grouped[group].sort((a, b) => a.label.localeCompare(b.label, 'es', { sensitivity: 'base' }));
    });
    return grouped;
  }, []);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [activeCopyAction, setActiveCopyAction] = useState<CopyAction>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  const showFeedback = (text: string, action: CopyAction = null) => {
    setFeedbackMessage(text);
    setActiveCopyAction(action);

    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedbackMessage("");
      setActiveCopyAction(null);
      feedbackTimeoutRef.current = null;
    }, 2200);
  };

  const copyText = async (text: string, successMessage: string, action: Exclude<CopyAction, null>) => {
    try {
      await navigator.clipboard.writeText(text);
      showFeedback(successMessage, action);
    } catch {
      showFeedback("No se pudo copiar. Intenta de nuevo.");
    }
  };

  const copyButtonClass = (action: Exclude<CopyAction, null>) => {
    const isActive = activeCopyAction === action;
    return `rounded-full border px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "border-emerald-300/60 bg-emerald-400/20 text-emerald-100"
        : "border-white/10 bg-black/30 text-white hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/10"
    }`;
  };

  useEffect(() => {
    if (!paymentOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPaymentOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;

      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }

      setFeedbackMessage("");
    };
  }, [paymentOpen, setPaymentOpen]);

  if (!paymentOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl">
        <div className="max-h-[90vh] w-full overflow-y-auto rounded-[2rem] border border-[#39FF14]/55 bg-[rgba(14,14,14,0.96)] p-5 shadow-2xl shadow-[#39FF14]/20 md:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-[#39FF14]/40 pb-4">
          <div>
            <h3 className="text-2xl font-semibold text-white">Confirma tu pedido</h3>
            <p className="text-sm text-white/60">Paga por QR y envíanos el detalle por WhatsApp para despachar.</p>
          </div>
          <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/10" onClick={() => setPaymentOpen(false)}>
            Cerrar
          </button>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-[220px_1fr]">
          <div className="rounded-[1.5rem] border border-[#39FF14]/45 bg-black/40 p-4 text-center">
            <Image src={paymentQrImage} alt="QR de pago" width={420} height={420} className="rounded-[1rem] object-cover" />
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-emerald-200">QR fijo</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.25rem] border border-[#39FF14]/40 bg-black/30 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white">Tu pedido</p>
                {items.length > 0 ? (
                  <button
                    className="rounded-full border border-rose-300/30 bg-rose-400/5 px-3 py-1 text-xs text-rose-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-200/70 hover:bg-rose-400/15 hover:text-rose-200"
                    onClick={() => clearOrder()}
                  >
                    Vaciar pedido
                  </button>
                ) : null}
              </div>

              {items.length === 0 ? (
                <p className="text-sm text-white/55">No hay productos agregados aún. Vuelve al catálogo y elige tus sabores.</p>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => {
                    const itemTotal = item.quantity * item.price;
                    const itemDetails = [item.variant, item.flavor].filter(Boolean).join(" - ");
                    const group = productGroupMap[item.category];
                    const matchedOption = group?.options.find((option) => option.label === item.variant);
                    const availableFlavors = matchedOption?.flavors ?? group?.options[0]?.flavors ?? [];
                    const showFlavorSelect = availableFlavors.length > 1;

                    return (
                      <div key={item.id} className="rounded-xl border border-[#39FF14]/35 bg-white/5 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-white">{item.name}</p>
                            {itemDetails ? <p className="text-xs text-white/55">{itemDetails}</p> : null}
                            <p className="mt-1 text-xs text-emerald-200">{formatCOP(itemTotal)}</p>
                          </div>
                          <button
                            className="rounded-full border border-rose-300/30 bg-rose-400/5 px-3 py-1 text-xs text-rose-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-200/70 hover:bg-rose-400/15 hover:text-rose-200"
                            onClick={() => removeItem(item.id)}
                          >
                            Quitar
                          </button>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <button
                            className="h-8 w-8 rounded-full border border-white/15 text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/10"
                            onClick={() => decreaseItem(item.id)}
                            aria-label={`Disminuir ${item.name}`}
                          >
                            -
                          </button>
                          <span className="min-w-6 text-center text-sm text-white">{item.quantity}</span>
                          <button
                            className="h-8 w-8 rounded-full border border-white/15 text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/10"
                            onClick={() => increaseItem(item.id)}
                            aria-label={`Aumentar ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        {showFlavorSelect ? (
                          <div className="mt-2">
                            <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-white/45">Cambiar sabor</p>
                            <select
                              value={item.flavor ?? availableFlavors[0]}
                              onChange={(event) => updateItemFlavor(item.id, event.target.value)}
                              className="w-full rounded-lg border border-[#39FF14]/40 bg-black/45 px-3 py-2 text-sm text-white outline-none"
                              title={`Cambiar sabor de ${item.name}`}
                            >
                              {availableFlavors.map((flavor) => (
                                <option key={flavor} value={flavor} className="bg-black">
                                  {flavor}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-[1.25rem] border border-[#39FF14]/40 bg-white/5 p-4">
              <p className="text-xs text-white/55">Subtotal productos: {formatCOP(subtotal)}</p>
              <p className="text-sm text-white/60">Total a transferir</p>
              <p className="text-3xl font-semibold text-white">{formatCOP(total)}</p>
              <p className="mt-2 text-sm text-white/55">El domicilio se ajusta automáticamente según la zona seleccionada.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                className={copyButtonClass("amount")}
                onClick={() => copyText(formatCOP(total), "Monto copiado", "amount")}
              >
                {activeCopyAction === "amount" ? "Monto copiado" : "Copiar monto"}
              </button>
              <button
                className={copyButtonClass("account")}
                onClick={() => copyText(accountText, "Cuenta copiada", "account")}
              >
                {activeCopyAction === "account" ? "Cuenta copiada" : "Copiar cuenta"}
              </button>
              <button
                className={copyButtonClass("key")}
                onClick={() => copyText(paymentKey, "Llave copiada", "key")}
              >
                {activeCopyAction === "key" ? "Llave copiada" : "Copiar llave"}
              </button>
              <a
                href={paymentQrImage.src}
                download="qr-cocoloco-drinks.jpeg"
                className={`inline-flex items-center justify-center rounded-full border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeCopyAction === "qr"
                    ? "border-emerald-300/60 bg-emerald-400/20 text-emerald-100"
                    : "border-white/10 bg-black/30 text-white hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/10"
                }`}
                onClick={() => showFeedback("Descarga iniciada", "qr")}
              >
                Descargar QR
              </a>
            </div>

            <div
              aria-live="polite"
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                feedbackMessage
                  ? "border-emerald-300/45 bg-[rgba(16,40,24,0.92)] text-emerald-100 shadow-lg shadow-emerald-400/20"
                  : "border-transparent text-transparent"
              }`}
            >
              {feedbackMessage || "Estado de copiado"}
            </div>

            <div className="grid gap-3 rounded-[1.25rem] border border-[#39FF14]/40 bg-black/30 p-4">
              <select
                value={deliveryZone}
                onChange={(event) => setDeliveryZone(event.target.value)}
                title="Zona de entrega"
                className="rounded-xl border border-[#39FF14]/40 bg-black/50 px-4 py-3 text-sm text-white outline-none"
              >
                {Object.entries(deliveryOptionsByGroup).map(([groupName, options]) => (
                  <optgroup key={groupName} label={groupName}>
                    {options.map((zone) => (
                      <option key={zone.id} value={zone.id} className="bg-black">
                        {zone.label} - {formatCOP(zone.fee)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Dirección de entrega"
                className="rounded-xl border border-[#39FF14]/40 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <input
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
                placeholder="Barrio o vereda"
                className="rounded-xl border border-[#39FF14]/40 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Notas de entrega"
                className="min-h-24 rounded-xl border border-[#39FF14]/40 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full border border-[#25D366]/60 bg-[#25D366] px-5 py-4 text-center text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={(event) => {
                if (items.length === 0) {
                  event.preventDefault();
                }
              }}
            >
              Enviar pedido por WhatsApp
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}