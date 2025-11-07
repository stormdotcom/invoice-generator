'use client';

import { InvoiceGenerator } from '@/components/InvoiceGenerator';
import { Receipt, Sparkles, Zap, Star, Download, FileText, Shield, Clock, Users, CheckCircle, ArrowRight, Play, Moon, Sun, ChevronUp, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
    }`}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl float-animation ${
          darkMode ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-br from-pink-300/20 to-rose-300/20'
        }`}></div>
        <div className={`absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl float-animation ${
          darkMode ? 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20' : 'bg-gradient-to-br from-blue-300/20 to-indigo-300/20'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-20 left-1/4 w-40 h-40 rounded-full blur-3xl float-animation ${
          darkMode ? 'bg-gradient-to-br from-violet-600/20 to-purple-600/20' : 'bg-gradient-to-br from-purple-300/20 to-violet-300/20'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-40 right-1/3 w-28 h-28 rounded-full blur-2xl float-animation ${
          darkMode ? 'bg-gradient-to-br from-cyan-600/20 to-teal-600/20' : 'bg-gradient-to-br from-cyan-300/20 to-teal-300/20'
        }`} style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className={`absolute inset-0 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 ${
                  darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-pink-500 to-rose-500'
                }`}></div>
                <div className={`relative rounded-xl p-3 shadow-xl hover-lift ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <Receipt className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-pink-600'}`} />
                  <Sparkles className="w-3 h-3 text-yellow-500 absolute -top-0.5 -right-0.5 animate-pulse" />
                </div>
              </div>
              <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Invo-Gen
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('features')}
                className={`hover:text-purple-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className={`hover:text-purple-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('generator')}
                className={`hover:text-purple-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Generator
              </button>
              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                size="sm"
                className={`rounded-full p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                size="sm"
                className={`rounded-full p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                size="sm"
                className={`rounded-full p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('features')}
                  className={`text-left hover:text-purple-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className={`text-left hover:text-purple-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Reviews
                </button>
                <button 
                  onClick={() => scrollToSection('generator')}
                  className={`text-left hover:text-purple-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Generator
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Enhanced header with floating icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative group">
              <div className={`absolute inset-0 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 ${
                darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-pink-500 to-rose-500'
              }`}></div>
              <div className={`relative rounded-2xl p-4 shadow-xl hover-lift ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <Receipt className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-pink-600'}`} />
                <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500 animate-pulse" />
              <Star className="w-5 h-5 text-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-4 ${darkMode ? 'dark-gradient-text' : ''}`}>
            Professional Invoice Generator
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Create beautiful, professional invoices in minutes with our intuitive step-by-step process. 
            No registration required, completely free to use.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 text-lg font-semibold">
              <FileText className="w-5 h-5 mr-2" />
              Start Creating Invoice
            </Button>
            <Button size="lg" variant="outline" className={`border-2 px-8 py-3 text-lg font-semibold ${
              darkMode 
                ? 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white' 
                : 'border-gray-300 hover:border-gray-400'
            }`}>
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm ${
              darkMode 
                ? 'bg-gray-800/60 text-gray-300' 
                : 'bg-white/60 text-gray-700'
            }`}>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Simple & Fast
            </div>
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm ${
              darkMode 
                ? 'bg-gray-800/60 text-gray-300' 
                : 'bg-white/60 text-gray-700'
            }`}>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Professional Design
            </div>
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm ${
              darkMode 
                ? 'bg-gray-800/60 text-gray-300' 
                : 'bg-white/60 text-gray-700'
            }`}>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Instant Download
            </div>
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm ${
              darkMode 
                ? 'bg-gray-800/60 text-gray-300' 
                : 'bg-white/60 text-gray-700'
            }`}>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              No Registration
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Why Choose Our Invoice Generator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/80' : 'bg-white/80'
            }`}>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className={darkMode ? 'text-gray-300' : ''}>
                  Generate professional invoices in under 2 minutes with our streamlined process
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/80' : 'bg-white/80'
            }`}>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Secure & Private</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className={darkMode ? 'text-gray-300' : ''}>
                  Your data stays on your device. No servers, no storage, complete privacy
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/80' : 'bg-white/80'
            }`}>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Instant Download</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className={darkMode ? 'text-gray-300' : ''}>
                  Get your invoice as PDF instantly. No waiting, no watermarks, ready to send
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/80' : 'bg-white/80'
            }`}>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Business Ready</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className={darkMode ? 'text-gray-300' : ''}>
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
              <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>10K+</div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Invoices Generated</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>5+</div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Professional Templates</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>100%</div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Free to Use</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>24/7</div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Available</div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={`border-0 shadow-lg backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/80' : 'bg-white/80'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "This invoice generator saved me hours of work. The templates are professional and the process is incredibly smooth."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mr-3"></div>
                  <div>
                    <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Sarah Johnson</div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Freelance Designer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-lg backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/80' : 'bg-white/80'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "Perfect for my small business. No registration required and the invoices look professional. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mr-3"></div>
                  <div>
                    <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mike Chen</div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Small Business Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-lg backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/80' : 'bg-white/80'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "The best free invoice generator I've found. Clean interface, fast generation, and beautiful PDFs."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mr-3"></div>
                  <div>
                    <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Emma Davis</div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Consultant</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Invoice Generator Section */}
        <div id="generator" className="mb-16">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Ready to Create Your Invoice?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Follow our simple 4-step process to generate your professional invoice in minutes
            </p>
          </div>
          <InvoiceGenerator />
        </div>

        {/* Footer CTA */}
        <div className={`text-center py-12 rounded-2xl backdrop-blur-sm ${
          darkMode ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Need Help Getting Started?
          </h3>
          <p className={`mb-6 max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            darkMode 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .dark-gradient-text {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
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
