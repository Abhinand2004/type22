"use client";

import { useEffect, useState } from 'react';
import AdminProductCard, { AdminProduct } from '@/components/AdminProductCard';

type P = {
  _id?: string;
  title: string;
  description?: string;
  price: number;
  images?: (string | File)[];
  category?: 'tshirt' | 'hoodie';
  sizes?: string[];
  colors?: string[];
  material?: string;
  discount?: number;
  sizeChart?: string;
  createdAt?: string;
  theme?: 'car' | 'bike' | 'none';
  brand?: string;
  originalPrice?: number;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<P[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          const msg = await res.text().catch(() => 'Failed to fetch');
          console.error('Fetch /api/products failed:', msg);
          if (mounted) {
            setError(msg || 'Failed to fetch products');
            setProducts([]);
          }
        } else {
          const data = await res.json();
          if (mounted) setProducts((data || []) as P[]);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch products';
        console.error('/api/products error:', err);
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  function handleDeleted(id?: string) {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  function handleUpdated(updated: P) {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p._id && updated._id && p._id === updated._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      }
      return [updated, ...prev];
    });
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Admin — Products (DB)</h1>

        <section className="mb-8">
          <h2 className="font-semibold mb-3">Add New Product</h2>
          <AddNewProduct onCreated={(p) => setProducts((s) => [p, ...s])} />
        </section>

        {loading ? <div className="text-sm text-zinc-500">Loading products...</div> : null}
        {error ? <div className="mt-2 text-sm text-rose-400">{error}</div> : null}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {products.map((p) => (
            <AdminProductCard key={p._id} product={p as unknown as AdminProduct} onDeleted={handleDeleted} onUpdated={handleUpdated} />
          ))}
        </div>
      </main>
    </div>
  );
}

function AddNewProduct({ onCreated }: { onCreated?: (p: P) => void }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(499);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'tshirt'|'hoodie'>('tshirt');
  const [sizesText, setSizesText] = useState('S,M,L');
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState<'car'|'bike'|'none'>('none');
  const [brand, setBrand] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  useEffect(() => {
    // Auto set base price on category change
    if (category === 'tshirt') setPrice(499);
    else if (category === 'hoodie') setPrice(899);
  }, [category]);

  useEffect(() => {
    // Auto compute price from originalPrice and discount
    if (typeof originalPrice === 'number' && Number.isFinite(originalPrice)) {
      const computed = Math.max(0, Math.round(originalPrice * (1 - (discountPercent || 0) / 100)));
      if (Number.isFinite(computed)) setPrice(computed);
    }
  }, [originalPrice, discountPercent]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let images: string[] = [];
      if (files.length) {
        const uploaded: string[] = [];
        for (const f of files) {
          const fd = new FormData();
          fd.append('file', f);
          const up = await fetch('/api/uploads', { method: 'POST', body: fd });
          if (!up.ok) {
            let detail: unknown = undefined;
            try {
              const maybeJson: unknown = await up.json();
              if (typeof maybeJson === 'object' && maybeJson !== null && 'detail' in maybeJson) {
                const withDetail = maybeJson as { detail?: unknown };
                detail = withDetail.detail ?? maybeJson;
              } else {
                detail = maybeJson;
              }
            } catch {
              try { detail = await up.text(); } catch { /* noop */ }
            }
            console.error('Upload failed', detail);
            throw new Error('Image upload failed');
          }
          const upJson = (await up.json()) as { url?: string };
          if (!upJson.url) throw new Error('No URL from upload');
          uploaded.push(upJson.url);
        }
        images = uploaded;
      }
      const payload = {
        title,
        price,
        description,
        images,
        category,
        sizes: sizesText.split(',').map(s=>s.trim()).filter(Boolean),
        colors: selectedColor ? [selectedColor] : [],
        theme: theme,
        brand: brand || undefined,
        originalPrice: typeof originalPrice === 'number' ? originalPrice : undefined,
        discount: discountPercent || undefined,
      };
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('create failed');
      const created = await res.json();
      onCreated?.(created);
      setTitle(''); setPrice(499); setDescription(''); setFiles([]);
      setTheme('none'); setBrand(''); setSelectedColor('black'); setOriginalPrice(''); setDiscountPercent(0);
    } catch (err) {
      console.error(err);
      alert('Failed to create');
    } finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleCreate} className="grid md:grid-cols-4 gap-3 items-end">
      <input className="p-2 rounded border" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="number" className="p-2 rounded border" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <select value={category} onChange={(e) => setCategory(e.target.value as 'tshirt'|'hoodie')} className="p-2 rounded border">
        <option value="tshirt">T-Shirt</option>
        <option value="hoodie">Hoodie</option>
      </select>
      <input multiple type="file" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
      <input className="p-2 rounded border" placeholder="Sizes (comma separated)" value={sizesText} onChange={(e) => setSizesText(e.target.value)} />
      <div className="flex flex-col gap-2">
        <label className="text-sm">Color</label>
        <div className="flex flex-wrap gap-2 text-xs">
          {['black','white','red','blue','green','yellow','purple','pink','gray','navy'].map((c) => {
            const isSel = selectedColor === c;
            return (
              <button
                type="button"
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`px-2 py-1 rounded border ${isSel ? 'bg-blue-600 text-white' : 'bg-white/5'}`}
              >{c}</button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm">Type</label>
        <select className="p-2 rounded border" value={theme} onChange={(e)=>{ setTheme(e.target.value as 'car'|'bike'|'none'); setBrand(''); }}>
          <option value="none">None</option>
          <option value="car">Car T-Shirt/Hoodie</option>
          <option value="bike">Bike T-Shirt/Hoodie</option>
        </select>
      </div>
      {theme !== 'none' && (
        <div className="flex flex-col gap-2">
          <label className="text-sm">Brand</label>
          <select className="p-2 rounded border" value={brand} onChange={(e)=>setBrand(e.target.value)}>
            <option value="">Select brand</option>
            {(theme === 'car'
              ? ['BMW','Mercedes','Audi','Porsche','Lamborghini','Ferrari','Toyota','Honda','Ford']
              : ['Yamaha','Kawasaki','Ducati','Honda','Royal Enfield','KTM','Suzuki']
            ).map(b => (<option key={b} value={b}>{b}</option>))}
          </select>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="text-sm">Original Price</label>
        <input type="number" className="p-2 rounded border" placeholder="e.g. 999" value={originalPrice as number | ''} onChange={(e)=> setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm">Discount %</label>
        <input type="number" className="p-2 rounded border" placeholder="e.g. 20" value={discountPercent} onChange={(e)=> setDiscountPercent(Number(e.target.value))} />
      </div>
      <textarea className="p-2 rounded border md:col-span-4" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="md:col-span-4">
        <button disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded">Create Product</button>
      </div>
    </form>
  );
}

