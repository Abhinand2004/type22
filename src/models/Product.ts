import { Schema, model, models } from "mongoose";

export type ProductCategory = "tshirt" | "hoodie";

export interface IProduct {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images: string[];
  colors: string[];
  sizes: string[];
  category: ProductCategory;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    category: { type: String, enum: ["tshirt", "hoodie"], required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = models.Product || model<IProduct>("Product", ProductSchema);



