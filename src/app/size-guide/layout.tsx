import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Size Guide — Type22',
  description: 'Size guide for Type22 automotive t‑shirts in Kerala.',
  keywords: ['type22','automotive tshirtbrand','car tshirts','size guide'],
  alternates: { canonical: '/size-guide' },
};

export default function SizeGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
