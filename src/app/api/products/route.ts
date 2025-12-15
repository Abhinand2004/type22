import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";

/* =========================
   TYPES
========================= */

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

/* =========================
   HELPERS
========================= */

function asStringArray(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) {
    return v.map(String).map(s => s.trim()).filter(Boolean);
  }
  return [];
}

function normalizeProduct(data: Incoming) {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const priceNum =
    typeof data.price === "number" ? data.price : Number(data.price);
  const category = typeof data.category === "string" ? data.category : "";
  const images = asStringArray(data.images);
  const sizes = asStringArray(data.sizes);
  const colors = asStringArray(data.colors);

  const description =
    typeof data.description === "string" ? data.description : undefined;
  const material =
    typeof data.material === "string" ? data.material : undefined;
  const sizeChart =
    typeof data.sizeChart === "string" ? data.sizeChart : undefined;
  const brand = typeof data.brand === "string" ? data.brand : undefined;

  const discount =
    typeof data.discount === "number"
      ? data.discount
      : data.discount != null
      ? Number(data.discount)
      : undefined;

  const originalPrice =
    typeof data.originalPrice === "number"
      ? data.originalPrice
      : data.originalPrice != null
      ? Number(data.originalPrice)
      : undefined;

  const theme = typeof data.theme === "string" ? data.theme : undefined;

  const allowedCategories = new Set(["tshirt", "hoodie"]);
  const allowedThemes = new Set(["car", "bike", "none"]);

  if (!title) return { ok: false as const, error: "title is required" };
  if (!Number.isFinite(priceNum))
    return { ok: false as const, error: "price must be a number" };
  if (!allowedCategories.has(category))
    return {
      ok: false as const,
      error: "category must be one of tshirt, hoodie",
    };
  if (theme && !allowedThemes.has(theme))
    return {
      ok: false as const,
      error: "theme must be one of car, bike, none",
    };

  return {
    ok: true as const,
    value: {
      title,
      price: priceNum,
      discountPrice: priceNum,
      description,
      images,
      category: category as "tshirt" | "hoodie",
      sizes,
      colors,
      material,
      discount,
      sizeChart,
      originalPrice:
        Number.isFinite(originalPrice) ? originalPrice : undefined,
      theme: theme as "car" | "bike" | "none" | undefined,
      brand,
    },
  };
}

/* =========================
   GET PRODUCTS
========================= */

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET /api/products ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

/* =========================
   CREATE PRODUCT(S)
========================= */

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const data = await req.json();

    // Multiple products
    if (Array.isArray(data)) {
      const normalized = [];

      for (const item of data) {
        const n = normalizeProduct(item as Incoming);
        if (!n.ok) {
          return NextResponse.json({ error: n.error }, { status: 400 });
        }
        normalized.push(n.value);
      }

      const createdMany = await Product.insertMany(normalized);
      return NextResponse.json(createdMany, { status: 201 });
    }

    // Single product
    const n = normalizeProduct(data as Incoming);
    if (!n.ok) {
      return NextResponse.json({ error: n.error }, { status: 400 });
    }

    const created = await Product.create(n.value);
    return NextResponse.json(created, { status: 201 });

  } catch (error) {
    console.error("POST /api/products ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create product",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
