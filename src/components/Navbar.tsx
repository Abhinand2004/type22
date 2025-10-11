"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { name: "Home", id: "home", path: "/" },
    { name: "Collections", id: "collections" },
    { name: "Custom", id: "custom" },
    { name: "Contact", id: "contact" },
  ];

  const features = [
    { name: "FAQ", path: "/faq" },
    { name: "Size Guide", path: "/size-guide" },
    { name: "Shipping/Returns", path: "/shipping-returns" },
  ];

  const handleNavigate = (link: { id?: string; path?: string; name?: string }) => {
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

    if (link.path) {
      setOpen(false);
      router.push(link.path);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/20 dark:bg-black/30 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={40}
              priority
              className="object-contain h-10 w-auto"
            />
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

              {/* Features Dropdown (desktop) */}
              <div className="relative">
                <button
                  className="flex items-center gap-1 hover:opacity-80 transition-all duration-300 futuristic-button"
                  onClick={() => setFeaturesOpen((v) => !v)}
                >
                  Features <ChevronDown size={16} />
                </button>
                {featuresOpen && (
                  <div className="absolute mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                    {features.map((item) => (
                      <button
                        key={item.name}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => handleNavigate(item)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

              {features.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item)}
                  className="py-1 text-left hover:opacity-80 transition-all duration-200 futuristic-button"
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
