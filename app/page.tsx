import BmiCalculator from "@/components/BmiCalculator";
import SelfChecklist from "@/components/SelfChecklist";
import DetailedHealthCheck from "@/components/DetailedHealthCheck";
import TimelineSection from "@/components/TimelineSection";
import FaqSection from "@/components/FaqSection";
import ScrollProgress from "@/components/ScrollProgress"; // 👈 Import thanh tiến trình
import FeedbackForm from "@/components/FeedbackForm";     // 👈 Import form góp ý
import { ShieldCheck, Activity, Eye, Clock, HelpCircle, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Thanh tiến trình chạy ngang trên cùng */}
      <ScrollProgress />

      <div className="space-y-12 pb-20">
        {/* 1. Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-white py-12 px-4 shadow-md transition-colors">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-500/30 dark:bg-slate-800/80 border border-blue-400/30 text-blue-100 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              Tiêu chuẩn tuyển chọn Công an Nhân dân 2027
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Tra Cứu Sức Khỏe & Điều Kiện NVCA
            </h1>
            <p className="text-blue-100/90 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Hệ thống hỗ trợ công dân tự đánh giá chỉ số thể lực (BMI), phân loại
              sức khỏe chi tiết và theo dõi lộ trình sơ tuyển chuẩn xác.
            </p>
          </div>
        </section>

        {/* Danh sách các công cụ xếp dọc gọn gàng */}
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          {/* Mục 1: Tính BMI */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                1. Kiểm Tra Chỉ Số Thể Lực (BMI)
              </h2>
            </div>
            <BmiCalculator />
          </section>

          {/* Mục 2: Tra cứu sức khỏe chi tiết */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                2. Tra Cứu Sức Khỏe Chi Tiết (Mắt, Răng, Hình Xăm)
              </h2>
            </div>
            <DetailedHealthCheck />
          </section>

          {/* Mục 3: Trắc nghiệm sơ tuyển */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                3. Trắc Nghiệm Sơ Tuyển Nhanh
              </h2>
            </div>
            <SelfChecklist />
          </section>

          {/* Mục 4: Lộ trình & Đếm ngược */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                4. Lộ Trình & Đếm Ngược Thời Gian
              </h2>
            </div>
            <TimelineSection />
          </section>

          {/* Mục 5: Câu hỏi thường gặp */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center">
                Giải Đáp Câu Hỏi Thường Gặp (FAQ)
              </h2>
            </div>
            <FaqSection />
          </section>

          {/* Mục 6: Form Góp Ý (Mới thêm) */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center">
                Gửi Góp Ý Cho Chúng Tôi
              </h2>
            </div>
            <FeedbackForm />
          </section>
          
        </div>
      </div>
    </>
  );
}