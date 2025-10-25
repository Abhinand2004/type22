import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Homepage from "@/components/Homepage/Homepage";
import type { Metadata } from "next";
import ClientFABs from "@/components/ClientFABs";

export const metadata: Metadata = {
  title: "Automotive T‑Shirt Brand — Type22",
  description:
    "Type22 is an automotive tshirtbrand in Kerala. Premium car tshirts and custom tees. Shop Type22 for automotive apparel.",
  keywords: [
    "type22",
    "automotive tshirtbrand",
    "automotive tshirtbrand in kerala",
    "car tshirts",
    "custom tshirt kerala",
  ],
  alternates: { canonical: "/" },
};


export default function Home() {
  return (
    <div>
      <Navbar />

      <main>
        <Homepage />
      </main>

      <Footer />

      {/* Floating Action Buttons */}
      <ClientFABs />
    </div>
  );
}
