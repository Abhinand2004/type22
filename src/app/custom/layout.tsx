import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom T‑Shirts — Type22',
  description: 'Custom tshirt Kerala by Type22 — automotive tshirtbrand. Personalize your car tshirts.',
  keywords: ['type22','custom tshirt kerala','automotive tshirtbrand','car tshirts'],
  alternates: { canonical: '/custom' },
};

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
