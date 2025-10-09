"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const router = useRouter();

  const pathname = usePathname();

  // Links correspond to sections on the current page or their own pages
  const links = [
    { name: "Home", id: "home", path: "/" },
    { name: "Featured", id: "featured" },
    { name: "Story", id: "story" },
    { name: "Collections", id: "collections" },
    { name: "Custom", id: "custom" },
    { name: "Contact", id: "contact" },
    // These have their own pages — include a `path` to navigate when the section
    // isn't present on the current page.
    { name: "FAQ", id: "faq", path: "/faq" },
    { name: "Size Guide", id: "size-guide", path: "/size-guide" },
    { name: "Shipping/Returns", id: "shipping-returns", path: "/shipping-returns" },
  ];

  const handleNavigate = (link: { id?: string; path?: string; name?: string }) => {
    // If Home link and we're already on the homepage, scroll to top
    if (link.path === "/" && pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false);
      return;
    }

    const element = link.id ? document.getElementById(link.id) : null;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
      return;
    }

    // If the element isn't found, navigate to the page route (if provided)
    if (link.path) {
      setOpen(false);
      router.push(link.path);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/20 dark:bg-black/30 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo/Home Link */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <motion.span
              className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white futuristic-text">
              Type 22
            </span>
          </div>
        
          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop Links */}
            <nav className="hidden sm:flex items-center gap-3 md:gap-4">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigate(link)}
                  className="hover:opacity-80 transition-all duration-300 futuristic-button"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="sm:hidden mt-3 rounded-lg border border-gray-300 dark:border-gray-600 p-3 grid gap-2 bg-white/10 dark:bg-black/20 backdrop-blur"
            >
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigate(link)}
                  className="py-1 text-left hover:opacity-80 transition-all duration-200 futuristic-button"
                >
                  {link.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}


