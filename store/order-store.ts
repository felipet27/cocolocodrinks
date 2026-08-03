"use client";

import { create } from "zustand";
import { formatCOP } from "@/lib/money";

export type ProductCategory =
  | "granizados-sin-licor"
  | "granizados-con-licor"
  | "jugos-naturales"
  | "latas-cocteles"
  | "torta-zanahoria"
  | "limonadas";

export type OrderItem = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  quantity: number;
  variant?: string;
  flavor?: string;
  size?: string;
};

export type DeliveryZone = string;

export type DeliveryZoneOption = {
  id: string;
  label: string;
  fee: number;
  group: "Recoger en sitio" | "Veredas y Zonas Rurales" | "Barrios";
};

export const deliveryZoneOptions: DeliveryZoneOption[] = [
  { id: "recoger-en-sitio", label: "Recoger en sitio", fee: 0, group: "Recoger en sitio" },
  { id: "vereda-la-aguacatala", label: "Vereda La Aguacatala", fee: 7500, group: "Veredas y Zonas Rurales" },
  { id: "vereda-el-cano", label: "Vereda El Cano", fee: 7000, group: "Veredas y Zonas Rurales" },
  { id: "vereda-la-miel", label: "Vereda La Miel", fee: 8000, group: "Veredas y Zonas Rurales" },
  { id: "vereda-la-chuscala", label: "Vereda La Chuscala", fee: 10000, group: "Veredas y Zonas Rurales" },
  { id: "vereda-el-raizal", label: "Vereda El Raizal", fee: 10000, group: "Veredas y Zonas Rurales" },
  { id: "la-raya", label: "La Raya", fee: 7000, group: "Veredas y Zonas Rurales" },
  { id: "la-corrala", label: "La Corrala", fee: 8000, group: "Veredas y Zonas Rurales" },
  { id: "la-valeria", label: "La Valeria", fee: 8000, group: "Veredas y Zonas Rurales" },
  { id: "salinas", label: "Salinas", fee: 13000, group: "Veredas y Zonas Rurales" },
  { id: "la-salada-parte-alta", label: "La Salada (parte alta)", fee: 12000, group: "Veredas y Zonas Rurales" },
  { id: "la-salada-parte-baja", label: "La Salada (parte baja)", fee: 12000, group: "Veredas y Zonas Rurales" },
  { id: "la-clara", label: "La Clara", fee: 13000, group: "Veredas y Zonas Rurales" },
  { id: "primavera", label: "Primavera", fee: 12000, group: "Veredas y Zonas Rurales" },
  { id: "barrios-unidos", label: "Barrios Unidos", fee: 5000, group: "Barrios" },
  { id: "la-pradera", label: "La Pradera", fee: 4000, group: "Barrios" },
  { id: "barrio-nuevo", label: "Barrio Nuevo", fee: 5000, group: "Barrios" },
  { id: "los-cerezos", label: "Los Cerezos", fee: 6000, group: "Barrios" },
  { id: "cristo-rey", label: "Cristo Rey", fee: 6000, group: "Barrios" },
  { id: "olaya-herrera", label: "Olaya Herrera", fee: 5000, group: "Barrios" },
  { id: "barrio-la-docena", label: "Barrio La Docena", fee: 5000, group: "Barrios" },
  { id: "barrio-la-inmaculada", label: "Barrio La Inmaculada", fee: 5000, group: "Barrios" },
  { id: "felipe-echavarria-1", label: "Felipe Echavarria N° 1", fee: 6000, group: "Barrios" },
  { id: "felipe-echavarria-2", label: "Felipe Echavarria N° 2", fee: 6000, group: "Barrios" },
  { id: "la-chuscala", label: "La Chuscala", fee: 8500, group: "Barrios" },
  { id: "el-minuto", label: "El Minuto", fee: 8500, group: "Barrios" },
  { id: "la-planta", label: "La Planta", fee: 5000, group: "Barrios" },
  { id: "barrio-las-margaritas", label: "Barrio Las Margaritas", fee: 5000, group: "Barrios" },
  { id: "la-acuarela-la-rivera", label: "La Acuarela (La Rivera)", fee: 6000, group: "Barrios" },
  { id: "zona-centro", label: "Zona Centro", fee: 6000, group: "Barrios" },
  { id: "barrio-andalucia", label: "Barrio Andalucía", fee: 7000, group: "Barrios" },
  { id: "la-goretti", label: "La Goretti", fee: 5000, group: "Barrios" },
  { id: "barrio-el-socorro", label: "Barrio El Socorro", fee: 5000, group: "Barrios" },
  { id: "villa-capri", label: "Villa Capri", fee: 6000, group: "Barrios" },
  { id: "la-esperanza", label: "La Esperanza", fee: 2000, group: "Barrios" },
  { id: "barrio-fundadores", label: "Barrio Fundadores", fee: 5000, group: "Barrios" },
  { id: "barrio-centenario", label: "Barrio Centenario", fee: 6000, group: "Barrios" },
  { id: "mandalay", label: "Mandalay", fee: 6000, group: "Barrios" },
  { id: "barrio-la-playita", label: "Barrio La Playita", fee: 6000, group: "Barrios" },
  { id: "la-aguacatala-kaiser", label: "La Aguacatala Kaiser", fee: 6000, group: "Barrios" },
  { id: "barrio-bellavista", label: "Barrio Bellavista", fee: 2000, group: "Barrios" },
  { id: "el-porvenir", label: "El Porvenir", fee: 2000, group: "Barrios" },
  { id: "la-loceria", label: "La Locería", fee: 5000, group: "Barrios" }
];

export const deliveryZoneConfig: Record<string, { label: string; fee: number; group: DeliveryZoneOption["group"] }> = {};
for (const option of deliveryZoneOptions) {
  deliveryZoneConfig[option.id] = {
    label: option.label,
    fee: option.fee,
    group: option.group
  };
}

type OrderState = {
  items: OrderItem[];
  address: string;
  neighborhood: string;
  notes: string;
  deliveryZone: DeliveryZone;
  deliveryFee: number;
  paymentOpen: boolean;
  addItem: (item: Omit<OrderItem, "id">) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
  updateItemFlavor: (id: string, flavor: string) => void;
  updateItemSize: (id: string, size: string, price: number) => void;
  setAddress: (address: string) => void;
  setNeighborhood: (neighborhood: string) => void;
  setNotes: (notes: string) => void;
  setDeliveryZone: (deliveryZone: DeliveryZone) => void;
  setDeliveryFee: (deliveryFee: number) => void;
  setPaymentOpen: (paymentOpen: boolean) => void;
  clearOrder: () => void;
  subtotal: () => number;
  total: () => number;
  whatsappMessage: () => string;
};

const defaultDeliveryZone = "";
const defaultDeliveryFee = 0;

const createId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export const useOrderStore = create<OrderState>((set, get) => ({
  items: [],
  address: "",
  neighborhood: "",
  notes: "",
  deliveryZone: defaultDeliveryZone,
  deliveryFee: defaultDeliveryFee,
  paymentOpen: false,
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (currentItem) =>
          currentItem.name === item.name &&
          currentItem.variant === item.variant &&
          currentItem.flavor === item.flavor &&
          currentItem.size === item.size
      );

      if (existing) {
        return {
          items: state.items.map((currentItem) =>
            currentItem.id === existing.id
              ? { ...currentItem, quantity: currentItem.quantity + item.quantity }
              : currentItem
          )
        };
      }

      return {
        items: [...state.items, { ...item, id: createId() }]
      };
    }),
  increaseItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    })),
  decreaseItem: (id) =>
    set((state) => ({
      items: state.items.flatMap((item) => {
        if (item.id !== id) {
          return [item];
        }

        if (item.quantity <= 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      })
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    })),
  updateItemFlavor: (id, flavor) =>
    set((state) => {
      const target = state.items.find((item) => item.id === id);

      if (!target) {
        console.warn(`updateItemFlavor: item ${id} not found`);
        return state;
      }

      const mergeCandidate = state.items.find(
        (item) =>
          item.id !== id &&
          item.name === target.name &&
          item.variant === target.variant &&
          item.flavor === flavor &&
          item.size === target.size
      );

      if (!mergeCandidate) {
        return {
          items: state.items.map((item) => (item.id === id ? { ...item, flavor } : item))
        };
      }

      return {
        items: state.items.flatMap((item) => {
          if (item.id === id) {
            return [];
          }

          if (item.id === mergeCandidate.id) {
            return [{ ...item, quantity: item.quantity + target.quantity }];
          }

          return [item];
        })
      };
    }),
  updateItemSize: (id, size, price) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, size, price } : item
      )
    })),
  setAddress: (address) => set({ address }),
  setNeighborhood: (neighborhood) => set({ neighborhood }),
  setNotes: (notes) => set({ notes }),
  setDeliveryZone: (deliveryZone) =>
    set((state) => {
      const zone = deliveryZoneConfig[deliveryZone];

      if (!zone) {
        return state;
      }

      return {
        deliveryZone,
        deliveryFee: zone.fee
      };
    }),
  setDeliveryFee: (deliveryFee) => set({ deliveryFee }),
  setPaymentOpen: (paymentOpen) => set({ paymentOpen }),
  clearOrder: () =>
    set({
      items: [],
      address: "",
      neighborhood: "",
      notes: "",
      deliveryZone: defaultDeliveryZone,
      deliveryFee: defaultDeliveryFee,
      paymentOpen: false
    }),
  subtotal: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  total: () => get().subtotal() + get().deliveryFee,
  whatsappMessage: () => {
    const { items, address, neighborhood, notes, deliveryFee, deliveryZone } = get();
    const total = formatCOP(get().total());
    const zoneLabel = deliveryZoneConfig[deliveryZone]?.label ?? "Sin zona seleccionada";

    const orderLines = items
      .map((item) => {
        const details = [item.variant, item.size, item.flavor].filter(Boolean).join(" - ");
        return `• ${item.quantity}x ${item.name}${details ? ` (${details})` : ""}`;
      })
      .join("\n");

    return [
      "COCOLOCO DRINKS | Nuevo pedido web",
      "----------------------------------------",
      "=== RESUMEN DEL PEDIDO ===",
      orderLines,
      "",
      "=== ENTREGA ===",
      address ? `• Dirección: ${address}` : "• Dirección pendiente",
      `• Zona de domicilio: ${zoneLabel}`,
      notes ? `• Notas: ${notes}` : "• Sin notas adicionales",
      "",
      "=== PAGO ===",
      "• Método: Transferencia por QR",
      `• Valor producto: ${formatCOP(get().subtotal())}`,
      `• Domicilio: ${formatCOP(deliveryFee)}`,
      `• Total Servicio: ${total}`,
      "----------------------------------------",
      "Adjunto la captura de la transferencia en este chat."
    ].join("\n");
  }
}));