"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Homepage from "@/components/Homepage/Homepage";

export default function Home() {
  return (
    <div>
      <Navbar />

      <main>
        <Homepage />
      </main>

      <Footer />
    </div>
  );
}
