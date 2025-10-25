import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ShippingReturnsPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <h1 className="heading-display text-3xl">Shipping & Returns</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h2 className="font-medium mb-2">Shipping</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{/* Placeholder policy copy */}</p>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="font-medium mb-2">Returns</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{/* Placeholder policy copy */}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}






