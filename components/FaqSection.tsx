'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_LIST } from '@/data/faqData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Mở sẵn câu đầu tiên

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-6">
      

      <div className="space-y-3">
        {FAQ_LIST.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/30"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                  {item.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}