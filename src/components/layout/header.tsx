'use client';

import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

export default function Header() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-card border-b no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Share2 />
            Jathakam (ജാതകം)
          </h1>
          <Button onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </header>
  );
}
