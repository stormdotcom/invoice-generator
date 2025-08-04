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
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">
          Party Information
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Enter your company details and client information to get started
        </p>
      </div>

      <Accordion type="multiple" defaultValue={["to"]} className="space-y-6">
        {/* From Section */}
        <AccordionItem value="from" className="glass-effect rounded-2xl shadow-lg border-0 overflow-hidden">
          <AccordionTrigger className="bg-gradient-to-r from-pink-50 to-rose-50 px-6 py-5 hover:no-underline group">
            <div className="flex items-center gap-3 text-pink-700 text-lg font-semibold">
              <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl text-white">
                <Building2 className="w-5 h-5" />
              </div>
              From (Your Company)
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 bg-white/50">
            <div className="pt-6 space-y-5">
              <div>
                <Label htmlFor="from-name" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 text-pink-500" />
                  Company Name *
                </Label>
                <Input
                  id="from-name"
                  value={partyInfo.from.name}
                  onChange={(e) => handleChange('from', 'name', e.target.value)}
                  className={`${errors['from.name'] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-pink-500'} transition-colors duration-200`}
                  placeholder="Your Company Name"
                />
                {errors['from.name'] && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors['from.name']}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="from-address" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  Address *
                </Label>
                <Input
                  id="from-address"
                  value={partyInfo.from.address}
                  onChange={(e) => handleChange('from', 'address', e.target.value)}
                  className={`${errors['from.address'] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-pink-500'} transition-colors duration-200`}
                  placeholder="Street Address"
                />
                {errors['from.address'] && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors['from.address']}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from-city" className="text-sm font-medium text-gray-600 mb-2 block">City</Label>
                  <Input
                    id="from-city"
                    value={partyInfo.from.city}
                    onChange={(e) => handleChange('from', 'city', e.target.value)}
                    placeholder="City"
                    className="border-gray-200 focus:border-pink-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="from-state" className="text-sm font-medium text-gray-600 mb-2 block">State</Label>
                  <Input
                    id="from-state"
                    value={partyInfo.from.state}
                    onChange={(e) => handleChange('from', 'state', e.target.value)}
                    placeholder="State"
                    className="border-gray-200 focus:border-pink-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from-zipCode" className="text-sm font-medium text-gray-600 mb-2 block">ZIP Code</Label>
                  <Input
                    id="from-zipCode"
                    value={partyInfo.from.zipCode}
                    onChange={(e) => handleChange('from', 'zipCode', e.target.value)}
                    placeholder="ZIP Code"
                    className="border-gray-200 focus:border-pink-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="from-phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-pink-500" />
                    Phone
                  </Label>
                  <Input
                    id="from-phone"
                    value={partyInfo.from.phone}
                    onChange={(e) => handleChange('from', 'phone', e.target.value)}
                    placeholder="Phone Number"
                    className="border-gray-200 focus:border-pink-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="from-email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-pink-500" />
                  Email
                </Label>
                <Input
                  id="from-email"
                  type="email"
                  value={partyInfo.from.email}
                  onChange={(e) => handleChange('from', 'email', e.target.value)}
                  placeholder="email@company.com"
                  className="border-gray-200 focus:border-pink-500 transition-colors duration-200"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* To Section */}
        <AccordionItem value="to" className="glass-effect rounded-2xl shadow-lg border-0 overflow-hidden">
          <AccordionTrigger className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 hover:no-underline group">
            <div className="flex items-center gap-3 text-blue-700 text-lg font-semibold">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white">
                <UserCheck className="w-5 h-5" />
              </div>
              To (Client)
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 bg-white/50">
            <div className="pt-6 space-y-5">
              <div>
                <Label htmlFor="to-name" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <UserCheck className="w-4 h-4 text-blue-500" />
                  Client Name *
                </Label>
                <Input
                  id="to-name"
                  value={partyInfo.to.name}
                  onChange={(e) => handleChange('to', 'name', e.target.value)}
                  className={`${errors['to.name'] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} transition-colors duration-200`}
                  placeholder="Client Name"
                />
                {errors['to.name'] && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors['to.name']}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="to-address" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  Address *
                </Label>
                <Input
                  id="to-address"
                  value={partyInfo.to.address}
                  onChange={(e) => handleChange('to', 'address', e.target.value)}
                  className={`${errors['to.address'] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} transition-colors duration-200`}
                  placeholder="Client Address"
                />
                {errors['to.address'] && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors['to.address']}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="to-city" className="text-sm font-medium text-gray-600 mb-2 block">City</Label>
                  <Input
                    id="to-city"
                    value={partyInfo.to.city}
                    onChange={(e) => handleChange('to', 'city', e.target.value)}
                    placeholder="City"
                    className="border-gray-200 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="to-state" className="text-sm font-medium text-gray-600 mb-2 block">State</Label>
                  <Input
                    id="to-state"
                    value={partyInfo.to.state}
                    onChange={(e) => handleChange('to', 'state', e.target.value)}
                    placeholder="State"
                    className="border-gray-200 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="to-zipCode" className="text-sm font-medium text-gray-600 mb-2 block">ZIP Code</Label>
                  <Input
                    id="to-zipCode"
                    value={partyInfo.to.zipCode}
                    onChange={(e) => handleChange('to', 'zipCode', e.target.value)}
                    placeholder="ZIP Code"
                    className="border-gray-200 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="to-phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-blue-500" />
                    Phone
                  </Label>
                  <Input
                    id="to-phone"
                    value={partyInfo.to.phone}
                    onChange={(e) => handleChange('to', 'phone', e.target.value)}
                    placeholder="Phone Number"
                    className="border-gray-200 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="to-email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email
                </Label>
                <Input
                  id="to-email"
                  type="email"
                  value={partyInfo.to.email}
                  onChange={(e) => handleChange('to', 'email', e.target.value)}
                  placeholder="client@email.com"
                  className="border-gray-200 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Invoice Details */}
      <Card className="glass-effect rounded-2xl shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 px-6 py-5">
          <CardTitle className="flex items-center gap-3 text-purple-700 text-lg font-semibold">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl text-white">
              <Calendar className="w-5 h-5" />
            </div>
            Invoice Details
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6 bg-white/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                Invoice Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={partyInfo.date}
                onChange={(e) => handleDateChange('date', e.target.value)}
                className={`${errors['date'] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'} transition-colors duration-200`}
              />
              {errors['date'] && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors['date']}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="invoiceNumber" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Hash className="w-4 h-4 text-purple-500" />
                Invoice Number
              </Label>
              <Input
                id="invoiceNumber"
                value={partyInfo.invoiceNumber}
                onChange={(e) => handleDateChange('invoiceNumber', e.target.value)}
                placeholder="INV-001"
                className="border-gray-200 focus:border-purple-500 transition-colors duration-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
