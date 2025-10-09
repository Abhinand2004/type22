"use client";

export default function CustomContent() {
  return (
    <section id="custom" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-24">
      <h2 className="heading-display text-2xl mb-2">Custom Design</h2>
      <p className="text-zinc-600 dark:text-zinc-400">Have an idea? Start a custom request.</p>
      <div className="mt-4">
        <button
          onClick={() => alert("Custom request placeholder")}
          className="rounded-md px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black border"
        >
          Start Custom Request
        </button>
      </div>
    </section>
  );
}
