import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Type22',
  description: 'Contact Type22 — automotive tshirtbrand in Kerala. For custom car tshirts and support.',
  keywords: ['type22','automotive tshirtbrand','automotive tshirtbrand in kerala','car tshirts','custom tshirt kerala'],
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
