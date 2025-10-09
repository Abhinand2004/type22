"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto h-100% px-4 pt-16 pb-20 grid  md:grid-cols-2 items-center bg-cover bg-center bg-no-repeat rounded-2xl"
      
    >
      <div className="space-y-6 p-6 rounded-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Type 22</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-prose">
          Minimal, premium apparel inspired by the world of performance machinery.
        </p>
        <div className="flex gap-3">
          <a
            href="#collections"
            className="rounded-md px-5 py-3 bg-black text-white hover:bg-zinc-800 transition"
          >
            Shop Collections
          </a>
          <a
            href="#custom"
            className="rounded-md px-5 py-3 border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Custom Request
          </a>
        </div>
      </div>

      <img
        src="/images/home.png"
        alt="Premium apparel"
        className="w-full h-100 rounded-2xl"
      />
    </section>
  );
}
