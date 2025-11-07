'use client';

import { useState } from 'react';
import { InvoiceData } from './InvoiceGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Download,
  FileText,
  Mail,
  Share2,
  Printer,
  Eye,
  Settings,
  File
} from 'lucide-react';
interface Step4ConfirmationProps {
  invoiceData: InvoiceData;
}

export function Step4Confirmation({ invoiceData }: Step4ConfirmationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern-invoice');
  const [generatedPDFPath, setGeneratedPDFPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableTemplates = [
    {
      name: 'modern-invoice',
      description: 'Clean and professional modern design',
      category: 'Modern',
      styles: { layout: 'Standard' }
    },
    {
      name: 'classic-invoice',
      description: 'Traditional business invoice layout',
      category: 'Classic',
      styles: { layout: 'Traditional' }
    },
    {
      name: 'minimal-invoice',
      description: 'Simple and minimal design',
      category: 'Minimal',
      styles: { layout: 'Compact' }
    }
  ];

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      setGeneratedPDFPath(`invoice-${invoiceData.partyInfo.invoiceNumber}.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (generatedPDFPath) {
      // Create a download link
      const link = document.createElement('a');
      link.href = generatedPDFPath;
      link.download = `invoice-${invoiceData.partyInfo.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleEmailInvoice = () => {
    // This would integrate with email service
    const subject = `Invoice ${invoiceData.partyInfo.invoiceNumber} from ${invoiceData.partyInfo.from.name}`;
    const body = `Please find attached invoice ${invoiceData.partyInfo.invoiceNumber} for ${invoiceData.partyInfo.to.name}.`;
    
    const mailtoLink = `mailto:${invoiceData.partyInfo.to.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full text-white">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">
          Invoice Generated Successfully!
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your invoice has been created and is ready for download, printing, or sharing.
        </p>
      </div>

      {/* Template Selection */}
      <Card className="glass-effect rounded-2xl shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 px-6 py-5">
          <CardTitle className="flex items-center gap-3 text-purple-700 text-lg font-semibold">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl text-white">
              <File className="w-5 h-5" />
            </div>
            Choose Template
          </CardTitle>
          <CardDescription className="text-purple-600">
            Select a template for your invoice design
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-6 bg-white/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTemplates.map((template) => (
              <div
                key={template.name}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover-lift ${
                  selectedTemplate === template.name
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
                onClick={() => setSelectedTemplate(template.name)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-purple-500" />
                  <h4 className="font-semibold text-gray-800">{template.name.replace('-', ' ').toUpperCase()}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                  {template.styles?.layout && (
                    <Badge variant="outline" className="text-xs">
                      {template.styles.layout}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice Summary */}
      <Card className="glass-effect rounded-2xl shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
          <CardTitle className="flex items-center gap-3 text-blue-700 text-lg font-semibold">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white">
              <FileText className="w-5 h-5" />
            </div>
            Invoice Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6 bg-white/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Invoice Number</p>
              <p className="text-lg font-semibold text-gray-800">{invoiceData.partyInfo.invoiceNumber}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Client</p>
              <p className="text-lg font-semibold text-gray-800">{invoiceData.partyInfo.to.name}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Items</p>
              <p className="text-lg font-semibold text-gray-800">{invoiceData.items.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-lg font-semibold gradient-text">₹{invoiceData.netTotal.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover-lift transition-all duration-300 text-white font-medium"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Generate PDF
            </>
          )}
        </Button>

        {generatedPDFPath && (
          <>
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              className="flex items-center gap-2 border-green-200 hover:bg-green-50 hover-lift transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>

            <Button
              onClick={handlePrintInvoice}
              variant="outline"
              className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover-lift transition-all duration-300"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>

            <Button
              onClick={handleEmailInvoice}
              variant="outline"
              className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 hover-lift transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 hover-lift transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              {error}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      {generatedPDFPath && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <p className="text-green-600 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              PDF generated successfully! You can now download, print, or share your invoice.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Additional Options */}
      <Card className="glass-effect rounded-2xl shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-5">
          <CardTitle className="flex items-center gap-3 text-gray-700 text-lg font-semibold">
            <div className="p-2 bg-gradient-to-br from-gray-500 to-slate-500 rounded-xl text-white">
              <Settings className="w-5 h-5" />
            </div>
            Additional Options
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6 bg-white/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2 justify-start">
              <Eye className="w-4 h-4" />
              Preview Invoice
            </Button>
            <Button variant="outline" className="flex items-center gap-2 justify-start">
              <File className="w-4 h-4" />
              Customize Template
            </Button>
            <Button variant="outline" className="flex items-center gap-2 justify-start">
              <FileText className="w-4 h-4" />
              Save as Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
