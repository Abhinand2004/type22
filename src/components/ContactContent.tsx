"use client";

export default function ContactContent() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-24">
      <h2 className="heading-display text-2xl mb-2">Contact</h2>
      <p className="text-zinc-600 dark:text-zinc-400">Questions? Reach out via WhatsApp or email.</p>
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => alert("Contact placeholder")}
          className="rounded-md px-5 py-2.5 border text-center"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
