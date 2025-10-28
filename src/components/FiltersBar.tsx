"use client";

import React from "react";

type Theme = "all" | "car" | "bike" | "none";
type Category = "all" | "tshirt" | "hoodie";
type Color =
  | "all"
  | "black"
  | "white"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "gray"
  | "navy";

type Props = {
  theme: Theme;
  onChangeTheme: (v: Theme) => void;
  brand: string;
  onChangeBrand: (v: string) => void;
  brandOptions: string[];
  category: Category;
  onChangeCategory: (v: Category) => void;
  color: Color;
  onChangeColor: (v: Color) => void;
};

export default function FiltersBar({
  theme,
  onChangeTheme,
  brand,
  onChangeBrand,
  brandOptions,
  category,
  onChangeCategory,
  color,
  onChangeColor,
}: Props) {
  const colors: Color[] = [
    "all",
    "black",
    "white",
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "gray",
    "navy",
  ];

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-white/60 dark:bg-zinc-900/60 p-4 rounded-2xl shadow-sm backdrop-blur-md border border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      {/* Type */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Type
        </label>
        <select
          value={theme}
          onChange={(e) => onChangeTheme(e.target.value as Theme)}
          className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 hover:shadow-sm transition"
        >
          <option value="all">All</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="none">None</option>
        </select>
      </div>

      {/* Brand */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Brand
        </label>
        <select
          value={brand}
          onChange={(e) => onChangeBrand(e.target.value)}
          className={`px-3 py-2 rounded-lg border text-sm transition focus:ring-2 ${
            theme === "none"
              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
              : "bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:shadow-sm border-zinc-300 dark:border-zinc-700 focus:ring-indigo-400 dark:focus:ring-indigo-500"
          }`}
          disabled={theme === "none"}
        >
          {["All", ...brandOptions].map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => onChangeCategory(e.target.value as Category)}
          className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 hover:shadow-sm transition"
        >
          <option value="all">All</option>
          <option value="tshirt">T-Shirt</option>
          <option value="hoodie">Hoodie</option>
        </select>
      </div>

      {/* Color */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Color
        </label>
        <select
          value={color}
          onChange={(e) => onChangeColor(e.target.value as Color)}
          className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 hover:shadow-sm transition"
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
