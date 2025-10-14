import React from 'react';

export default function Featured() {
  return (
    <section className="w-full py-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 style={{ color: 'var(--accent)' }} className="text-2xl font-bold">Featured</h2>
        <p style={{ color: 'var(--muted)' }} className="mt-2">Featured items will appear here.</p>
      </div>
    </section>
  );
}
