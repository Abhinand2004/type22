"use client";

import { useState } from "react";
import Image from "next/image";

export type VehicleRecognitionResult = {
  detected?: boolean;
  make?: string | null;
  model?: string | null;
  body_type?: string | null;
  color?: string | null;
  approx_year?: string | null;
  confidence?: number | null;
  notes?: string | null;
};

export default function VehicleRecognizer({ onRecognized }: { onRecognized?: (res: VehicleRecognitionResult, previewUrl?: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [raw, setRaw] = useState<string | null>(null);
  const [result, setResult] = useState<VehicleRecognitionResult | null>(null);

  function onPick(f?: File | null) {
    if (!f) return;
    if (!f.type.startsWith("image/")) { setError("Please select an image file."); return; }
    setError(null);
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setRaw(null);
    setResult(null);
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch("/api/vision/vehicle", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        const detail = typeof data?.detail === 'string' ? data.detail : JSON.stringify(data?.detail || {});
        const msg = data?.error ? `${data.error}${detail ? ` — ${detail}` : ''}` : "Recognition failed";
        throw new Error(msg);
      }
      const rawText = typeof data?.raw === "string" ? data.raw : null;
      setRaw(rawText);
      const parsed = (data?.result ?? null) as VehicleRecognitionResult | null;
      setResult(parsed);
      if (parsed && onRecognized) {
        onRecognized(parsed, preview || undefined);
      } else if (!parsed && onRecognized) {
        onRecognized(
          {
            detected: false,
            notes: rawText ? "Could not parse details from AI response." : "No result returned from AI.",
          },
          preview || undefined
        );
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      if (onRecognized) {
        onRecognized({ detected: false, notes: msg }, preview || undefined);
      }
    } finally { setLoading(false); }
  }

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
      <h3 className="text-lg font-semibold mb-3">Vehicle Recognizer (Gemini)</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="flex items-center gap-3">
          <label className="cursor-pointer inline-flex items-center px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPick(e.target.files?.[0] || null)}
            />
            <span>Select Image</span>
          </label>
          <button
            type="submit"
            disabled={!file || loading}
            className="px-4 py-2 rounded-xl bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          {file && (
            <button type="button" className="text-sm text-gray-400 underline" onClick={() => { setFile(null); setPreview(null); setResult(null); setRaw(null); }}>Clear</button>
          )}
        </div>
        {preview && (
          <div className="mt-2">
            <div className="relative w-full max-w-sm h-56 overflow-hidden rounded-lg border border-white/10">
              <Image src={preview} alt="preview" fill className="object-cover" />
            </div>
          </div>
        )}
        {error && <div className="text-sm text-rose-400">{error}</div>}
        {result && (
          <div className="mt-3 text-sm space-y-1">
            <div className="text-gray-300">Detected: <span className="font-medium">{String(result.detected ?? false)}</span></div>
            <div className="text-gray-300">Make: <span className="font-medium">{result.make || "-"}</span></div>
            <div className="text-gray-300">Model: <span className="font-medium">{result.model || "-"}</span></div>
            <div className="text-gray-300">Body Type: <span className="font-medium">{result.body_type || "-"}</span></div>
            <div className="text-gray-300">Color: <span className="font-medium">{result.color || "-"}</span></div>
            <div className="text-gray-300">Approx Year: <span className="font-medium">{result.approx_year || "-"}</span></div>
            {typeof result.confidence === 'number' && (
              <div className="text-gray-300">Confidence: <span className="font-medium">{Math.round((result.confidence ?? 0) * 100)}%</span></div>
            )}
            {result.notes && <div className="text-gray-400">Notes: {result.notes}</div>}
          </div>
        )}
        {raw && (
          <details className="mt-2 text-xs text-gray-400">
            <summary className="cursor-pointer">Raw</summary>
            <pre className="whitespace-pre-wrap break-words mt-1">{raw}</pre>
          </details>
        )}
      </form>
    </div>
  );
}
