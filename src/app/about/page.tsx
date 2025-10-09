import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-12">
        <Reveal>
          <h1 className="heading-display text-3xl">About Type 22</h1>
        </Reveal>
        <Reveal>
          <p className="text-zinc-600 dark:text-zinc-400">
            Type 22 is a premium automotive apparel brand. {/* Placeholder: Insert brand imagery */}
          </p>
        </Reveal>
        <div className="rounded-xl border h-48 grid place-items-center">{/* Placeholder: Future image block */}</div>
      </main>
      <Footer />
    </div>
  );
}



