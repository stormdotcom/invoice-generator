'use client';

import { InvoiceGenerator } from '@/components/InvoiceGenerator';
import { Receipt, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Receipt className="w-8 h-8 sm:w-10 sm:h-10 text-violet-600" />
              <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Invoice Generator
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-md mx-auto">
            Create professional invoices in just a few simple steps
          </p>
        </div>
        <InvoiceGenerator />
      </div>
    </div>
  );
}