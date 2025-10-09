"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email || !message) {
      toast.error("Please fill in both fields!");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_o8wrg0c",       // Replace with your EmailJS service ID
        "template_5yi5da6",      // Replace with your EmailJS template ID
        { from_email: email, message },
        "-JEZj09a0G_qA2AqV"        // Replace with your EmailJS public key
      );

      toast.success("Message sent successfully!");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background text-foreground px-4 transition-colors">
      <Toaster position="top-right" reverseOrder={false} />

      <main className="w-full max-w-lg bg-card border border-border backdrop-blur-lg rounded-2xl shadow-lg p-6 space-y-6 transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,200,0,0.15)]">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-sm">
            We’d love to hear from you!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/918590521956"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 transition text-white px-4 py-2 rounded-full text-xs font-medium shadow hover:shadow-md"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href="mailto:abhinandc293@gmail.com"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 transition text-black px-4 py-2 rounded-full text-xs font-medium shadow hover:shadow-md"
          >
            <Mail className="w-4 h-4" /> Email
          </a>
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-5 pt-1">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-muted hover:bg-pink-600/80 transition-all hover:scale-110"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-muted hover:bg-blue-600/80 transition-all hover:scale-110"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-muted hover:bg-red-600/80 transition-all hover:scale-110"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/918590521956"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-muted hover:bg-green-600/80 transition-all hover:scale-110"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        {/* Contact Form */}
        <form
          className="grid gap-3 pt-1"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-input bg-muted/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            placeholder="Your Email"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="rounded-md border border-input bg-muted/40 px-3 py-2 h-20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            placeholder="Message..."
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full flex items-center justify-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold text-sm shadow hover:shadow-[0_0_10px_rgba(255,200,0,0.25)] hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send</>}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} Type22 Design Studio
        </div>
      </main>
    </div>
  );
}
