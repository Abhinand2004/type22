import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Message } from "@/models/Message";

type ParamsP = { params: Promise<{ chatId: string }> };

export async function GET(_req: Request, { params }: ParamsP) {
  const { chatId } = await params;
  await connectToDatabase();
  const messages = await Message.find({ chatId })
    .sort({ createdAt: 1 })
    .lean();
  return NextResponse.json(messages);
}

export async function POST(req: Request, { params }: ParamsP) {
  const { chatId } = await params;
  await connectToDatabase();
  const data = await req.json();
  const created = await Message.create({ ...data, chatId });
  return NextResponse.json(created, { status: 201 });
}


