import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Rating } from "@/models/Rating";
import { isValidObjectId, Types } from "mongoose";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  const clientId = searchParams.get("clientId") || undefined;
  if (!productId || !isValidObjectId(productId)) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }
  await connectToDatabase();
  const byStar = await Rating.aggregate([
    { $match: { productId: new Types.ObjectId(productId) } },
    { $group: { _id: "$stars", count: { $sum: 1 } } },
  ]);
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const row of byStar) counts[row._id as number] = row.count as number;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const sum = Object.entries(counts).reduce((acc, [star, cnt]) => acc + Number(star) * cnt, 0);
  const average = total > 0 ? sum / total : 0;
  let userRating: number | null = null;
  if (clientId) {
    const r = await Rating.findOne(
      { productId: new Types.ObjectId(productId), clientId },
      { stars: 1 }
    ).lean<{ stars?: number }>();
    userRating = r?.stars ?? null;
  }
  return NextResponse.json({ counts, total, average, userRating });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const { productId, stars, clientId } = body as {
    productId?: string;
    stars?: number;
    clientId?: string;
  };
  if (!productId || !isValidObjectId(productId)) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }
  if (![1, 2, 3, 4, 5].includes(Number(stars))) {
    return NextResponse.json({ error: "stars must be 1-5" }, { status: 400 });
  }
  await connectToDatabase();
  if (clientId) {
    // Upsert per device so total votes don't inflate
    const updated = await Rating.findOneAndUpdate(
      { productId, clientId },
      { $set: { stars: Number(stars), productId, clientId } },
      { upsert: true, new: true }
    ).lean();
    return NextResponse.json(updated, { status: 201 });
  } else {
    // No clientId: create a fresh record (less accurate uniqueness)
    const created = await Rating.create({ productId, stars: Number(stars) });
    return NextResponse.json(created, { status: 201 });
  }
}
