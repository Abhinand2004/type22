import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  await connectToDatabase();
  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(id, data, { new: true }).lean();
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  await connectToDatabase();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}


