"use client";
import { useEffect, useRef } from "react";

export default function TitleVisibility() {
  const originalTitleRef = useRef<string | null>(null);
  const hiddenTitle = "continew next project";

  useEffect(() => {
    const getTitle = () => document?.title || "";
    const setTitle = (t: string) => {
      try {
        document.title = t;
      } catch {}
    };

    const handleVisibility = () => {
      if (typeof document === "undefined") return;
      if (document.hidden) {
        if (!originalTitleRef.current) originalTitleRef.current = getTitle();
        setTitle(hiddenTitle);
      } else {
        if (originalTitleRef.current) setTitle(originalTitleRef.current);
        originalTitleRef.current = null;
      }
    };

    const handleBlur = () => {
      if (!originalTitleRef.current) originalTitleRef.current = getTitle();
      setTitle(hiddenTitle);
    };
    const handleFocus = () => {
      if (originalTitleRef.current) setTitle(originalTitleRef.current);
      originalTitleRef.current = null;
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return null;
}
