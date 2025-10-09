"use client";

import { Reveal } from "@/components/Reveal";

export default function Story() {
  return (
    <section id="story" className="mx-auto max-w-7xl px-4 py-16 text-center scroll-mt-24">
      <Reveal>
        <h3 className="heading-display text-3xl">The Type 22 Story</h3>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Born from the pit lane. Designed for the street. We craft apparel that
          celebrates mechanical beauty and driving passion. Each piece is cut and sewn
          with longevity in mind — simple, durable, and timeless.
        </p>
      </Reveal>
    </section>
  );
}
