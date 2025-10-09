import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AdminRequests() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="heading-display text-2xl">Design Requests</h1>
        {/* TODO: Requests list and approval UI. Placeholder list. */}
        <div className="mt-4 rounded-lg border p-6">Requests list placeholder</div>
      </main>
      <Footer />
    </div>
  );
}



