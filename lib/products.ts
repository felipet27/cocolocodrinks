import type { ProductCategory } from "@/store/order-store";
import type { StaticImageData } from "next/image";
import logoImage from "@/imagenes/logo.jpeg";
import mangoImage from "@/imagenes/Mango.png";
import fresaImage from "@/imagenes/Fresa.png";
import whiskyImage from "@/imagenes/Whisky.png";
import vodkaImage from "@/imagenes/Vodka.png";
import luloImage from "@/imagenes/Lulo.png";
import mango2Image from "@/imagenes/Mango2.png";
import maracuyaImage from "@/imagenes/Maracuyá.png";
import fresa2Image from "@/imagenes/Fresa2.png";
import latasLicorImage from "@/imagenes/Latas licor.png";
import tortaZanahoriaImage from "@/imagenes/Torta Zanahoria.png";

export type ProductGroup = {
  id: ProductCategory;
  title: string;
  description: string;
  basePrice: number;
  image: string | StaticImageData;
  sizePrices?: Record<string, number>;
  flavorNote?: string;
  options: Array<{
    label: string;
    price?: number;
    flavors: string[];
    flavorImages?: Record<string, string | StaticImageData>;
    variants?: string[];
  }>;
};

export const productGroups: ProductGroup[] = [
  {
    id: "granizados-sin-licor",
    title: "Granizados sin licor",
    description: "Frescos, intensos y listos para activar la noche.",
    basePrice: 12000,
    image: mangoImage,
    sizePrices: {
      Pequeño: 12000,
      Mediano: 14000,
      Grande: 20000
    },
    flavorNote: "Como todos los días cambiamos de sabor, al finalizar el pedido te diremos con qué sabores contamos hoy.",
    options: [
      {
        label: "Sin licor",
        flavors: ["Pequeño", "Mediano", "Grande"]
      }
    ]
  },
  {
    id: "granizados-con-licor",
    title: "Granizados con licor",
    description: "Una versión más premium, con dos sabores y más carácter.",
    basePrice: 13000,
    image: whiskyImage,
    sizePrices: {
      Pequeño: 13000,
      Mediano: 16000,
      Grande: 24000
    },
    flavorNote: "Como todos los días cambiamos de sabor, al finalizar el pedido te diremos con qué sabores contamos hoy.",
    options: [
      {
        label: "Con licor",
        flavors: ["Pequeño", "Mediano", "Grande"]
      }
    ]
  },
  {
    id: "jugos-naturales",
    title: "Jugos Naturales",
    description: "Vaso de jugo natural en agua o leche. Escoge tu tamaño y sabor favorito.",
    basePrice: 5000,
    image: luloImage,
    sizePrices: {
      Agua: 5000,
      Leche: 6000,
      Extragrande: 8000
    },
    options: [
      {
        label: "Natural",
        flavors: ["Fresa", "Mora", "Frutos Rojos", "Mango", "Mango Biche", "Guanábana", "Borojo", "Mandarina", "Maracuyá", "Maracumango"]
      }
    ]
  },
  {
    id: "latas-cocteles",
    title: "Latas de cócteles",
    description: "Cócteles listos para mover la noche.",
    basePrice: 30000,
    image: latasLicorImage,
    flavorNote: "Como todos los días cambiamos de sabor, al finalizar el pedido te diremos con qué sabores contamos hoy.",
    options: [
      {
        label: "Lata",
        price: 30000,
        flavors: ["Único"]
      }
    ]
  },
  {
    id: "torta-zanahoria",
    title: "Tortas",
    description: "El complemento perfecto para cerrar o acompañar el pedido.",
    basePrice: 5000,
    image: tortaZanahoriaImage,
    options: [
      {
        label: "Porción",
        price: 5000,
        flavors: ["Zanahoria", "Maria Luisa"]
      }
    ]
  },
  {
    id: "limonadas",
    title: "Limonadas",
    description: "Limonadas frescas y naturales para cualquier momento.",
    basePrice: 7000,
    image: luloImage,
    options: [
      {
        label: "Limonada",
        price: 7000,
        flavors: ["Coco", "Liche", "Yerbabuena", "Cereza"]
      }
    ]
  }
];

export const productGroupMap = Object.fromEntries(productGroups.map((group) => [group.id, group]));