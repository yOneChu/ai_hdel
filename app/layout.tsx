import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Smart Procurement Analyzer',
  description: 'AI-powered procurement and cost analysis dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable}`}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
