import type { MetadataRoute } from 'next'
import { connectToDatabase } from '@/lib/db'
import { Product } from '@/models/Product'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const staticPaths = [
    '',
    '/collections',
    '/featured',
    '/about',
    '/contact',
    '/custom',
    '/faq',
    '/size-guide',
    '/shipping-returns',
  ].map((p) => ({ url: `${base}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.6 }))

  await connectToDatabase()
  const products = await Product.find({}).select({ updatedAt: 1 }).lean()
  const productPaths = (products as Array<{ _id: unknown; updatedAt?: Date }>).map((p) => ({
    url: `${base}/products/${String(p._id)}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPaths, ...productPaths]
}
