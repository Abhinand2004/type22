"use client";

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

type RequestItem = {
  _id: string;
  title: string;
  details?: string;
  referenceImages: string[];
  status: string;
  createdAt: string;
};

export default function AdminRequests() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      setRequests(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this request?')) return;
    try {
      const res = await fetch(`/api/requests/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete request');
    }
  };

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="heading-display text-2xl">Design Requests</h1>

        {loading ? (
          <div className="mt-6 text-sm text-zinc-500">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="mt-6 rounded-lg border p-6">No requests found.</div>
        ) : (
          <div className="mt-6 space-y-4">
            {requests.map((r) => (
              <div key={r._id} className="rounded-lg border p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="text-xs text-zinc-500">{new Date(r.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm px-2 py-1 border rounded text-zinc-700">{r.status}</span>
                    <button onClick={() => handleDelete(r._id)} className="text-sm text-rose-600">Delete</button>
                  </div>
                </div>

                <div className="mt-3 text-sm text-zinc-700">
                  <p><strong>Details:</strong></p>
                  <p className="whitespace-pre-wrap">{r.details ?? '—'}</p>
                </div>

                {r.referenceImages && r.referenceImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {r.referenceImages.map((img, i) => (
                      <div key={i} className="flex flex-col items-stretch gap-2">
                        <div className="relative w-full h-24">
                          <Image src={img} alt={`ref-${i}`} fill className="object-cover rounded" />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                          <a
                            href={img}
                            download={(() => {
                              try {
                                if (img.startsWith('data:')) {
                                  const extMatch = img.match(/data:image\/(\w+);/);
                                  const ext = extMatch ? extMatch[1] : 'png';
                                  return `${r.title.replace(/[^a-z0-9-_]/gi, '_')}_ref_${i}.${ext}`;
                                }
                                const url = new URL(img, window.location.origin);
                                const parts = url.pathname.split('/').filter(Boolean);
                                const last = parts[parts.length - 1] || `ref_${i}`;
                                return `${r.title.replace(/[^a-z0-9-_]/gi, '_')}_${last}`;
                              } catch {
                                return `${r.title.replace(/[^a-z0-9-_]/gi, '_')}_ref_${i}.png`;
                              }
                            })()}
                            className="text-xs px-2 py-1 bg-zinc-800 rounded text-white"
                          >
                            ⬇️ Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}






