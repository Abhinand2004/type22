"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function AppLoading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white dark:bg-black">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <span className="h-5 w-5 rounded-full gold-gradient animate-pulse" />
          <span className="text-lg font-semibold tracking-tight">Type 22…</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}






