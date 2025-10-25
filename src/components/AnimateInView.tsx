"use client";
import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type AnimateInViewProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  rootMargin?: string;
  variants?: Variants;
  initialOpacity?: number;
  translateY?: number;
  translateX?: number;
  delay?: number;
  duration?: number;
};

export function AnimateInView({
  children,
  className,
  once = true,
  rootMargin = "-10% 0px -10% 0px",
  variants,
  initialOpacity = 0,
  translateY = 20,
  translateX = 0,
  delay = 0,
  duration = 0.5,
}: AnimateInViewProps) {
  const baseVariants: Variants =
    variants ?? {
      hidden: { opacity: initialOpacity, y: translateY, x: translateX },
      show: { opacity: 1, y: 0, x: 0 },
    };

  return (
    <motion.div
      className={className}
      variants={baseVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: rootMargin }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  once?: boolean;
  rootMargin?: string;
  itemDelay?: number;
  duration?: number;
  variants?: Variants;
};

export function StaggerInViewList<T>({
  items,
  renderItem,
  className,
  once = true,
  rootMargin = "-10% 0px -10% 0px",
  itemDelay = 0.06,
  duration = 0.45,
  variants,
}: StaggerListProps<T>) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once, margin: rootMargin }}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={
            variants ?? {
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }
          }
          transition={{ duration, delay: i * itemDelay }}
        >
          {renderItem(item, i)}
        </motion.div>
      ))}
    </motion.div>
  );
}
