'use client';

import { PartyInfo } from './InvoiceGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, UserCheck, Calendar, Hash, MapPin, Phone, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Step1PartyInfoProps {
  partyInfo: PartyInfo;
  onUpdate: (partyInfo: PartyInfo) => void;
  errors: Record<string, string>;
}

export function Step1PartyInfo({ partyInfo, onUpdate, errors }: Step1PartyInfoProps) {
  const handleChange = (section: 'from' | 'to', field: string, value: string) => {
    onUpdate({
      ...partyInfo,
      [section]: {
        ...partyInfo[section],
        [field]: value,
      },
    });
  };

  const handleDateChange = (field: string, value: string) => {
    onUpdate({
      ...partyInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Party Information</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Enter your company details and client information</p>
      </div>

      <Accordion type="multiple" defaultValue={["to"]} className="space-y-4">
        {/* From Section */}
        <AccordionItem value="from" className="border-2 border-violet-100 shadow-lg rounded-lg">
          <AccordionTrigger className="bg-gradient-to-r from-violet-50 to-purple-50 px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2 text-violet-700 text-lg font-semibold">
              <Building2 className="w-5 h-5" />
              From (Your Company)
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="pt-4 space-y-4">
              <div>
                <Label htmlFor="from-name" className="flex items-center gap-2 text-sm font-medium">
                  <Building2 className="w-4 h-4 text-violet-500" />
                  Company Name *
                </Label>
                <Input
                  id="from-name"
                  value={partyInfo.from.name}
                  onChange={(e) => handleChange('from', 'name', e.target.value)}
                  className={errors['from.name'] ? 'border-red-500' : ''}
                  placeholder="Your Company Name"
                />
                {errors['from.name'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['from.name']}</p>
                )}
              </div>

              <div>
                <Label htmlFor="from-address" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-violet-500" />
                  Address *
                </Label>
                <Input
                  id="from-address"
                  value={partyInfo.from.address}
                  onChange={(e) => handleChange('from', 'address', e.target.value)}
                  className={errors['from.address'] ? 'border-red-500' : ''}
                  placeholder="Street Address"
                />
                {errors['from.address'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['from.address']}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="from-city">City</Label>
                  <Input
                    id="from-city"
                    value={partyInfo.from.city}
                    onChange={(e) => handleChange('from', 'city', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="from-state">State</Label>
                  <Input
                    id="from-state"
                    value={partyInfo.from.state}
                    onChange={(e) => handleChange('from', 'state', e.target.value)}
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="from-zipCode">ZIP Code</Label>
                  <Input
                    id="from-zipCode"
                    value={partyInfo.from.zipCode}
                    onChange={(e) => handleChange('from', 'zipCode', e.target.value)}
                    placeholder="ZIP Code"
                  />
                </div>
                <div>
                  <Label htmlFor="from-phone" className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="w-4 h-4 text-violet-500" />
                    Phone
                  </Label>
                  <Input
                    id="from-phone"
                    value={partyInfo.from.phone}
                    onChange={(e) => handleChange('from', 'phone', e.target.value)}
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="from-email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-violet-500" />
                  Email
                </Label>
                <Input
                  id="from-email"
                  type="email"
                  value={partyInfo.from.email}
                  onChange={(e) => handleChange('from', 'email', e.target.value)}
                  placeholder="email@company.com"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* To Section */}
        <AccordionItem value="to" className="border-2 border-emerald-100 shadow-lg rounded-lg">
          <AccordionTrigger className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2 text-emerald-700 text-lg font-semibold">
              <UserCheck className="w-5 h-5" />
              To (Client)
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="pt-4 space-y-4">
              <div>
                <Label htmlFor="to-name" className="flex items-center gap-2 text-sm font-medium">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  Client Name *
                </Label>
                <Input
                  id="to-name"
                  value={partyInfo.to.name}
                  onChange={(e) => handleChange('to', 'name', e.target.value)}
                  className={errors['to.name'] ? 'border-red-500' : ''}
                  placeholder="Client Name"
                />
                {errors['to.name'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['to.name']}</p>
                )}
              </div>

              <div>
                <Label htmlFor="to-address" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Address *
                </Label>
                <Input
                  id="to-address"
                  value={partyInfo.to.address}
                  onChange={(e) => handleChange('to', 'address', e.target.value)}
                  className={errors['to.address'] ? 'border-red-500' : ''}
                  placeholder="Client Address"
                />
                {errors['to.address'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['to.address']}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="to-city">City</Label>
                  <Input
                    id="to-city"
                    value={partyInfo.to.city}
                    onChange={(e) => handleChange('to', 'city', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="to-state">State</Label>
                  <Input
                    id="to-state"
                    value={partyInfo.to.state}
                    onChange={(e) => handleChange('to', 'state', e.target.value)}
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="to-zipCode">ZIP Code</Label>
                  <Input
                    id="to-zipCode"
                    value={partyInfo.to.zipCode}
                    onChange={(e) => handleChange('to', 'zipCode', e.target.value)}
                    placeholder="ZIP Code"
                  />
                </div>
                <div>
                  <Label htmlFor="to-phone" className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    Phone
                  </Label>
                  <Input
                    id="to-phone"
                    value={partyInfo.to.phone}
                    onChange={(e) => handleChange('to', 'phone', e.target.value)}
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="to-email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  Email
                </Label>
                <Input
                  id="to-email"
                  type="email"
                  value={partyInfo.to.email}
                  onChange={(e) => handleChange('to', 'email', e.target.value)}
                  placeholder="client@email.com"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Invoice Details */}
      <Card className="border-2 border-indigo-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-700 text-lg">
            <Calendar className="w-5 h-5" />
            Invoice Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Invoice Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={partyInfo.date}
                onChange={(e) => handleDateChange('date', e.target.value)}
                className={errors['date'] ? 'border-red-500' : 'focus:border-indigo-500'}
              />
              {errors['date'] && (
                <p className="text-red-500 text-sm mt-1">{errors['date']}</p>
              )}
            </div>
            <div>
              <Label htmlFor="invoiceNumber" className="flex items-center gap-2 text-sm font-medium">
                <Hash className="w-4 h-4 text-indigo-500" />
                Invoice Number
              </Label>
              <Input
                id="invoiceNumber"
                value={partyInfo.invoiceNumber}
                onChange={(e) => handleDateChange('invoiceNumber', e.target.value)}
                placeholder="INV-001"
                className="focus:border-indigo-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
