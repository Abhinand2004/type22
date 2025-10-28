import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Review } from "@/models/Review";
import { isValidObjectId } from "mongoose";
import { cookies } from "next/headers";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(req: Request, { params }: Ctx) {
  const { id } = await params;
  if (!id || !isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const jar = await cookies();
  const isAuthed = jar.get("admin_auth")?.value === "1";
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();
  await Review.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
