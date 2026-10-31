'use client';
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm space-y-2">
        <p className="font-semibold text-slate-300 ">
          Trang web hỗ trợ tra cứu thông tin Nghĩa vụ Công an Nhân dân
        </p>
        <p>Tham khảo theo quy định tại Thông tư 62/2023/TT-BCA và Thông tư 105/2023/TT-BQP.</p>
        <p className="text-xs text-slate-500 pt-4 border-t border-slate-800">
         © 2026 NVCA Support Project. Phát triển bằng Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}