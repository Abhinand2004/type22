"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";

const items = [
  { title: "Apex Tee", imageUrl: "/hero.svg", price: 1299 },
  { title: "Rev Hoodie", imageUrl: "/hero.svg", price: 1999 },
  { title: "V12 Tee", imageUrl: "/hero.svg", price: 1399 },
  { title: "Carbon Hoodie", imageUrl: "/hero.svg", price: 2199 },
];

export default function CollectionsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "">("");
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="heading-display text-3xl">Collections</h1>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search" className="rounded-md border bg-transparent px-3 py-2" />
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="rounded-md border bg-transparent px-3 py-2">
            <option value="">All</option>
            <option value="tshirt">T-Shirts</option>
            <option value="hoodie">Hoodies</option>
          </select>
          <div className="rounded-md border px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400">Filters: color/size (placeholder)</div>
        </div>
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items
            .filter((p)=>!query || p.title.toLowerCase().includes(query.toLowerCase()))
            .map((p, i) => (
              <div key={p.title}>
                <ProductCard {...p} />
                {i===1 && (
                  <div className="mt-2">
                    {/* Placeholder: Car sound button under rare collection */}
                    <button onClick={()=>new Audio("/sounds/engine-rev.mp3").play()} className="text-xs rounded px-3 py-1 border">Play Engine Rev</button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Collections page only — content component moved to components/CollectionsContent.tsx


