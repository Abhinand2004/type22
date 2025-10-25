"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 md:pb-32 grid md:grid-cols-2 items-center gap-8 overflow-hidden" 
      // ✅ changed from overflow-visible to overflow-hidden
    >
      {/* Text Content */}
      <motion.div
        className="space-y-6 p-4 sm:p-6 md:p-0"
        initial={{ opacity: 0, x: -50 }} // ✅ reduced animation movement
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          For Those Who Feel Alive Behind the Wheel.
        </motion.h1>

        <p className="text-lg text-zinc-300 dark:text-zinc-400 max-w-prose">
          Minimal, premium apparel inspired by the world of performance machinery.
        </p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Link
            href="#collections"
            className="rounded-md px-5 py-3 bg-blue-500 hover:bg-blue-600 transition"
          >
            <span className="text-white">Shop Collections</span>
          </Link>
          <Link
            href="/custom"
            className="rounded-md px-5 py-3 border border-blue-500 text-white hover:bg-blue-500/10 transition"
          >
            Custom Request
          </Link>
        </motion.div>
      </motion.div>

      {/* Image */}
      <motion.div
        className="flex justify-center md:justify-end"
        initial={{ opacity: 0, x: 50 }} // ✅ reduced animation movement
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        animate={{ y: [0, -10, 0] }}
      >
        <Image
          src="/images/home.png"
          alt="Premium apparel"
          width={1200}
          height={900}
          priority
          className="w-full h-auto max-h-[600px] rounded-2xl object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </motion.div>
    </section>
  );
}
