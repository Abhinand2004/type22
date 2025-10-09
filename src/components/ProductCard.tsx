"use client";

import Link from "next/link";
import React from "react";
import { CornerUpRight } from "lucide-react";

type ProductCardProps = {
  title: string;
  imageUrl?: string;
  price?: number;
  id?: string; // optional DB id; if provided, Buy Now links to /products/{id}
  sizes?: string[]; // 👈 new prop for size chart
};

export function ProductCard({
  title,
  imageUrl = "/hero.svg",
  price = 0,
  id,
  sizes = ["S", "M", "L", "XL"],
}: ProductCardProps) {
  const buyHref = id
    ? `/products/${encodeURIComponent(id)}`
    : `/products/${encodeURIComponent(title)}`;

  return (
    <div className="w-full max-w-xs rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow hover:shadow-amber-300/20 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 mt-1">₹{price}</p>

        {/* Size Chart */}
        <div className="mt-3 flex items-center justify-between">
          <Link
            href={buyHref}
            className="text-xs text-amber-600 flex items-center gap-2 hover:text-amber-500 transition-colors"
          >
            <CornerUpRight className="w-4 h-4" /> Buy Now
          </Link>

          <div className="flex gap-1">
            {sizes.map((size) => (
              <span
                key={size}
                className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded px-1.5 py-0.5"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
