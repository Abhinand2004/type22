"use client";
import { StaggerInViewList } from "@/components/AnimateInView";

type StringPillListProps = {
  items: string[];
  containerClassName?: string;
  pillClassName?: string;
  textClassName?: string;
};

export default function StringPillList({
  items,
  containerClassName,
  pillClassName = "px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300 cursor-pointer hover:scale-110",
  textClassName = "font-semibold text-white text-sm",
}: StringPillListProps) {
  return (
    <StaggerInViewList
      className={containerClassName || "flex flex-wrap gap-2"}
      items={items}
      renderItem={(item) => (
        <div className={pillClassName}>
          <span className={textClassName}>{item}</span>
        </div>
      )}
    />
  );
}
