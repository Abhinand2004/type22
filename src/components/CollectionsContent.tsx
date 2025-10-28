"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import FiltersBar from "@/components/FiltersBar";

type DBProduct = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  category?: 'tshirt' | 'hoodie';
  theme?: 'car' | 'bike' | 'none';
  brand?: string;
};

export default function CollectionsContent() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [inViewTrigger, setInViewTrigger] = useState(0);
  const [theme, setTheme] = useState<'all' | 'car' | 'bike' | 'none'>('all');
  const [brand, setBrand] = useState<string>('All');
  const carBrands = ['BMW','Mercedes','Audi','Porsche','Lamborghini','Ferrari','Toyota','Honda','Ford'];
  const bikeBrands = ['Yamaha','Kawasaki','Ducati','Honda','Royal Enfield','KTM','Suzuki'];
  const [category, setCategory] = useState<'all' | 'tshirt' | 'hoodie'>('all');
  const [color, setColor] = useState<'all' | 'black' | 'white' | 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'gray' | 'navy'>('all');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (mounted) setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInViewTrigger((p) => p + 1);
      },
      { threshold: 0.2 }
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Client-side filtering based on product fields
  const visibleProducts = products.filter((p) => {
    // Theme filter
    if (theme !== 'all') {
      if (theme === 'none') {
        if ((p.theme ?? 'none') !== 'none') return false;
      } else {
        if (p.theme !== theme) return false;
      }
    }
    // Brand filter (only when theme is car/bike)
    if ((theme === 'car' || theme === 'bike') && brand !== 'All') {
      if ((p.brand || '') !== brand) return false;
    }
    // Category filter
    if (category !== 'all') {
      if (p.category !== category) return false;
    }
    // Color filter
    if (color !== 'all') {
      const colors = Array.isArray(p.colors) ? p.colors.map((c)=>c.toLowerCase()) : [];
      if (!colors.includes(color)) return false;
    }
    return true;
  });

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="mx-auto max-w-7xl px-4 py-12 sm:py-14 md:py-16 scroll-mt-24"
    >
      {/* Header */}
      <motion.div
        key={`header-${inViewTrigger}`}
        className="text-center mb-12 space-y-3"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent">
          Automotive Apparel Collection
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Wear What You Love. Drive What You Dream.
        </p>
        <div className="mx-auto w-24 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"></div>
      </motion.div>

      {/* Filters */}
      <FiltersBar
        theme={theme}
        onChangeTheme={(v)=>{ setTheme(v); setBrand('All'); }}
        brand={brand}
        onChangeBrand={setBrand}
        brandOptions={theme === 'car' ? carBrands : theme === 'bike' ? bikeBrands : []}
        category={category}
        onChangeCategory={setCategory}
        color={color}
        onChangeColor={setColor}
      />

      {/* Loading */}
      {loading ? (
        <div className="text-center text-sm text-zinc-500">Loading...</div>
      ) : (
        <>
          {/* Product Grid */}
          <motion.div
            key={`grid-${inViewTrigger}`}
            className="
              grid gap-5 sm:gap-6 lg:gap-8
              grid-cols-2  // ✅ two columns on small screens
              md:grid-cols-3 lg:grid-cols-4
            "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {visibleProducts.map((p) => (
              <motion.div
                key={p._id + inViewTrigger}
                className="flex flex-col items-center bg-transparent rounded-xl cursor-pointer will-change-transform"
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <ProductCard
                  title={p.title}
                  imageUrl={p.images?.[0] ?? "/images/logo.png"}
                  price={p.price}
                  id={p._id}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Removed Show More button to display all products */}
        </>
      )}
    </section>
  );
}
