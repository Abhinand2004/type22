import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Review } from "@/models/Review";
import { isValidObjectId } from "mongoose";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (!productId || !isValidObjectId(productId)) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }
  await connectToDatabase();
  const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const { productId, username, content, clientId } = body as {
    productId?: string;
    username?: string;
    content?: string;
    clientId?: string;
  };
  if (!productId || !isValidObjectId(productId)) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }
  if (!username || !content) {
    return NextResponse.json({ error: "username and content are required" }, { status: 400 });
  }
  await connectToDatabase();
  // Enforce one per device if clientId provided
  if (clientId) {
    const existingByClient = await Review.findOne({ productId, clientId }).lean();
    if (existingByClient) {
      return NextResponse.json({ error: "You have already reviewed this product." }, { status: 409 });
    }
  }
  // Also enforce one per username per product (best-effort)
  const existingByUsername = await Review.findOne({ productId, username: String(username).slice(0,50) }).lean();
  if (existingByUsername) {
    return NextResponse.json({ error: "This username has already reviewed this product." }, { status: 409 });
  }
  const created = await Review.create({
    productId,
    username: String(username).slice(0, 50),
    content: String(content).slice(0, 1000),
    clientId: clientId ? String(clientId).slice(0, 64) : undefined,
  });
  return NextResponse.json(created, { status: 201 });
}
