import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Inter, Manjari } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const manjari = Manjari({
  subsets: ['latin', 'malayalam'],
  weight: ['100', '400', '700'],
  variable: '--font-malayalam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jathakam Generator',
  description: 'Create your Malayalam astrology document.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, manjari.variable)}>
      <body className="font-malayalam antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
