import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display, Cormorant_Garamond, Syncopate, Bebas_Neue, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Crestline | Modern Luxury Life Products",
  description: "Foshan City Crestline Life Products Co., Ltd.",
};

import { LanguageProvider } from "../../lib/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${playfair.variable} ${cormorant.variable} ${syncopate.variable} ${bebas.variable} ${syne.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
