import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, message } = await req.json();
  if (!email || !message) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }
  // In production: send email via provider (Resend/SES/etc)
  return NextResponse.json({ ok: true });
}






