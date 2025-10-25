"use client";
import type { ReactNode } from "react";
import { AnimateInView } from "./AnimateInView";

type RevealProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  rootMargin?: string;
  delay?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  once = true,
  rootMargin = "-10% 0px -10% 0px",
  delay = 0,
  duration = 0.5,
}: RevealProps) {
  return (
    <AnimateInView
      className={className}
      once={once}
      rootMargin={rootMargin}
      delay={delay}
      duration={duration}
    >
      {children}
    </AnimateInView>
  );
}
