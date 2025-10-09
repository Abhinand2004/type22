import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full gold-gradient" />
            <span className="font-semibold">Type 22</span>
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Automotive-inspired apparel. Minimal. Bold. Premium.
          </p>
        </div>
        <div>
          <div className="font-medium mb-2">Links</div>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/collections">Collections</Link>
            <Link href="/custom">Custom Request</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div>
          <div className="font-medium mb-2">Follow</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">@type22apparel</div>
        </div>
      </div>
      <div className="text-center py-4 text-xs text-zinc-500">© {new Date().getFullYear()} Type 22</div>
    </footer>
  );
}


