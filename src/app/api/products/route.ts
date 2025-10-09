import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";

export async function GET() {
  await connectToDatabase();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const created = await Product.create(data);
  return NextResponse.json(created, { status: 201 });
}



