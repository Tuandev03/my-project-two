'use client';

import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number; // 1, 2, hoặc 3
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = [
    { id: 1, label: 'Chỉ số BMI' },
    { id: 2, label: 'Sức khỏe chi tiết' },
    { id: 3, label: 'Trắc nghiệm' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between relative">
        {/* Đường kẻ nền (màu xám) */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded-full"></div>
        
        {/* Đường kẻ tiến trình (màu xanh) */}
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : isCompleted
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <span
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  isActive || isCompleted
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}