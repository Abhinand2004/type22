import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AdminChats() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="heading-display text-2xl">Chats</h1>
        {/* TODO: Chat list and links to chat rooms */}
        <div className="mt-4 rounded-lg border p-6 flex flex-col gap-2">
          <Link className="underline" href="/chat/demo-chat">Open Demo Chat</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}



