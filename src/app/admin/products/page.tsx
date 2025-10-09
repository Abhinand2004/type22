
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
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<P[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (mounted) setProducts(data as P[]);
      } catch (err) {
        console.error(err);
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
  const [colorsText, setColorsText] = useState('black,white');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let images: string[] = [];
      if (file) {
        const r = await toBase64(file);
        images = [r as string];
      }
      const payload = {
        title,
        price,
        description,
        images,
        category,
        sizes: sizesText.split(',').map(s=>s.trim()).filter(Boolean),
        colors: colorsText.split(',').map(c=>c.trim()).filter(Boolean),
      };
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('create failed');
      const created = await res.json();
      onCreated?.(created);
      setTitle(''); setPrice(499); setDescription(''); setFile(null);
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
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <input className="p-2 rounded border" placeholder="Sizes (comma separated)" value={sizesText} onChange={(e) => setSizesText(e.target.value)} />
      <input className="p-2 rounded border" placeholder="Colors (comma separated)" value={colorsText} onChange={(e) => setColorsText(e.target.value)} />
      <textarea className="p-2 rounded border md:col-span-4" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="md:col-span-4">
        <button disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded">Create Product</button>
      </div>
    </form>
  );
}

function toBase64(file: File) {
  return new Promise<string | ArrayBuffer | null>((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}




