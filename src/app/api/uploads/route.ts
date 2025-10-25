import { NextResponse } from "next/server";
import crypto from "crypto";
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const cloudinaryUrl = process.env.CLOUDINARY_URL;
    if (!cloudinaryUrl) {
      return NextResponse.json({ error: "CLOUDINARY_URL not configured" }, { status: 500 });
    }

    const url = new URL(cloudinaryUrl);
    const apiKey = url.username;
    const apiSecret = url.password;
    const cloudName = url.hostname;
    const unsignedPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!apiKey || !apiSecret || !cloudName) {
      return NextResponse.json({ error: "Invalid CLOUDINARY_URL" }, { status: 500 });
    }

    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    const upstream = new FormData();
    upstream.append("file", file);
    upstream.append("folder", "type22_uploads");
    if (unsignedPreset) {
      upstream.append("upload_preset", unsignedPreset);
    } else {
      // Signed upload: add api_key, timestamp and signature
      const timestamp = Math.floor(Date.now() / 1000);
      // Signature string must be parameters sorted alphabetically and concatenated as key=value&...
      // We're sending folder and timestamp (public_id is omitted), so string to sign is:
      //   `folder=type22_uploads&timestamp=${timestamp}${apiSecret}`
      const params = `folder=type22_uploads&timestamp=${timestamp}`;
      const signature = crypto.createHash('sha1').update(params + apiSecret).digest('hex');
      upstream.append("api_key", apiKey);
      upstream.append("timestamp", String(timestamp));
      upstream.append("signature", signature);
    }

    const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const res = await fetch(uploadEndpoint, {
      method: "POST",
      body: upstream,
    });

    if (!res.ok) {
      let detail: unknown = await res.text();
      try { detail = JSON.parse(String(detail)); } catch {}
      return NextResponse.json({ error: "Cloudinary upload failed", detail }, { status: 502 });
    }

    const data = (await res.json()) as { secure_url?: string; url?: string };
    const secureUrl = data.secure_url || data.url;

    if (!secureUrl) {
      return NextResponse.json({ error: "No URL returned from Cloudinary" }, { status: 502 });
    }

    return NextResponse.json({ url: secureUrl }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
