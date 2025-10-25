import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Admin — Type22',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
