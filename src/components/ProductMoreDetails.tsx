"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

type ProductMoreDetailsProps = {
  material?: string;
  sizeChart?: string;
  description?: string;
};

type DetailCard = {
  id: string;
  title: string;
  content: string[];
  accent: string;
};

export default function ProductMoreDetails({
  material,
  sizeChart,
  description,
}: ProductMoreDetailsProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const cards: DetailCard[] = [
    {
      id: "description",
      title: "Product Details",
      accent: "text-blue-400",
      content: [
        description ||
          "Designed for automotive enthusiasts who live and breathe motion. Each piece is cut with precision to deliver a premium silhouette that merges comfort with confidence.",
        "Features reinforced stitching, a soft-touch interior, and fade-resistant prints to ensure lasting quality.",
        "Engineered to match the vibe of track days, late-night drives, and everything in between.",
      ],
    },
    {
      id: "material",
      title: "Material",
      accent: "text-green-400",
      content: [
        material ||
          "100% combed cotton — smooth, breathable, and soft against the skin.",
        "Pre-shrunk fabric ensures a consistent fit even after multiple washes.",
        "Ethically sourced fibers with eco-friendly dyeing processes.",
      ],
    },
    {
      id: "sizeChart",
      title: "Size Chart",
      accent: "text-purple-400",
      content: [
        sizeChart ||
          "Standard fit designed to flatter all body types without compromising mobility.",
        "Refer to our detailed size guide for chest, length, and sleeve measurements.",
        "If unsure, choose one size up for a relaxed, streetwear-inspired look.",
      ],
    },
    {
      id: "returns",
      title: "Return Policy",
      accent: "text-yellow-400",
      content: [
        "Easy 7-day return or exchange for unworn items with original packaging and tags.",
        "Refunds are processed within 3–5 business days after inspection.",
        "We cover return shipping for defective or damaged items.",
      ],
    },
    {
      id: "shipping",
      title: "Shipping Time",
      accent: "text-red-400",
      content: [
        "Dispatched within 2–3 business days of order confirmation.",
        "Estimated delivery: 3–7 business days depending on your region.",
        "You’ll receive tracking updates at every stage — from warehouse to doorstep.",
      ],
    },
  ];

  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-2xl font-semibold text-white tracking-tight">
        More About This Product
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => toggleCard(card.id)}
            className="cursor-pointer p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20 hover:border-blue-400/30 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <h3
                className={`text-xs uppercase tracking-widest font-semibold ${card.accent}`}
              >
                {card.title}
              </h3>
              {activeCard === card.id ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>

            <AnimatePresence>
              {activeCard === card.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="text-gray-300 text-sm leading-relaxed mt-3 list-disc list-inside space-y-2">
                    {card.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
