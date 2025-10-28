import { NextResponse } from "next/server";

function toBase64(buf: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buf);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
  return Buffer.from(binary, "binary").toString("base64");
}

export async function POST(req: Request) {
  try {
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server not configured: GEMINI_API_KEY missing" }, { status: 500 });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Expected multipart/form-data with 'image' field" }, { status: 400 });
    }

    const form = await req.formData();
    const file = form.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing image file under 'image' field" }, { status: 400 });
    }

    const arrayBuf = await file.arrayBuffer();
    const b64 = toBase64(arrayBuf);
    const mime = file.type || "image/jpeg";

    const prompt = `You are a vehicle recognition assistant. Analyze the provided image and identify vehicle details.
Return a compact JSON object with these fields only:
{
  "detected": boolean,
  "make": string | null,
  "model": string | null,
  "body_type": string | null,
  "color": string | null,
  "approx_year": string | null,
  "confidence": number, // 0-1
  "notes": string | null
}
If no vehicle is present, set detected=false and others to null with a short notes.`;

    const model = process.env.GEMINI_MODEL || process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.5-flash';
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
                { inlineData: { mimeType: mime, data: b64 } },
              ],
            },
          ],
          generationConfig: { temperature: 0.2, maxOutputTokens: 300 },
        }),
      }
    );

    if (!res.ok) {
      let detail: unknown = undefined;
      try { detail = await res.json(); } catch { try { detail = await res.text(); } catch {/* noop */} }
      return NextResponse.json({ error: "Gemini request failed", detail }, { status: 502 });
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Try parse JSON from the model output
    let parsed: unknown = null;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
    } catch {}

    return NextResponse.json({ raw: text, result: parsed });
  } catch (e) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
