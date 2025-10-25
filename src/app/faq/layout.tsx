import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Type22',
  description: 'Frequently asked questions about Type22 automotive tshirts in Kerala.',
  keywords: ['type22','automotive tshirtbrand','automotive tshirtbrand in kerala','car tshirts'],
  alternates: { canonical: '/faq' },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
