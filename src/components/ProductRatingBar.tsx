"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Summary = {
  counts: Record<number, number>;
  total: number;
  average: number;
  userRating: number | null;
};

function makeClientId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ProductRatingBar({ productId }: { productId: string }) {
  const [clientId, setClientId] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const avgText = useMemo(() => {
    if (!summary) return "0.0";
    return summary.average.toFixed(1);
  }, [summary]);

  useEffect(() => {
    const key = "type22_client_id";
    try {
      let cid = localStorage.getItem(key) || "";
      if (!cid) {
        cid = makeClientId();
        localStorage.setItem(key, cid);
      }
      setClientId(cid);
      const c = localStorage.getItem("type22_rating_collapsed");
      setCollapsed(c === "1");
    } catch {
      setClientId("");
    }
  }, []);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const q = new URLSearchParams({ productId });
      if (clientId) q.set("clientId", clientId);
      const res = await fetch(`/api/ratings?${q.toString()}`, { cache: "no-store" });
      const data = (await res.json()) as Summary;
      setSummary(data);
    } catch (e) {
      console.error(e);
      setSummary({ counts: {1:0,2:0,3:0,4:0,5:0}, total: 0, average: 0, userRating: null });
    } finally { setLoading(false); }
  }, [productId, clientId]);

  useEffect(() => { if (productId) load(); }, [productId, clientId, load]);

  async function onRate(stars: number) {
    if (submitting) return;
    try {
      setSubmitting(true);
      await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, stars, clientId }),
      });
      await load();
    } catch (e) {
      console.error(e);
    } finally { setSubmitting(false); }
  }

  function Star({ filled, onClick }: { filled: boolean; onClick: () => void }) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={filled ? "Filled star" : "Empty star"}
        className={`transition-transform ${!submitting ? 'hover:scale-110' : ''}`}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
        </svg>
      </button>
    );
  }

  const userRating = summary?.userRating ?? null;

  return (
    <div className="lg:col-span-2 mt-12">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold">{avgText}</div>
            <div className="text-sm text-gray-400">{summary?.total || 0} votes</div>
          </div>
          <div className="flex items-center gap-3">
            {userRating && <div className="text-xs text-gray-400">Your rating: {userRating}★</div>}
            <button
              type="button"
              onClick={() => {
                setCollapsed((v) => {
                  const next = !v;
                  try { localStorage.setItem("type22_rating_collapsed", next ? "1" : "0"); } catch {}
                  return next;
                });
              }}
              className="text-xs px-2 py-1 rounded border border-white/10 hover:bg-white/10"
              aria-expanded={!collapsed}
            >
              {collapsed ? "Expand" : "Minimize"}
            </button>
          </div>
        </div>
        {!collapsed && (
          <>
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} filled={(userRating ?? 0) >= s} onClick={() => onRate(s)} />
              ))}
            </div>
            {!loading && summary && (
              <div className="mt-4 space-y-1 text-sm">
                {[5,4,3,2,1].map((s) => {
                  const count = summary.counts[s] || 0;
                  const pct = summary.total ? Math.round((count / summary.total) * 100) : 0;
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <div className="w-12 text-right text-gray-400">{s}★</div>
                      <div className="flex-1 h-2 rounded bg-white/10 overflow-hidden">
                        <div className="h-2 bg-yellow-400" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="w-12 text-gray-400 text-right">{count}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
