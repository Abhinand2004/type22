"use client";

import { Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

const items = [
  { title: "GT Heritage Tee", imageUrl: "/images/tshirt1.jpg", price: 999, rating: 4.6, stock: true, car: "Ford GT" },
  { title: "Type-R Street", imageUrl: "/images/tshirt1.jpg", price: 1199, rating: 4.8, stock: true, car: "Honda Type-R" },
  { title: "Supra Turbo Classic", imageUrl: "/images/tshirt1.jpg", price: 1299, rating: 4.7, stock: false, car: "Toyota Supra" },
  { title: "GTR Skyline Edition", imageUrl: "/images/tshirt1.jpg", price: 1399, rating: 4.9, stock: true, car: "Nissan GTR" },
  { title: "M-Power Performance", imageUrl: "/images/tshirt1.jpg", price: 1499, rating: 4.6, stock: true, car: "BMW M3" },
  { title: "Mustang Legacy Tee", imageUrl: "/images/tshirt1.jpg", price: 1099, rating: 4.4, stock: true, car: "Ford Mustang" },
  { title: "Roadster Speedline", imageUrl: "/images/tshirt1.jpg", price: 999, rating: 4.3, stock: true, car: "Mazda MX-5" },
  { title: "AMG Drift Series", imageUrl: "/images/tshirt1.jpg", price: 1299, rating: 4.7, stock: false, car: "Mercedes AMG" },
  { title: "Vantage Carbon Tee", imageUrl: "/images/tshirt1.jpg", price: 1399, rating: 4.8, stock: true, car: "Aston Martin" },
  { title: "911 Turbo Spirit", imageUrl: "/images/tshirt1.jpg", price: 1499, rating: 5.0, stock: true, car: "Porsche 911" },
  { title: "Huracan Squadra", imageUrl: "/images/tshirt1.jpg", price: 1699, rating: 4.9, stock: true, car: "Lamborghini Huracan" },
];

export default function CollectionsContent() {
  return (
    <section id="collections" className="mx-auto max-w-7xl px-4 py-16 scroll-mt-24">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent">
          Automotive Apparel Collection
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Inspired by iconic machines, crafted for enthusiasts.
        </p>
        <div className="mx-auto w-24 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => (
          <div
            key={p.title}
            className="flex flex-col items-center bg-transparent rounded-xl hover:scale-[1.02] transition-transform duration-300"
          >
            <ProductCard title={p.title} imageUrl={p.imageUrl} price={p.price} />

            {/* Details below card */}
            <div className="w-full mt-3 text-center space-y-1">
              <h4 className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200">
                {p.car}
              </h4>

              <div className="flex justify-center items-center gap-1 text-amber-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs sm:text-sm">{p.rating}</span>
              </div>

              <p
                className={`text-[11px] font-semibold uppercase tracking-wide ${
                  p.stock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {p.stock ? "In Stock" : "Out of Stock"}
              </p>

              {/* Play button for one special item */}
              {i === 1 && (
                <button
                  onClick={() => new Audio("/sounds/engine-rev.mp3").play()}
                  className="text-[10px] sm:text-xs mt-2 rounded-full px-3 py-1 border border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-zinc-800 transition"
                >
                  Play Engine Rev
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
