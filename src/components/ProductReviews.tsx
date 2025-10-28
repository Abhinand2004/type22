"use client";

import { useEffect, useMemo, useState } from "react";

type Review = {
  _id: string;
  productId: string;
  username: string;
  content: string;
  createdAt: string;
};

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [clientId, setClientId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const canSubmit = useMemo(() => username.trim() && content.trim(), [username, content]);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`, { cache: "no-store" });
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // initialize clientId per device using localStorage
    try {
      const key = "type22_client_id";
      let cid = localStorage.getItem(key) || "";
      if (!cid) {
        cid = Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem(key, cid);
      }
      setClientId(cid);
    } catch {}
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, username: username.trim(), content: content.trim(), clientId }),
      });
      if (res.status === 409) {
        const msg = await res.json().catch(() => ({ error: "You already reviewed this product." }));
        setError(typeof msg?.error === "string" ? msg.error : "You already reviewed this product.");
        return;
      }
      if (!res.ok) throw new Error("Failed to post review");
      setUsername("");
      setContent("");
      await load();
    } catch (e) {
      console.error(e);
      setError("Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="lg:col-span-2 mt-12">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      <form onSubmit={submit} className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500 outline-none"
            maxLength={50}
            required
          />
          <div className="md:col-span-2">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your review..."
              className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500 outline-none"
              maxLength={1000}
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting || !canSubmit}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Review"}
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {error && <div className="text-rose-400 text-sm">{error}</div>}
        {loading && <div className="text-gray-400">Loading reviews...</div>}
        {!loading && reviews.length === 0 && (
          <div className="text-gray-400">No reviews yet. Be the first to review!</div>
        )}
        {reviews.map((r) => (
          <div key={r._id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-semibold">{r.username}</div>
            <div className="text-gray-300 text-sm whitespace-pre-wrap break-words">{r.content}</div>
            <div className="text-xs text-gray-500 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
