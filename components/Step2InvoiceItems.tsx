'use client';

import { useState } from 'react';
import { InvoiceItem } from './InvoiceGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ShoppingBag, Package, FileText, Hash, Calculator } from 'lucide-react';

interface Step2InvoiceItemsProps {
  items: InvoiceItem[];
  onUpdate: (items: InvoiceItem[]) => void;
  errors: Record<string, string>;
}

export function Step2InvoiceItems({ items, onUpdate, errors }: Step2InvoiceItemsProps) {
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      itemNumber: `${items.length + 1}`,
      description: '',
      hsnNumber: '',
      rate: 0,
      quantity: 1,
      total: 0,
    };
    onUpdate([...items, newItem]);
  };

  const removeItem = (id: string) => {
    onUpdate(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate total when rate or quantity changes
        if (field === 'rate' || field === 'quantity') {
          updatedItem.total = updatedItem.rate * updatedItem.quantity;
        }
        
        return updatedItem;
      }
      return item;
    });
    onUpdate(updatedItems);
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">
          Invoice Items
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Add items and services to your invoice with detailed information
        </p>
      </div>

      <Card className="glass-effect rounded-2xl shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5">
          <CardTitle className="flex items-center gap-3 text-green-700 text-lg font-semibold">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            Items & Services
          </CardTitle>
          <CardDescription className="text-green-600">
            Add all items, products, or services for this invoice
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-6 bg-white/50">
          {errors['items'] && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {errors['items']}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-green-200 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover-lift transition-all duration-300">
                <ShoppingBag className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-6 text-lg">No items added yet</p>
                <Button 
                  onClick={addItem} 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover-lift transition-all duration-300 text-white font-medium"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Item
                </Button>
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-4 pb-4 border-b-2 border-green-100 font-semibold text-green-700 text-sm">
                  <div className="col-span-1">Item #</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-2">HSN Number</div>
                  <div className="col-span-2">Rate</div>
                  <div className="col-span-1">Qty</div>
                  <div className="col-span-2">Total</div>
                </div>

                {/* Items */}
                {items.map((item, index) => (
                  <div key={item.id} className="glass-effect rounded-2xl p-6 space-y-6 lg:space-y-0 shadow-lg hover-lift transition-all duration-300">
                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-green-700 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Item #{item.itemNumber}
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 hover-lift transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FileText className="w-4 h-4 text-green-500" />
                          Description *
                        </Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className={`${errors[`items.${index}.description`] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'} transition-colors duration-200`}
                          placeholder="Item description"
                        />
                        {errors[`items.${index}.description`] && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                            {errors[`items.${index}.description`]}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Hash className="w-4 h-4 text-green-500" />
                          HSN Number
                        </Label>
                        <Input
                          value={item.hsnNumber}
                          onChange={(e) => updateItem(item.id, 'hsnNumber', e.target.value)}
                          placeholder="HSN Code"
                          className="border-gray-200 focus:border-green-500 transition-colors duration-200"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <span className="text-green-500 font-bold text-lg">₹</span>
                            Rate *
                          </Label>
                          <Input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                            className={`${errors[`items.${index}.rate`] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'} transition-colors duration-200`}
                            placeholder="0.00"
                          />
                          {errors[`items.${index}.rate`] && (
                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                              {errors[`items.${index}.rate`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Package className="w-4 h-4 text-green-500" />
                            Qty *
                          </Label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className={`${errors[`items.${index}.quantity`] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'} transition-colors duration-200`}
                            placeholder="1"
                          />
                          {errors[`items.${index}.quantity`] && (
                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                              {errors[`items.${index}.quantity`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Calculator className="w-4 h-4 text-green-500" />
                            Total
                          </Label>
                          <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl font-semibold text-green-700 text-center">
                            ₹{item.total.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-start">
                      <div className="col-span-1">
                        <Input
                          value={item.itemNumber}
                          onChange={(e) => updateItem(item.id, 'itemNumber', e.target.value)}
                          placeholder="#"
                          className="border-gray-200 focus:border-green-500 transition-colors duration-200"
                        />
                      </div>
                      <div className="col-span-4">
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className={`${errors[`items.${index}.description`] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'} transition-colors duration-200`}
                          placeholder="Item description"
                        />
                        {errors[`items.${index}.description`] && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                            {errors[`items.${index}.description`]}
                          </p>
                        )}
                      </div>
                      <div className="col-span-2">
                        <Input
                          value={item.hsnNumber}
                          onChange={(e) => updateItem(item.id, 'hsnNumber', e.target.value)}
                          placeholder="HSN Code"
                          className="border-gray-200 focus:border-green-500 transition-colors duration-200"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className={`${errors[`items.${index}.rate`] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'} transition-colors duration-200`}
                          placeholder="0.00"
                        />
                        {errors[`items.${index}.rate`] && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                            {errors[`items.${index}.rate`]}
                          </p>
                        )}
                      </div>
                      <div className="col-span-1">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className={`${errors[`items.${index}.quantity`] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'} transition-colors duration-200`}
                          placeholder="1"
                        />
                        {errors[`items.${index}.quantity`] && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                            {errors[`items.${index}.quantity`]}
                          </p>
                        )}
                      </div>
                      <div className="col-span-1">
                        <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl font-semibold text-green-700 text-center">
                          ₹{item.total.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 w-full border-red-200 hover:bg-red-50 hover-lift transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t-2 border-green-100 gap-6">
                  <Button
                    variant="outline"
                    onClick={addItem}
                    className="flex items-center gap-2 border-green-200 hover:bg-green-50 order-2 sm:order-1 hover-lift transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </Button>

                  <div className="text-center sm:text-right order-1 sm:order-2">
                    <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                    <p className="text-3xl font-bold gradient-text">₹{subtotal.toFixed(2)}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
