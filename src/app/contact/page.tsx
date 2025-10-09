

export default function ContactPage() {
  return (
    <div>
   
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="heading-display text-3xl">Contact</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Reach out via WhatsApp or email.
        </p>

        <div className="mt-6 flex gap-3">
          <a
            href={`https://wa.me/`} target="_blank" rel="noreferrer"
            className="rounded-md px-5 py-2.5 bg-green-600 text-white"
          >
            WhatsApp Chat
          </a>
          <a href="mailto:hello@type22.app" className="rounded-md px-5 py-2.5 border">Email Us</a>
        </div>

        <form className="mt-8 grid gap-4 max-w-xl">
          <label className="grid gap-2">
            <span className="text-sm">Your Email</span>
            <input className="rounded-md border bg-transparent px-3 py-2" placeholder="you@example.com" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Message</span>
            <textarea className="rounded-md border bg-transparent px-3 py-2 min-h-32" placeholder="Tell us more..." />
          </label>
          <button type="button" className="rounded-md px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black border">Send</button>
        </form>
      </main>

    </div>
  );
}

// Contact content moved to components/ContactContent.tsx



