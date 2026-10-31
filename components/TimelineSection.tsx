"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  FileText,
  Users,
  Stethoscope,
  CheckSquare,
  Award,
} from "lucide-react";

export default function TimelineSection() {
  // Đếm ngược đến mốc thời gian khám tuyển dự kiến (Ví dụ: 15/11/2026)
  // const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // useEffect(() => {
  //   // Đặt mốc thời gian mục tiêu (Ví dụ: Tháng 11/2026 đợt khám sơ tuyển)
  //   const targetDate = new Date('2026-11-15T07:00:00').getTime();

  //   const interval = setInterval(() => {
  //     const now = new Date().getTime();
  //     const difference = targetDate - now;

  //     if (difference > 0) {
  //       setTimeLeft({
  //         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //         hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  //         minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
  //         seconds: Math.floor((difference % (1000 * 60)) / 1000),
  //       });
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const steps = [
    {
      title: "Đăng ký / Kê khai",
      desc: "Kê khai thông tin nghĩa vụ tại Công an xã/phường nơi cư trú.",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Sơ tuyển tại địa phương",
      desc: "Kiểm tra chiều cao, cân nặng, hình xăm và lý lịch sơ bộ.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Khám sức khỏe",
      desc: "Khám chuyên khoa chi tiết theo hội đồng khám sức khỏe nghĩa vụ.",
      icon: <Stethoscope className="w-5 h-5" />,
    },
    {
      title: "Xét duyệt hồ sơ",
      desc: "Thẩm định tiêu chuẩn chính trị, phẩm chất đạo đức và văn hóa.",
      icon: <CheckSquare className="w-5 h-5" />,
    },
    {
      title: "Tuyên lệnh nhập ngũ",
      desc: "Nhận quyết định và lên đường thực hiện nghĩa vụ tham gia CAND.",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm  max-w-4xl mx-auto">
      {/* Tiêu đề & Đồng hồ đếm ngược */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4  pb-6">
        {/* <div>
          <h2 className="text-xl font-bold text-slate-800">Lộ trình Tuyển Chọn & Đếm Ngược Thời Gian</h2>
          <p className="text-xs text-slate-500">Lộ trình các bước thực hiện nghĩa vụ Công an Nhân dân trong năm</p>
        </div> */}

        {/* Khối Countdown */}
        {/* <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3 text-blue-900">
          <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
          <div className="text-center">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Đến đợt khám tuyển</div>
            <div className="text-lg font-black tracking-tight">
              {timeLeft.days} ngày {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          </div>
        </div> */}
      </div>

      {/* Sơ đồ các bước (Timeline) */}
      <div className="relative border-l-2 border-blue-200 ml-4 md:ml-6 space-y-8 py-2">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-8 sm:pl-10 group">
            {/* Chấm tròn icon */}
            <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              {step.icon}
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl hover:border-blue-300 transition-colors space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Bước {idx + 1}
              </span>
              <h3 className="font-bold text-slate-800 text-base">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
