import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Type22",
  description: "About Type22 — automotive tshirtbrand in Kerala offering premium car tshirts.",
  keywords: ["type22","automotive tshirtbrand","automotive tshirtbrand in kerala","car tshirts"],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-12">
        {/* Header */}
        <Reveal>
          <h1 className="heading-display text-3xl font-bold text-zinc-800 dark:text-zinc-100">
            About Type 22
          </h1>
        </Reveal>

        {/* Brand Intro */}
        <Reveal>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Every legend begins with a dream, and ours started in a garage filled with grease, grit, and the growl of engines that refused to stay silent.
            <br />
            Type 22 was born for those who find beauty in machines and meaning in motion — the dreamers who build, ride, and race their way toward success.
          </p>
        </Reveal>

        {/* Image Placeholder */}
        <div className="rounded-xl border border-zinc-300 dark:border-zinc-700 h-56 grid place-items-center text-zinc-400 text-sm italic">
          {/* Future: Add brand or workshop imagery here */}
          Brand imagery coming soon
        </div>

        {/* Brand Philosophy */}
        <Reveal>
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            Our Philosophy — Built, Not Bought
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            At Type 22, we believe success is engineered — not handed over. Every design carries the soul of the streets and the spark of ambition. 
            We don’t follow fashion trends; we forge our own lane. Each T-shirt is crafted for those who dream big, race harder, and never settle for stock.
          </p>
        </Reveal>

        {/* Identity Section */}
        <Reveal>
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            For the Ones Who Ride Different
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            This isn’t just clothing — it’s a statement for the go-getters, garage builders, and midnight riders. 
            The ones who know success doesn’t idle — it accelerates. Whether you drive, ride, or chase your goals on foot, your vehicle speaks your success, and your outfit should speak louder.
          </p>
        </Reveal>

        {/* Promise Section */}
        <Reveal>
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            Our Promise
          </h2>
        </Reveal>
        <Reveal>
          <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
            <li>Premium materials designed for comfort, style, and confidence.</li>
            <li>Exclusive, limited-run prints inspired by the spirit of automotive legends.</li>
            <li>Made-to-order craftsmanship — no mass production, just passion.</li>
          </ul>
        </Reveal>

        {/* Closing Section */}
        <Reveal>
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            Join the Ride
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Fuel your passion. Wear your drive. Welcome to Type 22 — where every outfit tells a story of dreams built by hand and driven by heart.
          </p>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
