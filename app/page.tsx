import { Hero } from "@/components/hero";
import { ProductCatalogue } from "@/components/product-catalogue";
import { OrderBar } from "@/components/order-bar";
import { DeliveryCheckout } from "@/components/delivery-checkout";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-6 pb-32 md:px-6 lg:px-8">
      <Hero />
      <ProductCatalogue />
      <section className="grid gap-4 rounded-[1.75rem] border border-[#39FF14]/55 bg-[rgba(18,18,18,0.82)] p-6 text-white/75 shadow-lg shadow-[#39FF14]/15">
        <h2 className="text-2xl font-semibold text-white">Cómo funciona tu pedido</h2>
        <p className="max-w-3xl text-sm leading-7">
          1) Elige sabores y cantidades. 2) Revisa el total con domicilio. 3) Paga por QR. 4) Envía tu comprobante y dirección por WhatsApp para confirmar al instante.
        </p>
      </section>
      <OrderBar />
      <DeliveryCheckout />
    </main>
  );
}