"use client";

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';

type DBProduct = {
  _id: string;
  title: string;
  price: number;
  images?: string[];
  sizes?: string[];
};

export default function CollectionsPage() {
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
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--accent)' }}>All Collections</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Browse all products</p>
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
