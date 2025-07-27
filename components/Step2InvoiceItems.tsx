'use client';

import { useState } from 'react';
import { InvoiceItem } from './InvoiceGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ShoppingBag, Package, FileText, Hash, DollarSign, Calculator } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Invoice Items</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Add items and services to your invoice</p>
      </div>

      <Card className="border-2 border-violet-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-violet-700">
            <ShoppingBag className="w-5 h-5" />
            Items & Services
          </CardTitle>
          <CardDescription>
            Add all items, products, or services for this invoice
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors['items'] && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors['items']}</p>
            </div>
          )}

          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8 sm:py-12 border-2 border-dashed border-violet-200 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50">
                <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-violet-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No items added yet</p>
                <Button onClick={addItem} className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Item
                </Button>
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-4 pb-3 border-b-2 border-violet-100 font-semibold text-violet-700 text-sm">
                  <div className="col-span-1">Item #</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-2">HSN Number</div>
                  <div className="col-span-2">Rate</div>
                  <div className="col-span-1">Qty</div>
                  <div className="col-span-2">Total</div>
                </div>

                {/* Items */}
                {items.map((item, index) => (
                  <div key={item.id} className="border-2 border-violet-100 rounded-xl p-4 space-y-4 lg:space-y-0 bg-gradient-to-br from-white to-violet-50 shadow-sm hover:shadow-md transition-shadow">
                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-violet-700 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Item #{item.itemNumber}
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <Label className="flex items-center gap-2 text-sm font-medium">
                          <FileText className="w-4 h-4 text-violet-500" />
                          Description *
                        </Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className={errors[`items.${index}.description`] ? 'border-red-500' : ''}
                          placeholder="Item description"
                        />
                        {errors[`items.${index}.description`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.description`]}</p>
                        )}
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 text-sm font-medium">
                          <Hash className="w-4 h-4 text-violet-500" />
                          HSN Number
                        </Label>
                        <Input
                          value={item.hsnNumber}
                          onChange={(e) => updateItem(item.id, 'hsnNumber', e.target.value)}
                          placeholder="HSN Code"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="flex items-center gap-2 text-sm font-medium">
                            <DollarSign className="w-4 h-4 text-violet-500" />
                            Rate *
                          </Label>
                          <Input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                            className={errors[`items.${index}.rate`] ? 'border-red-500' : ''}
                            placeholder="0.00"
                          />
                          {errors[`items.${index}.rate`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.rate`]}</p>
                          )}
                        </div>
                        <div>
                          <Label className="flex items-center gap-2 text-sm font-medium">
                            <Package className="w-4 h-4 text-violet-500" />
                            Qty *
                          </Label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className={errors[`items.${index}.quantity`] ? 'border-red-500' : ''}
                            placeholder="1"
                          />
                          {errors[`items.${index}.quantity`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.quantity`]}</p>
                          )}
                        </div>
                        <div>
                          <Label className="flex items-center gap-2 text-sm font-medium">
                            <Calculator className="w-4 h-4 text-violet-500" />
                            Total
                          </Label>
                          <div className="px-3 py-2 bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-lg font-semibold text-violet-700">
                            ${item.total.toFixed(2)}
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
                        />
                      </div>
                      <div className="col-span-4">
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className={errors[`items.${index}.description`] ? 'border-red-500' : ''}
                          placeholder="Item description"
                        />
                        {errors[`items.${index}.description`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.description`]}</p>
                        )}
                      </div>
                      <div className="col-span-2">
                        <Input
                          value={item.hsnNumber}
                          onChange={(e) => updateItem(item.id, 'hsnNumber', e.target.value)}
                          placeholder="HSN Code"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className={errors[`items.${index}.rate`] ? 'border-red-500' : ''}
                          placeholder="0.00"
                        />
                        {errors[`items.${index}.rate`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.rate`]}</p>
                        )}
                      </div>
                      <div className="col-span-1">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className={errors[`items.${index}.quantity`] ? 'border-red-500' : ''}
                          placeholder="1"
                        />
                        {errors[`items.${index}.quantity`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.quantity`]}</p>
                        )}
                      </div>
                      <div className="col-span-1">
                        <div className="px-3 py-2 bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-lg font-semibold text-violet-700">
                          ${item.total.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 w-full border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t-2 border-violet-100 gap-4">
                  <Button
                    variant="outline"
                    onClick={addItem}
                    className="flex items-center gap-2 border-violet-200 hover:bg-violet-50 order-2 sm:order-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </Button>

                  <div className="text-center sm:text-right order-1 sm:order-2">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">${subtotal.toFixed(2)}</p>
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