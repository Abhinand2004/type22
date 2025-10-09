import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SizeGuidePage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <h1 className="heading-display text-3xl">Size Guide</h1>
        <div className="rounded-lg border p-4">{/* Placeholder: Size chart image/table */}</div>
      </main>
      <Footer />
    </div>
  );
}



