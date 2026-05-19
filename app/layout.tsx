import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "Cocoloco Drinks",
  description: "Experiencia premium de compra para Cocoloco Drinks",
  icons: {
    icon: "/icon.jpeg",
    shortcut: "/icon.jpeg",
    apple: "/icon.jpeg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={spaceGrotesk.variable}>{children}</body>
    </html>
  );
}