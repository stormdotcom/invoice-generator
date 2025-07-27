'use client';

import { useState } from 'react';
import { StepperIndicator } from './StepperIndicator';
import { Step1PartyInfo } from './Step1PartyInfo';
import { Step2InvoiceItems } from './Step2InvoiceItems';
import { Step3Summary } from './Step3Summary';
import { Step4Confirmation } from './Step4Confirmation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, ShoppingBag, Calculator, CheckCircle2 } from 'lucide-react';

export interface PartyInfo {
  from: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  to: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  date: string;
  invoiceNumber: string;
}

export interface InvoiceItem {
  id: string;
  itemNumber: string;
  description: string;
  hsnNumber: string;
  rate: number;
  quantity: number;
  total: number;
}

export interface InvoiceData {
  partyInfo: PartyInfo;
  items: InvoiceItem[];
  discount: number;
  discountType: 'percentage' | 'amount';
  subtotal: number;
  discountAmount: number;
  netTotal: number;
}

const steps = [
  { id: 1, name: 'Party Information', description: 'Add Basic details', icon: Users },
  { id: 2, name: 'Invoice Items', description: 'Add items and services', icon: ShoppingBag },
  { id: 3, name: 'Summary', description: 'Review and apply discount', icon: Calculator },
  { id: 4, name: 'Confirmation', description: 'Generate invoice', icon: CheckCircle2 },
];

export function InvoiceGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    partyInfo: {
      from: {
        name: 'A S Electricals',
        address: 'Kariyil, Kazhakkoottam, Thiruvananthapuram, Kerala 695301',
        city: 'Thiruvananthapuram',
        state: 'Kerala',
        zipCode: '695301',
        phone: '095393 31517',
        email: 'info@aselectricals.com',
      },
      to: {
        name: 'Sample Client',
        address: '123 Main Street, City Center',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        phone: '+91 98765 43210',
        email: 'client@example.com',
      },
      date: new Date().toISOString().split('T')[0],
      invoiceNumber: `INV-${Date.now()}`,
    },
    items: [
      {
        id: '1',
        itemNumber: '1',
        description: 'Electrical Installation Service',
        hsnNumber: '998314',
        rate: 1500,
        quantity: 1,
        total: 1500,
      },
      {
        id: '2',
        itemNumber: '2',
        description: 'Wiring and Cable Work',
        hsnNumber: '998314',
        rate: 800,
        quantity: 2,
        total: 1600,
      }
    ],
    discount: 10,
    discountType: 'percentage',
    subtotal: 3100,
    discountAmount: 310,
    netTotal: 2790,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!invoiceData.partyInfo.from.name) newErrors['from.name'] = 'Company name is required';
      if (!invoiceData.partyInfo.from.address) newErrors['from.address'] = 'Address is required';
      if (!invoiceData.partyInfo.to.name) newErrors['to.name'] = 'Client name is required';
      if (!invoiceData.partyInfo.to.address) newErrors['to.address'] = 'Client address is required';
      if (!invoiceData.partyInfo.date) newErrors['date'] = 'Date is required';
    }

    if (step === 2) {
      if (invoiceData.items.length === 0) {
        newErrors['items'] = 'At least one item is required';
      } else {
        invoiceData.items.forEach((item, index) => {
          if (!item.description) newErrors[`items.${index}.description`] = 'Description is required';
          if (!item.rate || item.rate <= 0) newErrors[`items.${index}.rate`] = 'Rate must be greater than 0';
          if (!item.quantity || item.quantity <= 0) newErrors[`items.${index}.quantity`] = 'Quantity must be greater than 0';
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const updatePartyInfo = (partyInfo: PartyInfo) => {
    setInvoiceData(prev => ({ ...prev, partyInfo }));
  };

  const updateItems = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = invoiceData.discountType === 'percentage' 
      ? (subtotal * invoiceData.discount) / 100 
      : invoiceData.discount;
    const netTotal = subtotal - discountAmount;

    setInvoiceData(prev => ({
      ...prev,
      items,
      subtotal,
      discountAmount,
      netTotal,
    }));
  };

  const updateDiscount = (discount: number, discountType: 'percentage' | 'amount') => {
    const discountAmount = discountType === 'percentage' 
      ? (invoiceData.subtotal * discount) / 100 
      : discount;
    const netTotal = invoiceData.subtotal - discountAmount;

    setInvoiceData(prev => ({
      ...prev,
      discount,
      discountType,
      discountAmount,
      netTotal,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PartyInfo
            partyInfo={invoiceData.partyInfo}
            onUpdate={updatePartyInfo}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2InvoiceItems
            items={invoiceData.items}
            onUpdate={updateItems}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3Summary
            invoiceData={invoiceData}
            onUpdateDiscount={updateDiscount}
            onEditStep={setCurrentStep}
          />
        );
      case 4:
        return <Step4Confirmation invoiceData={invoiceData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-violet-100">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
          <StepperIndicator steps={steps} currentStep={currentStep} />
        </div>
        
        <div className="p-4 sm:p-6 lg:p-8">
          {renderStep()}
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-violet-50 border-t border-violet-100 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center justify-center gap-2 order-2 sm:order-1 border-violet-200 hover:bg-violet-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 order-1 sm:order-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
