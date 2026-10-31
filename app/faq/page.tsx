'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { FAQ_LIST } from '@/data/faqData';

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Mở sẵn câu đầu tiên

  const filteredFaq = FAQ_LIST.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Tiêu đề trang */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
          <HelpCircle className="w-4 h-4" /> Giải đáp thắc mắc tuyển chọn NVCA
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Câu Hỏi Thường Gặp (FAQ)
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Tổng hợp các thắc mắc phổ biến về tiêu chuẩn sức khỏe, quy trình khám tuyển và thủ tục hồ sơ nghĩa vụ Công an.
        </p>
      </div>

      {/* Ô tìm kiếm câu hỏi */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi (VD: cận thị, hình xăm, BMI...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
        />
      </div>

      {/* Danh sách câu hỏi Accordion */}
      <div className="space-y-4">
        {filteredFaq.length > 0 ? (
          filteredFaq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base">
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
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-slate-500 text-sm">
            Không tìm thấy câu hỏi phù hợp với từ khóa của bạn.
          </div>
        )}
      </div>
    </div>
  );
}