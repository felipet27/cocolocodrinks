import { Hero } from "@/components/hero";
import { ProductCatalogue } from "@/components/product-catalogue";
import { HowItWorks } from "@/components/how-it-works";
import { OrderBar } from "@/components/order-bar";
import { DeliveryCheckout } from "@/components/delivery-checkout";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-6 pb-32 md:px-6 lg:px-8">
      <Hero />
      <ProductCatalogue />
      <HowItWorks />
      <OrderBar />
      <DeliveryCheckout />
    </main>
  );
}