import { NextResponse } from "next/server";

const ADMIN_EMAIL = "adithyan@123.com";
const ADMIN_PASSWORD = "#Adithyan#11";

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as { email?: string; password?: string };
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
    const res = new NextResponse("OK", { status: 200 });
    // Simple auth cookie (no DB): value "1" indicates authenticated admin
    // HttpOnly so it's not accessible to JS; Secure in production; Lax same-site
    res.cookies.set("admin_auth", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return res;
  } catch {
    return new NextResponse("Bad Request", { status: 400 });
  }
}
