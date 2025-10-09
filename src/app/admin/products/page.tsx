import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AdminProducts() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="heading-display text-2xl">Manage Products</h1>
        {/* TODO: Product CRUD UI goes here. Placeholder list/table. */}
        <div className="mt-4 rounded-lg border p-6">Product table placeholder</div>
      </main>
      <Footer />
    </div>
  );
}



