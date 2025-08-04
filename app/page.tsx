'use client';

import { InvoiceGenerator } from '@/components/InvoiceGenerator';
import { Receipt, Sparkles, Zap, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-300/20 to-rose-300/20 rounded-full blur-3xl float-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-2xl float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-300/20 to-violet-300/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-cyan-300/20 to-teal-300/20 rounded-full blur-2xl float-animation" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          {/* Enhanced header with floating icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-xl hover-lift">
                <Receipt className="w-8 h-8 text-pink-600" />
                <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500 animate-pulse" />
              <Star className="w-5 h-5 text-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-3">
            Invoice Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Create beautiful, professional invoices in minutes with our intuitive step-by-step process
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Simple & Fast
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Professional Design
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Instant Download
            </div>
          </div>
        </div>
        
        <InvoiceGenerator />
      </div>
    </div>
  );
}
