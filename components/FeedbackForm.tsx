"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function FeedbackForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    // THAY YOUR_ACCESS_KEY BẰNG KEY CỦA BẠN
    formData.append("access_key", "73aaed09-cb7b-4433-8587-6177c74c51b3");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white  border-slate-200  rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-slate-900  mb-2 flex items-center gap-2">
        Góp ý & Báo lỗi
      </h2>
      <p className="text-sm text-slate-500  mb-6">
        Bạn thấy thông tin chưa chính xác hoặc có ý tưởng cải thiện? Hãy cho
        chúng tôi biết!
      </p>

      {status === "success" ? (
        <div className="p-4 bg-green-50  text-green-700 dark:text-green-400 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
          <span>Cảm ơn bạn! Góp ý của bạn đã được gửi thành công.</span>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid items-center justify-center grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Họ tên
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-slate-300 text-black rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Không bắt buộc"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700  mb-1">
                Email liên hệ
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-slate-300  text-black rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Không bắt buộc"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700  mb-1">
              Nội dung góp ý <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 text-black rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
              placeholder="Nhập nội dung bạn muốn góp ý..."
            ></textarea>
          </div>

          {status === "error" && (
            <div className="text-red-500 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Có lỗi xảy ra, vui lòng thử
              lại sau.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-all text-sm"
          >
            {status === "loading" ? (
              "Đang gửi..."
            ) : (
              <>
                <Send className="w-4 h-4" /> Gửi Góp Ý
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
