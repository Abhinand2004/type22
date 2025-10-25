import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import crypto from "crypto";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ storage: multer.memoryStorage() });

function parseCloudinaryUrl(urlStr?: string) {
  if (!urlStr) return null;
  const url = new URL(urlStr);
  return {
    apiKey: url.username,
    apiSecret: url.password,
    cloudName: url.hostname,
  };
}

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: (...args: unknown[]) => void) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) return reject(result);
      resolve();
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const conf = parseCloudinaryUrl(process.env.CLOUDINARY_URL);
    if (!conf?.apiKey || !conf.apiSecret || !conf.cloudName) {
      return res.status(500).json({ error: "CLOUDINARY_URL not configured" });
    }

    await runMiddleware(req, res, upload.single("file"));

    const file = (req as unknown as { file?: { buffer: Buffer; mimetype: string; originalname: string } }).file;
    if (!file) {
      return res.status(400).json({ error: "file is required" });
    }

    // Build signed params per Cloudinary spec
    const uploadEndpoint = `https://api.cloudinary.com/v1_1/${conf.cloudName}/image/upload`;
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "type22_uploads";

    const paramsToSign: Record<string, string | number> = { folder, timestamp };
    const paramString = Object.keys(paramsToSign)
      .sort()
      .map((k) => `${k}=${paramsToSign[k]}`)
      .join("&");
    const signature = crypto
      .createHash("sha1")
      .update(`${paramString}${conf.apiSecret}`)
      .digest("hex");

    const form = new FormData();
    form.append("file", new Blob([file.buffer], { type: file.mimetype }), file.originalname);
    form.append("folder", folder);
    form.append("timestamp", String(timestamp));
    form.append("api_key", conf.apiKey);
    form.append("signature", signature);

    const upstream = await fetch(uploadEndpoint, { method: "POST", body: form });

    if (!upstream.ok) {
      const text = await upstream.text();
      return res.status(502).json({ error: "Cloudinary upload failed", detail: text });
    }

    const data = (await upstream.json()) as { secure_url?: string; url?: string };
    const url = data.secure_url || data.url;
    if (!url) return res.status(502).json({ error: "No URL returned from Cloudinary" });

    return res.status(200).json({ url });
  } catch {
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
