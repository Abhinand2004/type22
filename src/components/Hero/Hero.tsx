"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto max-w-7xl px-4 pt-16 pb-20 grid md:grid-cols-2 items-center gap-8"
    >
      {/* Text Content */}
      <div className="space-y-6 p-4 sm:p-6 md:p-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          For Those Who Feel Alive Behind the Wheel.
        </h1>
        <p className="text-lg text-zinc-300 dark:text-zinc-400 max-w-prose">
          Minimal, premium apparel inspired by the world of performance machinery.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#collections"
            className="rounded-md px-5 py-3  bg-blue-500 hover:bg-blue-600 transition"
          >
            <span className="text-white">Shop Collections</span>
          </a>
          <a
            href="#custom"
            className="rounded-md px-5 py-3 border border-blue-500 text-white hover:bg-blue-500/10 transition"
          >
            Custom Request
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center md:justify-end">
        <img
          src="/images/home.png"
          alt="Premium apparel"
          className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}
