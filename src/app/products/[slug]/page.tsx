import { connectToDatabase } from '@/lib/db';
import { Product, IProduct } from '@/models/Product';
import Image from 'next/image';
import { isValidObjectId } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetail({ params }: any) {
  await connectToDatabase();
  const slug = params.slug;

  let product: IProduct | null = null;

  // Try by ID
  if (isValidObjectId(slug)) {
    product = (await Product.findById(slug).lean()) as IProduct | null;
  }

  // Fallback to title lookup
  if (!product) {
    product = (await Product.findOne({ title: decodeURIComponent(slug) }).lean()) as IProduct | null;
  }

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center text-zinc-500 text-lg">
        Product not found
      </div>
    );

  const image = product.images?.[0] ?? '/hero.svg';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const productUrl = `${siteUrl}/products/${encodeURIComponent(product._id ?? product.title)}`;
  const whatsappText = encodeURIComponent(
    `Hello! I'm interested in "${product.title}".\nPrice: ₹${product.price}\nLink: ${productUrl}`
  );

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 overflow-hidden text-zinc-100 px-4">
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 max-w-6xl w-full rounded-3xl bg-zinc-900/50 backdrop-blur-xl shadow-2xl border border-zinc-800/60 p-6 sm:p-8 md:p-12 transition-all duration-500">
        {/* Product Image */}
        <div className="relative group w-full md:w-1/2 aspect-square overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={product.title}
            width={800}
            height={800}
            priority
            className="object-cover w-full h-full rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          {/* Download button */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <a
              href={image}
              download={(() => {
                try {
                  // If data URI, create a safe filename
                  if (image.startsWith('data:')) {
                    const extMatch = image.match(/data:image\/(\w+);/);
                    const ext = extMatch ? extMatch[1] : 'png';
                    return `${product.title.replace(/[^a-z0-9-_]/gi, '_')}.${ext}`;
                  }
                  // otherwise use URL path extension
                  const url = new URL(image, siteUrl);
                  const parts = url.pathname.split('/').filter(Boolean);
                  const last = parts[parts.length - 1] || 'image';
                  return `${product.title.replace(/[^a-z0-9-_]/gi, '_')}_${last}`;
                } catch {
                  return `${product.title.replace(/[^a-z0-9-_]/gi, '_')}.png`;
                }
              })()}
              className="px-3 py-1 rounded bg-black/60 text-xs text-white hover:bg-black/80"
            >
              ⬇️ Download
            </a>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center md:w-1/2 text-center md:text-left space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,200,0,0.2)]">
            {product.title}
          </h1>

          {product.description && (
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md mx-auto md:mx-0">
              {product.description}
            </p>
          )}

          <div>
            <p className="text-3xl font-bold text-amber-400">₹{product.price}</p>
            {product.discount && (
              <p className="text-sm text-rose-500 mt-1">{product.discount}% OFF</p>
            )}
          </div>

          <div className="text-sm sm:text-base space-y-1 text-zinc-400">
            <p>
              <span className="font-medium text-zinc-200">Material:</span>{' '}
              {product.material ?? '—'}
            </p>
            <p>
              <span className="font-medium text-zinc-200">Sizes:</span>{' '}
              {product.sizes?.length ? product.sizes.join(', ') : '—'}
            </p>
            <p>
              <span className="font-medium text-zinc-200">Colors:</span>{' '}
              {product.colors?.length ? product.colors.join(', ') : '—'}
            </p>
          </div>

          {product.sizeChart && (
            <div className="mt-3 text-sm bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50 text-zinc-400 backdrop-blur-sm">
              <h3 className="text-amber-400 font-semibold mb-1">📏 Size Chart</h3>
              <p>{product.sizeChart}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <a
              href={`https://wa.me/918590521956?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,200,0,0.3)]"
            >
              💬 Buy via WhatsApp
            </a>
            <p className="text-sm text-zinc-400">
              ⭐{' '}
              {product.rating && product.rating > 0
                ? product.rating.toFixed(1)
                : 'No ratings yet'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
