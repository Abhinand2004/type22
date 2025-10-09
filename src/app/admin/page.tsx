import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AdminHome() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="heading-display text-3xl">Admin Dashboard</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link href="/admin/products" className="rounded-lg border p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900">Manage Products</Link>
          <Link href="/admin/requests" className="rounded-lg border p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900">Design Requests</Link>
          <Link href="/admin/chats" className="rounded-lg border p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900">Chats</Link>
          <Link href="/admin/site" className="rounded-lg border p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900">Site Content</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}



