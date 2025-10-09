"use client";

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

type DBProduct = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images?: string[];
  colors?: string[];
  sizes?: string[];
};

export default function CollectionsContent() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (mounted) setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section id="collections" className="mx-auto max-w-7xl px-4 py-16 scroll-mt-24">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent">
          Automotive Apparel Collection
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Inspired by iconic machines, crafted for enthusiasts.
        </p>
        <div className="mx-auto w-24 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"></div>
      </div>

      {loading ? (
        <div className="text-center text-sm text-zinc-500">Loading...</div>
      ) : (
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p._id} className="flex flex-col items-center bg-transparent rounded-xl hover:scale-[1.02] transition-transform duration-300">
              <ProductCard title={p.title} imageUrl={p.images?.[0] ?? '/hero.svg'} price={p.price} id={p._id} />

             
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
