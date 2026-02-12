'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import AstroForm from '@/components/astro-form';
import AstroDocumentPreview from '@/components/astro-preview';
import { initialData } from '@/lib/initial-data';
import type { AstroData } from '@/lib/types';

export default function Home() {
  const [data, setData] = useState<AstroData>(initialData);

  return (
    <div className="min-h-screen bg-background font-malayalam">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="no-print">
            <AstroForm data={data} setData={setData} />
          </div>
          <div className="lg:sticky lg:top-8">
            <AstroDocumentPreview data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
