import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AdminSite() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="heading-display text-2xl">Site Content</h1>
        {/* TODO: Banners, about section, featured products management */}
        <div className="mt-4 rounded-lg border p-6">Site content editor placeholder</div>
      </main>
      <Footer />
    </div>
  );
}






