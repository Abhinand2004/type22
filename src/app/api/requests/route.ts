import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { DesignRequest } from "@/models/DesignRequest";

export async function GET() {
  await connectToDatabase();
  const requests = await DesignRequest.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(requests);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const created = await DesignRequest.create(data);
  return NextResponse.json(created, { status: 201 });
}






