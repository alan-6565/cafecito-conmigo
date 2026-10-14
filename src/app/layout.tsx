import type { Metadata } from "next";
import { Caveat, DM_Sans, Yellowtail } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";

const yellowtail = Yellowtail({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-note",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "El Cafecito Conmigo — Specialty Drinks · Redbulls · Matcha | Hayward, CA",
  description: "Home-based cafe in Hayward, CA. Specialty iced lattes, build-your-own Redbulls, matcha, and mini pancake boxes. Pickup & delivery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${yellowtail.variable} ${caveat.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col dreamy text-ink font-ui">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
