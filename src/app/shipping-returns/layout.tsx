import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns — Type22',
  description: 'Shipping and returns policy for Type22 automotive t‑shirts in Kerala.',
  keywords: ['type22','automotive tshirtbrand','car tshirts','shipping','returns'],
  alternates: { canonical: '/shipping-returns' },
};

export default function ShippingReturnsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
