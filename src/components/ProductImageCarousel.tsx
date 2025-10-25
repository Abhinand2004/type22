"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";

export default function ProductImageCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const safeImages = useMemo(() => (images?.length ? images : ["/images/logo.svg"]), [images]);
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  const prev = useCallback(() => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length), [safeImages.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % safeImages.length), [safeImages.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(deltaX.current) > 40) {
      if (deltaX.current < 0) next();
      else prev();
    }
    startX.current = null;
    deltaX.current = 0;
  };

  return (
    <div className="relative group aspect-square w-full max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/30 to-black border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="w-full h-full relative">
        {safeImages.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt={alt}
            width={1000}
            height={1000}
            unoptimized
            priority={i === index}
            className={`object-cover w-full h-full absolute inset-0 transition-transform duration-500 ${i === index ? "translate-x-0" : i < index ? "-translate-x-full" : "translate-x-full"}`}
          />
        ))}
      </div>

      {safeImages.length > 1 && (
        <>
          <button aria-label="Previous" onClick={prev} className="hidden md:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20">
            ‹
          </button>
          <button aria-label="Next" onClick={next} className="hidden md:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20">
            ›
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
            {safeImages.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? "bg-blue-400 w-6" : "bg-white/30"}`}
              />)
            )}
          </div>
        </>
      )}
    </div>
  );
}
