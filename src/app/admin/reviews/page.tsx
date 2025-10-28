import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminReviewsManager from "@/components/AdminReviewsManager";

export default async function AdminReviewsPage() {
  const jar = await cookies();
  const cookie = jar.get("admin_auth");
  const isAuthed = cookie?.value === "1";
  if (!isAuthed) redirect("/admin/login");
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Admin — Reviews</h1>
        <AdminReviewsManager />
      </main>
      <Footer />
    </div>
  );
}
