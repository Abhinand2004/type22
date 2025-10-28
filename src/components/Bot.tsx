"use client";

import { useState, useEffect } from "react";
import ChatbotModal from "./ChatbotModal";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";

type Product = {
  _id?: string;
  title: string;
  price: number;
  description?: string;
  material?: string;
  sizes?: string[];
  colors?: string[];
  sizeChart?: string;
  discount?: number;
  images?: string[];
};

const Bot = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const wave = async () => {
      await controls.start({
        y: -10,
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    };

    const interval = setInterval(() => {
      wave();
    }, 5000);

    return () => clearInterval(interval);
  }, [controls]);

  useEffect(() => {
    if (modalOpen && !loaded) {
      (async () => {
        try {
          const res = await fetch("/api/products");
          if (res.ok) {
            const data = (await res.json()) as Product[];
            setProducts(Array.isArray(data) ? data : []);
          }
        } catch {
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [modalOpen, loaded]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(modalOpen ? 'chatbot:open' : 'chatbot:close'));
    }
  }, [modalOpen]);

  return (
    <>
      {!modalOpen && createPortal(
        <motion.div
          className="fixed z-[9999] cursor-pointer"
          style={{
            right: "calc(env(safe-area-inset-right, 0px) + 1rem)",
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.5rem)",
          }}
          animate={controls}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true)}
          role="button"
          aria-label="Open chatbot"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setModalOpen(true);
          }}
        >
          <div className="relative">
            <Image
              src="/images/bot.png"
              alt="Chatbot"
              width={56}
              height={56}
              className="w-18 h-18 object-contain"
              priority
            />
          </div>
        </motion.div>,
        typeof document !== "undefined" ? document.body : ((null as unknown) as Element)
      )}

      <ChatbotModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""}
        products={products}
      />
    </>
  );
};

export default Bot;

