import { NextResponse } from "next/server";

export const runtime = "nodejs";

// This endpoint exists to ensure the function runs on the Node runtime where a Socket.IO server can be attached (done in server init file).
export async function GET() {
  return NextResponse.json({ ok: true });
}



