import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function FAQPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        <h1 className="heading-display text-3xl">FAQ</h1>
        <Reveal>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">What sizes do you offer?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">XS–XXL. See Size Guide.</div>
          </details>
        </Reveal>
        <Reveal delay={0.05}>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">Do you ship internationally?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Yes, worldwide shipping.</div>
          </details>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}



