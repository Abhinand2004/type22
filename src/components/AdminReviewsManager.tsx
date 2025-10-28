"use client";

import { useEffect, useState } from "react";

type Review = {
  _id: string;
  productId: string;
  username: string;
  content: string;
  createdAt: string;
};

function formatDate(s: string) {
  try { return new Date(s).toLocaleString(); } catch { return s; }
}

export default function AdminReviewsManager() {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!productId.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId.trim())}`, { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as Review[];
      setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      const m = e instanceof Error ? e.message : "Failed to load";
      setError(m);
      setReviews([]);
    } finally { setLoading(false); }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Delete failed");
    }
  }

  useEffect(() => { /* noop */ }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm mb-1">Product ID</label>
          <input
            className="w-full p-2 rounded border border-white/10 bg-white/5"
            placeholder="Enter Product ObjectId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <button onClick={load} disabled={!productId.trim() || loading} className="px-4 py-2 rounded bg-blue-600 disabled:opacity-50">
          {loading ? "Loading..." : "Load Reviews"}
        </button>
      </div>
      {error && <div className="text-sm text-rose-400">{error}</div>}
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r._id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold">{r.username}</div>
              <div className="text-gray-300 text-sm whitespace-pre-wrap break-words">{r.content}</div>
              <div className="text-xs text-gray-500 mt-1">{formatDate(r.createdAt)}</div>
            </div>
            <button onClick={() => onDelete(r._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
          </div>
        ))}
        {!loading && reviews.length === 0 && (
          <div className="text-gray-400">No reviews to show. Enter a Product ID and load.</div>
        )}
      </div>
    </div>
  );
}
