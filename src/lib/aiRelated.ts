// Lightweight server helper to select related products using Gemini.
// Requires GEMINI_API_KEY in environment. Falls back to [] on any error.

export type AIProduct = {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  material?: string;
  colors?: string[];
  sizes?: string[];
  category?: string;
};

// Very small English stopword list for keyword scoring
const STOPWORDS = new Set([
  "the","a","an","and","or","but","if","then","else","for","to","of","in","on","at","with","by","from","as","is","are","was","were","be","been","being","this","that","these","those","it","its","you","your","yours","our","ours","we","they","them","their","theirs","i","me","my","mine"
]);

function textOf(p: AIProduct): string {
  return [p.title, p.description, p.material, p.category].filter(Boolean).join(" ");
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w));
}

function termFreq(tokens: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of tokens) m.set(t, (m.get(t) || 0) + 1);
  return m;
}

function cosineSim(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let a2 = 0;
  let b2 = 0;
  for (const [, v] of a) a2 += v * v;
  for (const [, v] of b) b2 += v * v;
  const small = a2 === 0 || b2 === 0;
  const keys = new Set<string>([...a.keys(), ...b.keys()]);
  for (const k of keys) dot += (a.get(k) || 0) * (b.get(k) || 0);
  return small ? 0 : dot / (Math.sqrt(a2) * Math.sqrt(b2));
}

export function selectRelatedByKeywords(
  product: AIProduct,
  candidates: AIProduct[],
  count: number
): string[] {
  const base = termFreq(tokenize(textOf(product)));
  const scored = candidates.map((c) => {
    const tf = termFreq(tokenize(textOf(c)));
    const score = cosineSim(base, tf);
    return { id: String(c._id), score };
  });
  scored.sort((x, y) => y.score - x.score);
  return scored.slice(0, Math.max(0, count)).map((s) => s.id);
}

export async function selectRelatedProductsGemini(
  product: AIProduct,
  candidates: AIProduct[],
  count: number
): Promise<string[]> {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return [];

    const model = process.env.GEMINI_MODEL || process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const system = [
      "You are selecting related products for an e-commerce product page.",
      "Given a current product and a list of candidate products, pick the most relevant ones by aesthetics, theme, category, keywords and audience.",
      `Return a strict JSON object: {"ids": [<up to ${count} candidate _id strings>]}.`,
      "Only include ids that exist in the given candidates.",
      "If relevance is weak, choose randomly but keep diversity.",
    ].join("\n");

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: system },
            {
              text: JSON.stringify(
                {
                  count,
                  current: {
                    id: product._id,
                    title: product.title,
                    description: product.description || "",
                    material: product.material || "",
                    colors: product.colors || [],
                    sizes: product.sizes || [],
                    category: product.category || "",
                  },
                  candidates: candidates.map((c) => ({
                    id: c._id,
                    title: c.title,
                    description: c.description || "",
                    material: c.material || "",
                    colors: c.colors || [],
                    sizes: c.sizes || [],
                    category: c.category || "",
                  })),
                },
                null,
                2
              ),
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 256,
      },
    } as const;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // In Next.js server, outbound fetch is allowed by default
      cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json();

    // Gemini response parsing
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return [];

    // Extract JSON in response even if wrapped in prose
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;

    let parsed: { ids?: string[] } = {};
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      return [];
    }

    const ids = Array.isArray(parsed.ids) ? parsed.ids.map(String) : [];

    // Keep only IDs that are in candidates and limit to count
    const candidateIdSet = new Set(candidates.map((c) => String(c._id)));
    const filtered = ids.filter((id) => candidateIdSet.has(String(id)));
    return filtered.slice(0, Math.max(0, count));
  } catch {
    return [];
  }
}
