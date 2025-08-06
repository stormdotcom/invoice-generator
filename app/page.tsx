'use client';

import { InvoiceGenerator } from '@/components/InvoiceGenerator';
import { Receipt, Sparkles, Zap, Star, Download, FileText, Shield, Clock, Users, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
        {/* Hero Section */}
        <div className="text-center mb-12">
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

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-4">
            Professional Invoice Generator
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Create beautiful, professional invoices in minutes with our intuitive step-by-step process. 
            No registration required, completely free to use.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 text-lg font-semibold">
              <FileText className="w-5 h-5 mr-2" />
              Start Creating Invoice
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3 text-lg font-semibold">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
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
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-700">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              No Registration
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Invoice Generator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Generate professional invoices in under 2 minutes with our streamlined process
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Your data stays on your device. No servers, no storage, complete privacy
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Instant Download</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Get your invoice as PDF instantly. No waiting, no watermarks, ready to send
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Business Ready</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Professional templates designed for freelancers, small businesses, and agencies
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">10K+</div>
              <div className="text-gray-600">Invoices Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">5+</div>
              <div className="text-gray-600">Professional Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">100%</div>
              <div className="text-gray-600">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "This invoice generator saved me hours of work. The templates are professional and the process is incredibly smooth."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">Freelance Designer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Perfect for my small business. No registration required and the invoices look professional. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Mike Chen</div>
                    <div className="text-sm text-gray-500">Small Business Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "The best free invoice generator I've found. Clean interface, fast generation, and beautiful PDFs."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Emma Davis</div>
                    <div className="text-sm text-gray-500">Consultant</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Invoice Generator Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Create Your Invoice?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Follow our simple 4-step process to generate your professional invoice in minutes
            </p>
          </div>
          <InvoiceGenerator />
        </div>

        {/* Footer CTA */}
        <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Help Getting Started?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our step-by-step process makes it easy to create professional invoices. 
            Just fill in your details and download your invoice instantly.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 text-lg font-semibold">
            <CheckCircle className="w-5 h-5 mr-2" />
            Start Creating Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
}
