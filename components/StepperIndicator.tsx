'use client';

import { Check, DivideIcon as LucideIcon } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
}

interface StepperIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepperIndicator({ steps, currentStep }: StepperIndicatorProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-thin">
      <div className="flex items-center justify-between min-w-max px-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-sm font-semibold
                  transition-all duration-300
                  ${
                    currentStep > step.id
                      ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg scale-105'
                      : currentStep === step.id
                      ? 'bg-white text-violet-600 border-2 border-white shadow-lg scale-110'
                      : 'bg-white/20 text-white/70 backdrop-blur-sm'
                  }
                `}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>
              <div className="mt-2 sm:mt-3 text-center max-w-20 sm:max-w-24">
                <p className="text-xs sm:text-sm font-medium text-white truncate">{step.name}</p>
                <p className="text-xs text-white/80 hidden sm:block">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  h-1 w-8 sm:w-12 lg:w-16 mx-2 sm:mx-4 rounded-full transition-all duration-500
                  ${currentStep > step.id ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-white/30'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}