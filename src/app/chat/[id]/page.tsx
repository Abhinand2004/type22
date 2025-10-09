"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<{ id: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const s = io({ path: "/api/socket/io" });
    socketRef.current = s;
    s.emit("chat:join", id);
    s.on("chat:recv", (m: { content: string }) => setMessages((prev) => [...prev, { id: String(Date.now()), content: m.content }]));
    return () => { s.disconnect(); };
  }, [id]);

  function send() {
    if (!input.trim()) return;
    socketRef.current?.emit("chat:send", { chatId: id, content: input });
    setMessages((prev) => [...prev, { id: String(Date.now()), content: input }]);
    setInput("");
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="heading-display text-2xl mb-4">Chat</h1>
        <div className="border rounded-lg h-[60vh] p-4 overflow-y-auto space-y-2">
          {messages.map((m) => (
            <div key={m.id} className="rounded-md bg-zinc-100 dark:bg-zinc-900 px-3 py-2 w-fit max-w-[80%]">
              {m.content}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input value={input} onChange={(e)=>setInput(e.target.value)} className="flex-1 rounded-md border bg-transparent px-3 py-2" placeholder="Type a message..." />
          <button onClick={send} className="rounded-md px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black border">Send</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}


