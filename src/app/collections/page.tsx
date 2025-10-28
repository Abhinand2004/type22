"use client";

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import FiltersBar from '@/components/FiltersBar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type DBProduct = {
  _id: string;
  title: string;
  price: number;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  category?: 'tshirt' | 'hoodie';
  theme?: 'car' | 'bike' | 'none';
  brand?: string;
};

export default function CollectionsPage() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'all' | 'car' | 'bike' | 'none'>('all');
  const [brand, setBrand] = useState<string>('All');
  const carBrands = ['BMW', 'Mercedes', 'Audi', 'Porsche', 'Lamborghini', 'Ferrari', 'Toyota', 'Honda', 'Ford'];
  const bikeBrands = ['Yamaha', 'Kawasaki', 'Ducati', 'Honda', 'Royal Enfield', 'KTM', 'Suzuki'];
  const allBrands = Array.from(new Set([...carBrands, ...bikeBrands]));
  const [category, setCategory] = useState<'all' | 'tshirt' | 'hoodie'>('all');
  const [color, setColor] = useState<'all' | 'black' | 'white' | 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'gray' | 'navy'>('all');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  // Initialize from URL
  useEffect(() => {
    if (!searchParams) return;
    const themeParam = searchParams.get('theme');
    const brandParam = searchParams.get('brand');
    const categoryParam = searchParams.get('category');
    const colorParam = searchParams.get('color');
    const allowedTheme = ['all', 'car', 'bike', 'none'] as const;
    const allowedCategory = ['all', 'tshirt', 'hoodie'] as const;
    const allowedColor = ['all', 'black', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'gray', 'navy'] as const;
    if (themeParam && (allowedTheme as readonly string[]).includes(themeParam)) setTheme(themeParam as 'all' | 'car' | 'bike' | 'none');
    if (brandParam) setBrand(brandParam);
    if (categoryParam && (allowedCategory as readonly string[]).includes(categoryParam)) setCategory(categoryParam as 'all' | 'tshirt' | 'hoodie');
    if (colorParam && (allowedColor as readonly string[]).includes(colorParam)) setColor(colorParam as 'all' | 'black' | 'white' | 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'gray' | 'navy');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync to URL when changes
  useEffect(() => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('theme', theme);
    if (theme === 'car' || theme === 'bike') params.set('brand', brand); else params.delete('brand');
    params.set('category', category);
    params.set('color', color);
    router.replace(`${pathname}?${params.toString()}`);
  }, [theme, brand, category, color, router, pathname, searchParams]);

  const filtered = products.filter((p) => {
    if (theme !== 'all') {
      if (theme === 'none') {
        if ((p.theme ?? 'none') !== 'none') return false;
      } else {
        if (p.theme !== theme) return false;
      }
    }
    // Brand filter: apply whenever a specific brand is selected
    if (brand !== 'All') {
      if ((p.brand || '') !== brand) return false;
    }
    if (category !== 'all') {
      if (p.category !== category) return false;
    }
    if (color !== 'all') {
      const colors = Array.isArray(p.colors) ? p.colors.map((c) => c.toLowerCase()) : [];
      if (!colors.includes(color)) return false;
    }
    return true;
  });

  const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const cardVariants: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent">Collections</h1>
        <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-400">Browse all products and refine with filters.</p>
        <div className="mx-auto mt-3 w-20 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full" />
        <div className="mt-3 text-xs text-zinc-500">{filtered.length} result{filtered.length === 1 ? '' : 's'}</div>
      </div>

      <FiltersBar
        theme={theme}
        onChangeTheme={(v) => { setTheme(v); setBrand('All'); }}
        brand={brand}
        onChangeBrand={setBrand}
        brandOptions={theme === 'car' ? carBrands : theme === 'bike' ? bikeBrands : allBrands}
        category={category}
        onChangeCategory={setCategory}
        color={color}
        onChangeColor={setColor}
      />

      {loading ? (
        <div className="text-center text-sm text-zinc-500">Loading...</div>
      ) : (
        <motion.div
          className="grid gap-6 sm:gap-7 lg:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((p) => (
            <motion.div
              key={p._id}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex flex-col items-center rounded-xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/40 transition-all duration-300"
            >
              <ProductCard title={p.title} imageUrl={p.images?.[0] ?? '/hero.svg'} price={p.price} id={p._id} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
