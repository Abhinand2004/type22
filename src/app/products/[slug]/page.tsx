import { connectToDatabase } from '@/lib/db';
import { Product, IProduct } from '@/models/Product';
import { isValidObjectId } from 'mongoose';
import { AnimateInView } from '@/components/AnimateInView';
import StringPillList from '@/components/StringPillList';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import OffersSection from '@/components/OffersSection';
import ProductMoreDetails from '@/components/ProductMoreDetails';
import ProductImageCarousel from '@/components/ProductImageCarousel';
import type { Metadata } from 'next';

type Ctx = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  await connectToDatabase();
  const { slug } = await params;
  let product: IProduct | null = null;
  if (isValidObjectId(slug)) {
    product = (await Product.findById(slug).lean()) as IProduct | null;
  }
  if (!product) {
    product = (await Product.findOne({ title: decodeURIComponent(slug) }).lean()) as IProduct | null;
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = product
    ? `${product.title} — Type22`
    : 'Product — Type22';
  const desc = product?.description || 'Automotive T‑shirts by Type22 — automotive tshirtbrand in Kerala.';
  const image = product?.images?.[0] || '/hero.svg';
  const url = `${siteUrl}/products/${encodeURIComponent(String(product?._id ?? slug))}`;
  const keywords = [
    'type22',
    'automotive tshirtbrand',
    'automotive tshirtbrand in kerala',
    'car tshirts',
    'custom tshirt kerala',
    product?.category || '',
  ].filter(Boolean);
  return {
    title,
    description: desc,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      images: [{ url: image }],
      type: 'website',
      siteName: 'Type22',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [image],
    },
  };
}

export default async function ProductDetail({ params }: Ctx) {
  await connectToDatabase();
  const { slug } = await params;

  let product: IProduct | null = null;

  if (isValidObjectId(slug)) {
    product = (await Product.findById(slug).lean()) as IProduct | null;
  }

  if (!product) {
    product = (await Product.findOne({ title: decodeURIComponent(slug) }).lean()) as IProduct | null;
  }

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-xl font-light">
        Product not found
      </div>
    );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const productUrl = `${siteUrl}/products/${encodeURIComponent(String(product._id ?? product.title))}`;
  const whatsappText = encodeURIComponent(
    `Hello! I'm interested in "${product.title}".\nPrice: ₹${product.price}\nLink: ${productUrl}`
  );

  // Simple related products: prefer same category, else recent
  const relatedQuery: Record<string, unknown> = { _id: { $ne: product._id } };
  if (product.category) relatedQuery.category = product.category;
  let relatedProducts = (await Product.find(relatedQuery)
    .sort({ createdAt: -1 })
    .limit(8)
    .lean()) as unknown as IProduct[];
  if (relatedProducts.length < 8) {
    const fallback = (await Product.find({ _id: { $nin: [product._id, ...relatedProducts.map((p) => p._id)] } })
      .sort({ createdAt: -1 })
      .limit(8 - relatedProducts.length)
      .lean()) as unknown as IProduct[];
    relatedProducts = [...relatedProducts, ...fallback];
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 w-full">
          
          {/* Left Column - Image */}
          <AnimateInView className="flex items-center justify-center">
            <ProductImageCarousel images={product.images ?? []} alt={product.title} />
          </AnimateInView>

          {/* Right Column - Details */}
          <div className="flex flex-col justify-center space-y-4 lg:space-y-6 pr-2 lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-thumb-blue-500/20 lg:scrollbar-track-transparent">
            
            {/* Title & Price */}
            <AnimateInView className="space-y-3">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none hover:text-blue-400 transition-colors duration-300">
                {product.title}
              </h1>
              
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-4xl lg:text-5xl font-bold text-blue-400 animate-pulse">₹{product.price}</span>
                {product.discount && (
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold border border-blue-500/30 animate-bounce">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </AnimateInView>

            {/* Description */}
            {product.description && (
              <AnimateInView>
                <p className="text-base lg:text-lg text-gray-400 leading-relaxed font-light">
                  {product.description}
                </p>
              </AnimateInView>
            )}

            {/* Material */}
            {product.material && (
              <AnimateInView>
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Material</h3>
                  <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 inline-block hover:border-blue-400/40 hover:scale-105 transition-all duration-300">
                    <span className="text-white font-medium">{product.material}</span>
                  </div>
                </div>
              </AnimateInView>
            )}

            {/* Sizes - Card Form */}
            {product.sizes?.length > 0 && (
              <AnimateInView>
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Available Sizes</h3>
                  <StringPillList items={product.sizes as string[]} />
                </div>
              </AnimateInView>
            )}

            {/* Colors */}
            {product.colors?.length > 0 && (
              <AnimateInView>
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Available Colors</h3>
                  <StringPillList items={product.colors as string[]} pillClassName="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300 cursor-pointer hover:scale-110" textClassName="text-sm font-medium text-white" />
                </div>
              </AnimateInView>
            )}

            {/* Size Chart */}
            {product.sizeChart && (
              <AnimateInView>
                <div className="p-4 lg:p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20 backdrop-blur-sm space-y-2 hover:border-blue-400/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <h3 className="text-xs uppercase tracking-widest text-blue-400 font-semibold">📏 Size Chart</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{product.sizeChart}</p>
                </div>
              </AnimateInView>
            )}

            {/* CTA Button */}
            <AnimateInView>
              <div className="pt-2">
                <a
                  href={`https://wa.me/918590521956?text=${whatsappText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 lg:px-10 py-4 lg:py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base lg:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] w-full lg:w-auto animate-pulse hover:animate-none"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-3">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Buy via WhatsApp
                  </span>
                </a>
              </div>
            </AnimateInView>

          </div>

          {/* Offers */}
          <div className="lg:col-span-2">
            <OffersSection />
          </div>

          {/* More Details */}
          <div className="lg:col-span-2">
            <ProductMoreDetails
              material={product.material}
              sizeChart={product.sizeChart}
              description={product.description}
            />
          </div>

          {/* Related Products */}
          {relatedProducts?.length > 0 && (
            <div className="lg:col-span-2 mt-12">
              <h2 className="text-2xl font-semibold mb-6">More Products</h2>
              <div className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p._id}
                    title={p.title}
                    imageUrl={p.images?.[0] ?? '/images/logo.svg'}
                    price={p.price}
                    id={String(p._id)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}