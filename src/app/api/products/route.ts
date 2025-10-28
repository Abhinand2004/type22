import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";

export async function GET() {
  await connectToDatabase();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(products);
}

type Incoming = {
  title?: unknown;
  description?: unknown;
  price?: unknown;
  images?: unknown;
  category?: unknown;
  sizes?: unknown;
  colors?: unknown;
  material?: unknown;
  discount?: unknown;
  sizeChart?: unknown;
  theme?: unknown;
  brand?: unknown;
  originalPrice?: unknown;
};

function asStringArray(v: unknown): string[] | undefined {
  if (v == null) return [];
  if (Array.isArray(v)) return v.map(String).map((s) => s.trim()).filter(Boolean);
  return undefined;
}

function normalizeProduct(data: Incoming) {
  const title = typeof data.title === 'string' ? data.title.trim() : '';
  const priceNum = typeof data.price === 'number' ? data.price : Number(data.price);
  const category = typeof data.category === 'string' ? data.category : '';
  const images = asStringArray(data.images) ?? [];
  const sizes = asStringArray(data.sizes) ?? [];
  const colors = asStringArray(data.colors) ?? [];
  const description = typeof data.description === 'string' ? data.description : undefined;
  const material = typeof data.material === 'string' ? data.material : undefined;
  const discount = typeof data.discount === 'number' ? data.discount : (data.discount != null ? Number(data.discount) : undefined);
  const sizeChart = typeof data.sizeChart === 'string' ? data.sizeChart : undefined;
  const theme = typeof data.theme === 'string' ? data.theme : undefined;
  const brand = typeof data.brand === 'string' ? data.brand : undefined;
  const originalPrice = typeof data.originalPrice === 'number' ? data.originalPrice : (data.originalPrice != null ? Number(data.originalPrice) : undefined);

  const allowedCategories = new Set(['tshirt','hoodie']);
  const allowedThemes = new Set(['car','bike','none']);
  if (!title) return { ok: false as const, error: 'title is required' };
  if (!Number.isFinite(priceNum)) return { ok: false as const, error: 'price must be a number' };
  if (!allowedCategories.has(category)) return { ok: false as const, error: 'category must be one of tshirt, hoodie' };
  if (theme && !allowedThemes.has(theme)) return { ok: false as const, error: 'theme must be one of car, bike, none' };

  return {
    ok: true as const,
    value: {
      title,
      price: priceNum,
      discountPrice: priceNum,
      description,
      images,
      category: category as 'tshirt' | 'hoodie',
      sizes,
      colors,
      material,
      discount,
      sizeChart,
      originalPrice: Number.isFinite(originalPrice as number) ? (originalPrice as number) : undefined,
      theme: theme as 'car' | 'bike' | 'none' | undefined,
      brand,
    },
  };
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  type Normalized = {
    title: string;
    price: number;
    description?: string;
    images: string[];
    category: 'tshirt' | 'hoodie';
    sizes: string[];
    colors: string[];
    material?: string;
    discount?: number;
    sizeChart?: string;
    originalPrice?: number;
    discountPrice?: number;
    theme?: 'car' | 'bike' | 'none';
    brand?: string;
  };
  if (Array.isArray(data)) {
    const normalized: Normalized[] = [];
    for (const item of data) {
      const n = normalizeProduct(item as Incoming);
      if (!n.ok) return NextResponse.json({ error: n.error }, { status: 400 });
      normalized.push(n.value);
    }
    const createdMany = await Product.insertMany(normalized);
    return NextResponse.json(createdMany, { status: 201 });
  } else {
    const n = normalizeProduct(data as Incoming);
    if (!n.ok) return NextResponse.json({ error: n.error }, { status: 400 });
    const created = await Product.create(n.value);
    return NextResponse.json(created, { status: 201 });
  }
}






