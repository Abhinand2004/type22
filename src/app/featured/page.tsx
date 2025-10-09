"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Featured from "@/components/Featured";

export default function FeaturedPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Featured />
      </main>
      <Footer />
    </div>
  );
}

// Featured content is provided by the component at src/components/Featured.tsx
