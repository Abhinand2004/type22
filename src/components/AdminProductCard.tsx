"use client";

import Image from 'next/image';
import { useState } from 'react';

type Product = {
  _id?: string;
  title: string;
  description?: string;
  price: number;
  images?: (string | File)[];
  colors?: string[];
  sizes?: string[];
  material?: string;
  discount?: number;
  sizeChart?: string;
};

export type AdminProduct = Product;

export default function AdminProductCard({ product: initial, onDeleted, onUpdated }: { product: Product; onDeleted?: (id?: string) => void; onUpdated?: (p: Product) => void; }) {
  const [editing, setEditing] = useState(false);
  const [product, setProduct] = useState<Product>(initial);
  const [uploading, setUploading] = useState(false);

  async function handleDelete() {
    if (!product._id) {
      // local-only sample: just notify parent
      onDeleted?.(product._id);
      return;
    }
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${product._id}`, { method: 'DELETE' });
    if (res.ok) {
      onDeleted?.(product._id);
    } else {
      alert('Failed to delete');
    }
  }

  async function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
  setUploading(true);
  const payload: Record<string, unknown> = { ...product } as Record<string, unknown>;
    // If local image data is a File object in images[0], convert to base64
    if (product.images && product.images[0] instanceof File) {
      const file = product.images[0] as File;
      const b64 = (await toBase64(file)) as string;
      (payload as unknown as { images: string[] }).images = [b64];
    }

    try {
      if (product._id) {
        const res = await fetch(`/api/products/${product._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('update failed');
        const updated = await res.json();
        setProduct(updated);
        onUpdated?.(updated);
      } else {
        const res = await fetch(`/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('create failed');
        const created = await res.json();
        setProduct(created);
        onUpdated?.(created);
      }
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save product');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-lg border p-4 bg-white/5">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="h-44 w-full relative rounded overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          {product.images && product.images[0] ? (
            (() => {
              const first = product.images![0];
              let src: string;
              if (typeof first === 'string') src = first;
              else src = URL.createObjectURL(first as File);
              return <Image src={src} alt={product.title} fill className="object-cover" />;
            })()
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-zinc-500">No image</div>
          )}
        </div>

        <div className="md:col-span-2">
          {!editing ? (
            <>
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-sm text-zinc-500">{product.description}</p>
              <div className="mt-2 flex gap-3 items-center">
                <div className="font-semibold">₹{product.price}</div>
                {product.discount ? <div className="text-sm text-rose-500">{product.discount}% off</div> : null}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1 rounded bg-amber-600 text-white" onClick={() => setEditing(true)}>Edit</button>
                <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={handleDelete}>Delete</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSave} className="flex flex-col gap-2">
              <input value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} className="p-2 rounded border" />
              <textarea value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} className="p-2 rounded border" />
              <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} className="p-2 rounded border" />
              <input type="file" onChange={(e) => setProduct({ ...product, images: e.target.files ? [e.target.files[0]] : [] })} />
              <div className="flex gap-2 mt-2">
                <button disabled={uploading} className="px-3 py-1 rounded bg-green-600 text-white">Save</button>
                <button type="button" onClick={() => setEditing(false)} className="px-3 py-1 rounded bg-zinc-300">Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
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
