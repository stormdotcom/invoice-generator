'use client';

import { Check, LucideIcon } from 'lucide-react';

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
  const getStepColor = (stepId: number) => {
    const colors = [
      'from-pink-500 to-rose-500',
      'from-blue-500 to-indigo-500', 
      'from-green-500 to-emerald-500',
      'from-purple-500 to-violet-500'
    ];
    return colors[(stepId - 1) % colors.length];
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-thin">
      <div className="flex items-center justify-between min-w-max px-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-sm font-semibold
                  transition-all duration-500 hover-lift
                  ${
                    currentStep > step.id
                      ? `bg-gradient-to-br ${getStepColor(step.id)} text-white shadow-xl scale-110 pulse-glow`
                      : currentStep === step.id
                      ? 'bg-white text-violet-600 border-2 border-white shadow-2xl scale-125 hover-lift'
                      : 'bg-white/20 text-white/70 backdrop-blur-sm hover:bg-white/30'
                  }
                `}
              >
                {currentStep > step.id ? (
                  <Check className="w-6 h-6 sm:w-7 sm:h-7" />
                ) : (
                  <step.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                )}
              </div>
              <div className="mt-3 sm:mt-4 text-center max-w-24 sm:max-w-28">
                <p className="text-sm sm:text-base font-semibold text-white truncate drop-shadow-sm">
                  {step.name}
                </p>
                <p className="text-xs sm:text-sm text-white/80 hidden sm:block mt-1">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  h-1 w-12 sm:w-16 lg:w-20 mx-3 sm:mx-6 rounded-full transition-all duration-700
                  ${
                    currentStep > step.id 
                      ? `bg-gradient-to-r ${getStepColor(step.id)} shadow-lg` 
                      : 'bg-white/30'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
