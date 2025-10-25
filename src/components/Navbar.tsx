"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], display: "swap" });

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const links = [
    { name: "Home", id: "home", path: "/" },
    { name: "Collections", id: "collections", path: "/collections" },
    { name: "Custom", path: "/custom" },
    { name: "About", path: "/about" },
    { name: "Contact", id: "contact" },
  ];

  const features = [
    { name: "FAQ", path: "/faq" },
    { name: "Size Guide", path: "/size-guide" },
  ];

  const handleNavigate = (link: { name: string; id?: string; path?: string }) => {
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
    <header className={`${orbitron.className} sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-black via-[#010a18] to-[#001530] border-b border-blue-500/20 shadow-[0_0_20px_rgba(0,180,255,0.3)]`}>
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </div>

          {/* Desktop Links */}
          <nav className="hidden sm:flex items-center gap-6">
            {links.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavigate(link)}
                whileHover={{
                  scale: 1.08,
                  textShadow: "0px 0px 10px #00baff",
                  color: "#00baff",
                }}
                transition={{ duration: 0.25 }}
                className="text-white font-rajdhani text-lg tracking-wider uppercase"
              >
                {link.name}
              </motion.button>
            ))}

            {/* Features Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{
                  scale: 1.08,
                  textShadow: "0px 0px 10px #00baff",
                  color: "#00baff",
                }}
                onClick={() => setFeaturesOpen((v) => !v)}
                className="flex items-center gap-1 text-white font-rajdhani text-lg uppercase tracking-wider"
              >
                Features <ChevronDown size={16} />
              </motion.button>

              <AnimatePresence>
                {featuresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-48 bg-black/90 border border-blue-500/40 rounded-lg shadow-lg backdrop-blur-md"
                  >
                    {features.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavigate(item)}
                        className="block w-full text-left px-4 py-2 text-white hover:text-blue-400 hover:bg-blue-500/10 font-rajdhani text-base tracking-wide transition-all"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="text-white hover:text-blue-400 transition-all"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="sm:hidden mt-3 rounded-lg border border-blue-500/30 p-3 grid gap-2 bg-black/60 backdrop-blur-md"
            >
              {[...links, ...features].map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigate(link)}
                  className="py-2 text-left text-white font-rajdhani text-base uppercase tracking-wider hover:text-blue-400 transition-all"
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
