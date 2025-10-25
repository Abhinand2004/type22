"use client";

import Link from "next/link";
import React from "react";
import { CornerUpRight } from "lucide-react";
import Image from "next/image";

type ProductCardProps = {
  title: string;
  imageUrl?: string;
  price?: number;
  id?: string;
  sizes?: string[];
};

export function ProductCard({
  title,
  imageUrl = "/images/logo.svg",
  price = 0,
  id,
  sizes = ["S", "M", "L", "XL"],
}: ProductCardProps) {
  const buyHref = id
    ? `/products/${encodeURIComponent(id)}`
    : `/products/${encodeURIComponent(title)}`;

  return (
    <div className="w-full max-w-xs rounded-xl overflow-hidden bg-black shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-white">
      {/* Image */}
      <div className="relative h-40 sm:h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="p-3 sm:p-4 flex flex-col gap-3">
        {/* Title & Price */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm sm:text-base font-semibold">{title}</h3>
          <p className="text-sm sm:text-base font-medium text-blue-400">
            ₹{price}
          </p>
        </div>

        {/* Sizes */}
        <div className="flex justify-center gap-2 flex-wrap">
          {sizes.map((size) => (
            <span
              key={size}
              className="text-[8px] sm:text-[10px] md:text-xs font-medium border border-blue-500 rounded px-2 py-1 sm:px-2 sm:py-2"
            >
              {size}
            </span>
          ))}
        </div>

        {/* Buy Now Button */}
        <Link
          href={buyHref}
          className="mt-2 w-full text-center py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-semibold transition-all flex items-center justify-center gap-2"
        >
          <CornerUpRight className="w-4 h-4 text-white" />
          <span className="text-white text-sm sm:text-base">Buy Now</span>
        </Link>
      </div>
    </div>
  );
}

