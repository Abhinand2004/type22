"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme ?? theme) === "dark";

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}



