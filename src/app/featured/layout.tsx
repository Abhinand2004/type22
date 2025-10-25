import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Featured — Type22',
  description: 'Featured automotive car tshirts from Type22.',
  keywords: ['type22','automotive tshirtbrand','car tshirts'],
  alternates: { canonical: '/featured' },
};

export default function FeaturedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
