'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true);
    // Đổi sang sessionStorage: Đóng tab là mất
    try {
      const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
      if (!hasSeenModal) {
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Lỗi truy cập sessionStorage:", error);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      // Lưu vào sessionStorage
      sessionStorage.setItem('hasSeenWelcomeModal', 'true');
    } catch (error) {
      console.error("Lỗi lưu sessionStorage:", error);
    }
  };

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-slate-800 dark:text-slate-100 transition-colors">
        
        {/* Icon & Tiêu đề */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Thông báo quan trọng
            </span>
            <h2 className="text-xl font-bold">Lưu ý trước khi sử dụng</h2>
          </div>
        </div>

        {/* Nội dung thông báo */}
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Trang web này được xây dựng nhằm mục đích <strong className="text-slate-900 dark:text-white">tham khảo, tự đánh giá nhanh</strong> các điều kiện, chỉ số thể lực và lộ trình sơ tuyển Nghĩa vụ Công an Nhân dân.
          </p>
          <p className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-300 text-xs">
            ⚠️ <strong>Lưu ý:</strong> Kết quả trên hệ thống chỉ mang tính chất dự kiến dựa trên thông tư quy định. Tiêu chuẩn chính thức quyết định thuộc về Hội đồng tuyển chọn của cơ quan Công an có thẩm quyền.
          </p>
        </div>

        {/* Nút hành động */}
        <button
          onClick={handleClose}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-blue-500/25 transition-all transform active:scale-98"
        >
          <CheckCircle2 className="w-5 h-5" />
          Đã hiểu & Tiếp tục
        </button>

      </div>
    </div>
  );
}