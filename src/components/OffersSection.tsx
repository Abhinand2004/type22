"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OffersSection() {
  const [open, setOpen] = useState(false);
  const offers = [
    "Buy 2 get 10% off",
    "Free shipping on orders over ₹1499",
    "Limited-run prints — while stocks last",
  ];

  return (
    <section className="mt-10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 transition-all"
      >
        <span className="font-semibold">Display Offers</span>
        <span className={`transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}>▾</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pl-6 pr-4 py-3 space-y-2 text-sm text-gray-300"
          >
            {offers.map((o, i) => (
              <li key={i} className="list-disc">{o}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}
