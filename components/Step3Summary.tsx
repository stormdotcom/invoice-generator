'use client';

import { InvoiceData } from './InvoiceGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Receipt, Tag, Users, Building2, UserCheck, Calendar, Hash, Percent, DollarSign, Calculator } from 'lucide-react';

interface Step3SummaryProps {
  invoiceData: InvoiceData;
  onUpdateDiscount: (discount: number, discountType: 'percentage' | 'amount') => void;
  onEditStep: (step: number) => void;
}

export function Step3Summary({ invoiceData, onUpdateDiscount, onEditStep }: Step3SummaryProps) {
  const handleDiscountChange = (value: string) => {
    onUpdateDiscount(parseFloat(value) || 0, invoiceData.discountType);
  };

  const handleDiscountTypeChange = (type: 'percentage' | 'amount') => {
    onUpdateDiscount(invoiceData.discount, type);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Invoice Summary</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Review your invoice details and apply discount if needed</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Party Information Summary */}
        <Card className="border-2 border-violet-100 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-violet-700">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Party Information
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditStep(1)}
                className="flex items-center gap-2 border-violet-200 hover:bg-violet-50 text-xs sm:text-sm"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-violet-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  From:
                </h4>
                <div className="text-sm">
                  <p className="font-medium">{invoiceData.partyInfo.from.name}</p>
                  <p>{invoiceData.partyInfo.from.address}</p>
                  {invoiceData.partyInfo.from.city && (
                    <p>
                      {invoiceData.partyInfo.from.city}, {invoiceData.partyInfo.from.state} {invoiceData.partyInfo.from.zipCode}
                    </p>
                  )}
                  {invoiceData.partyInfo.from.phone && <p>Phone: {invoiceData.partyInfo.from.phone}</p>}
                  {invoiceData.partyInfo.from.email && <p>Email: {invoiceData.partyInfo.from.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-emerald-700 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  To:
                </h4>
                <div className="text-sm">
                  <p className="font-medium">{invoiceData.partyInfo.to.name}</p>
                  <p>{invoiceData.partyInfo.to.address}</p>
                  {invoiceData.partyInfo.to.city && (
                    <p>
                      {invoiceData.partyInfo.to.city}, {invoiceData.partyInfo.to.state} {invoiceData.partyInfo.to.zipCode}
                    </p>
                  )}
                  {invoiceData.partyInfo.to.phone && <p>Phone: {invoiceData.partyInfo.to.phone}</p>}
                  {invoiceData.partyInfo.to.email && <p>Email: {invoiceData.partyInfo.to.email}</p>}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-violet-100 space-y-2">
              <p className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <strong>Date:</strong> {new Date(invoiceData.partyInfo.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Hash className="w-4 h-4 text-indigo-500" />
                <strong>Invoice #:</strong> {invoiceData.partyInfo.invoiceNumber}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Items Summary */}
        <Card className="border-2 border-emerald-100 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-emerald-700">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Items ({invoiceData.items.length})
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditStep(2)}
                className="flex items-center gap-2 border-emerald-200 hover:bg-emerald-50 text-xs sm:text-sm"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {invoiceData.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-emerald-800">{item.description}</p>
                    <p className="text-xs text-gray-600">
                      {item.quantity} × ${item.rate.toFixed(2)}
                      {item.hsnNumber && ` • HSN: ${item.hsnNumber}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-700">${item.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discount and Totals */}
      <Card className="border-2 border-indigo-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-700">
            <Tag className="w-5 h-5" />
            Discount & Totals
          </CardTitle>
          <CardDescription>Apply discount and review final amounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="discount" className="flex items-center gap-2 text-sm font-medium">
                  <Tag className="w-4 h-4 text-indigo-500" />
                  Discount
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="discount"
                    type="number"
                    value={invoiceData.discount}
                    onChange={(e) => handleDiscountChange(e.target.value)}
                    placeholder="0"
                    className="flex-1 focus:border-indigo-500"
                  />
                  <Select
                    value={invoiceData.discountType}
                    onValueChange={handleDiscountTypeChange}
                  >
                    <SelectTrigger className="w-20 sm:w-24 border-indigo-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage" className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        %
                      </SelectItem>
                      <SelectItem value="amount" className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        $
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
              </div>
              
              {invoiceData.discount > 0 && (
                <div className="flex justify-between py-2 text-emerald-600">
                  <span>
                    Discount ({invoiceData.discountType === 'percentage' ? `${invoiceData.discount}%` : `$${invoiceData.discount}`}):
                  </span>
                  <span>-${invoiceData.discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-4 border-t-2 border-indigo-100 text-lg font-bold">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  Net Total:
                </div>
                <span className="text-xl sm:text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">${invoiceData.netTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 border-2 border-violet-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-violet-700">
            <Receipt className="w-5 h-5" />
            Invoice Preview
          </CardTitle>
          <CardDescription>This is how your invoice will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-violet-100">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">INVOICE</h2>
              <p className="text-gray-600">{invoiceData.partyInfo.invoiceNumber}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6">
              <div>
                <h3 className="font-semibold text-violet-600 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  From:
                </h3>
                <div className="text-sm">
                  <p className="font-medium">{invoiceData.partyInfo.from.name}</p>
                  <p>{invoiceData.partyInfo.from.address}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-600 mb-2 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  To:
                </h3>
                <div className="text-sm">
                  <p className="font-medium">{invoiceData.partyInfo.to.name}</p>
                  <p>{invoiceData.partyInfo.to.address}</p>
                </div>
              </div>
            </div>
            
            <div className="text-right mb-6">
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                ${invoiceData.netTotal.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                {invoiceData.items.length} item{invoiceData.items.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}