import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collections — Type22',
  description: 'Browse all car tshirts from Type22 — automotive tshirtbrand in Kerala.',
  keywords: ['type22','automotive tshirtbrand','automotive tshirtbrand in kerala','car tshirts','custom tshirt kerala'],
  alternates: { canonical: '/collections' },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
