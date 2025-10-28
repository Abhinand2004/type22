import { Schema, model, models } from "mongoose";

export type ProductCategory = "tshirt" | "hoodie";

export interface IProduct {
  _id: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  rating?: number;
  material?: string;
  discount?: number;
  sizeChart?: string;
  images: string[];
  colors: string[];
  sizes: string[];
  category: ProductCategory;
  theme?: 'car' | 'bike' | 'none';
  brand?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discountPrice: { type: Number },
  material: { type: String },
  discount: { type: Number, default: 0 },
  sizeChart: { type: String },
    images: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    category: { type: String, enum: ["tshirt", "hoodie"], required: true },
    theme: { type: String, enum: ["car", "bike", "none"], default: 'none' },
    brand: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = models.Product || model<IProduct>("Product", ProductSchema);




