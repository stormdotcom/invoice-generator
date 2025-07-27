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
  { id: 1, name: 'Party Information', description: 'From, To & Date details', icon: Users },
  { id: 2, name: 'Invoice Items', description: 'Add items and services', icon: ShoppingBag },
  { id: 3, name: 'Summary', description: 'Review and apply discount', icon: Calculator },
  { id: 4, name: 'Confirmation', description: 'Generate invoice', icon: CheckCircle2 },
];

export function InvoiceGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    partyInfo: {
      from: {
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
      },
      to: {
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
      },
      date: new Date().toISOString().split('T')[0],
      invoiceNumber: `INV-${Date.now()}`,
    },
    items: [],
    discount: 0,
    discountType: 'percentage',
    subtotal: 0,
    discountAmount: 0,
    netTotal: 0,
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