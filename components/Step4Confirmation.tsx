'use client';

import { InvoiceData } from './InvoiceGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, FileText, Mail, Printer, Sparkles, Calendar, Hash, Building2, UserCheck } from 'lucide-react';

interface Step4ConfirmationProps {
  invoiceData: InvoiceData;
}

export function Step4Confirmation({ invoiceData }: Step4ConfirmationProps) {
  const handleGenerateInvoice = () => {
    // This is where you would integrate with your document generation service
    console.log('Generating invoice with data:', invoiceData);
    
    // For demo purposes, we'll just show an alert
    alert('Invoice generation would be implemented here!\n\nData has been logged to console.');
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF...');
    alert('PDF download would be implemented here!');
  };

  const handleEmailInvoice = () => {
    console.log('Emailing invoice...');
    alert('Email functionality would be implemented here!');
  };

  const handlePrintInvoice = () => {
    console.log('Printing invoice...');
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-4 relative">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
          <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Invoice Ready!</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Your invoice has been prepared and is ready to generate</p>
      </div>

      {/* Final Invoice Summary */}
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <FileText className="w-5 h-5" />
            Final Invoice Summary
          </CardTitle>
          <CardDescription>Review your complete invoice details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-emerald-700 flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4" />
                  Invoice Details
                </h4>
                <p className="text-sm flex items-center gap-2">
                  <Hash className="w-3 h-3 text-emerald-500" />
                  Invoice #: {invoiceData.partyInfo.invoiceNumber}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-emerald-500" />
                  Date: {new Date(invoiceData.partyInfo.date).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-emerald-700 flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4" />
                  From
                </h4>
                <p className="text-sm font-medium">{invoiceData.partyInfo.from.name}</p>
                <p className="text-sm text-gray-600">{invoiceData.partyInfo.from.email}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-emerald-700 flex items-center gap-2 mb-1">
                  <UserCheck className="w-4 h-4" />
                  To
                </h4>
                <p className="text-sm font-medium">{invoiceData.partyInfo.to.name}</p>
                <p className="text-sm text-gray-600">{invoiceData.partyInfo.to.email}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-1">Items</h4>
                <p className="text-sm">{invoiceData.items.length} item{invoiceData.items.length !== 1 ? 's' : ''}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                {invoiceData.discount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount:</span>
                    <span>-${invoiceData.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-emerald-200">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">${invoiceData.netTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="border-2 border-violet-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-violet-700">Generate & Export Options</CardTitle>
          <CardDescription>Choose how you want to handle your invoice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Button
              onClick={handleGenerateInvoice}
              className="flex flex-col items-center gap-2 h-auto py-4 sm:py-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg text-xs sm:text-sm"
            >
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Generate Invoice</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              className="flex flex-col items-center gap-2 h-auto py-4 sm:py-6 border-violet-200 hover:bg-violet-50 text-xs sm:text-sm"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Download PDF</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleEmailInvoice}
              className="flex flex-col items-center gap-2 h-auto py-4 sm:py-6 border-violet-200 hover:bg-violet-50 text-xs sm:text-sm"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Email Invoice</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handlePrintInvoice}
              className="flex flex-col items-center gap-2 h-auto py-4 sm:py-6 border-violet-200 hover:bg-violet-50 text-xs sm:text-sm"
            >
              <Printer className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Print Invoice</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Summary for Development */}
      <Card className="bg-gradient-to-r from-gray-50 to-violet-50 border border-violet-100">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-violet-700">Developer Information</CardTitle>
          <CardDescription className="text-xs">
            This data would be passed to your document generation service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <details className="text-xs">
            <summary className="cursor-pointer font-medium mb-2">View Invoice Data Structure</summary>
            <pre className="bg-white p-3 rounded-lg border border-violet-200 overflow-auto max-h-64 text-xs scrollbar-thin">
              {JSON.stringify(invoiceData, null, 2)}
            </pre>
          </details>
        </CardContent>
      </Card>

      {/* Success Message */}
      <div className="text-center py-4 sm:py-6">
        <p className="text-gray-600 mb-4">
          Your invoice has been successfully prepared! Click "Generate Invoice" to create the final document.
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
          <span>✓ Form validated</span>
          <span>✓ Calculations verified</span>
          <span>✓ Ready to export</span>
        </div>
      </div>
    </div>
  );
}