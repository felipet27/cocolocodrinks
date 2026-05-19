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
    title: "Granizados sin sabor",
    description: "Frescos, intensos y listos para activar la noche.",
    basePrice: 10000,
    image: mangoImage,
    options: [
      {
        label: "Sin sabor",
        price: 10000,
        flavors: ["Mango", "Fresa"],
        flavorImages: {
          Mango: mangoImage,
          Fresa: fresaImage
        }
      }
    ]
  },
  {
    id: "granizados-con-licor",
    title: "Granizados con licor",
    description: "Una versión más premium, con dos sabores y más carácter.",
    basePrice: 14000,
    image: whiskyImage,
    options: [
      {
        label: "Con licor",
        price: 14000,
        flavors: ["Whisky", "Vodka"],
        flavorImages: {
          Whisky: whiskyImage,
          Vodka: vodkaImage
        }
      }
    ]
  },
  {
    id: "jugos-naturales",
    title: "Jugos Naturales",
    description: "Cuatro sabores tropicales para una compra ligera y fresca.",
    basePrice: 7000,
    image: luloImage,
    options: [
      {
        label: "Natural",
        price: 7000,
        flavors: ["Lulo", "Mango", "Maracuyá", "Fresa"],
        flavorImages: {
          Lulo: luloImage,
          Mango: mango2Image,
          Maracuyá: maracuyaImage,
          Fresa: fresa2Image
        }
      }
    ]
  },
  {
    id: "latas-cocteles",
    title: "Latas de cócteles",
    description: "Cinco sabores listos para mover la noche.",
    basePrice: 30000,
    image: latasLicorImage,
    options: [
      {
        label: "Lata",
        price: 30000,
        flavors: ["Tropical", "Citrus", "Berry", "Mojito", "Passion"]
      }
    ]
  },
  {
    id: "torta-zanahoria",
    title: "Torta de Zanahoria",
    description: "El complemento perfecto para cerrar o acompañar el pedido.",
    basePrice: 5000,
    image: tortaZanahoriaImage,
    options: [
      {
        label: "Unidad",
        price: 5000,
        flavors: ["Clásica"]
      }
    ]
  }
];

export const productGroupMap = Object.fromEntries(productGroups.map((group) => [group.id, group]));