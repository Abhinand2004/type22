"use client";

import Image from "next/image";
import { useRef } from "react";

type ProductCardProps = {
  title: string;
  imageUrl: string;
  price: number;
};

export function ProductCard({ title, imageUrl, price }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 6;
    const rotateX = -((y - midY) / midY) * 6;
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  function resetTilt() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-[4/5] relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 text-base sm:text-lg tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            T-Shirt / Hoodie
          </p>
        </div>
        <p className="font-semibold text-amber-600 dark:text-amber-400 text-sm sm:text-base">
          ₹{price.toFixed(0)}
        </p>
      </div>

      {/* Glow Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,215,0,0.12), transparent 40%)",
        }}
      />
    </div>
  );
}
