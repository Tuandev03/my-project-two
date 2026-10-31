"use client";

import React, { useState } from "react";
import {
  Eye,
  Activity,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export default function DetailedHealthCheck() {
  const [inputs, setInputs] = useState({
    leftEye: 0, // Độ cận mắt trái
    rightEye: 0, // Độ cận mắt phải
    hasAstigmatism: false, // Loạn thị
    missingTeeth: 0, // Số răng mất
    hasTattoo: false, // Hình xăm
    tattooExposed: false, // Hình xăm ở vị trí lộ (cổ, tay, mặt)
    chronicDisease: false, // Bệnh mãn tính (huyết áp, tim mạch,...)
  });

  const [result, setResult] = useState<{
    grade: number;
    isPass: boolean;
    notes: string[];
  } | null>(null);

  const calculateHealth = () => {
    let maxGrade = 1; // 1 là tốt nhất, 6 là xấu nhất
    const notes: string[] = [];

    // 1. Đánh giá Thị lực
    const maxDiopter = Math.max(inputs.leftEye, inputs.rightEye);
    if (maxDiopter > 0 && maxDiopter <= 1.5) {
      maxGrade = Math.max(maxGrade, 2);
      notes.push("Cận nhẹ (≤ 1.5 diop): Sức khỏe loại 2.");
    } else if (maxDiopter > 1.5 && maxDiopter <= 3) {
      maxGrade = Math.max(maxGrade, 3);
      notes.push("Cận từ 1.5 đến 3 diop: Sức khỏe loại 3.");
    } else if (maxDiopter > 3) {
      maxGrade = Math.max(maxGrade, 5);
      notes.push(
        "Cận trên 3 diop: Sức khỏe loại 5 hoặc 6 (Không đạt chỉ tiêu tuyển chọn NVCA).",
      );
    }

    if (inputs.hasAstigmatism) {
      maxGrade = Math.max(maxGrade, 6);
      notes.push(
        "Loạn thị: Thường bị xếp loại 6 (Không đạt tiêu chuẩn tuyển chọn).",
      );
    }

    // 2. Răng - Hàm - Mặt
    if (inputs.missingTeeth > 0 && inputs.missingTeeth <= 2) {
      maxGrade = Math.max(maxGrade, 2);
      notes.push("Mất 1-2 răng: Loại 2.");
    } else if (inputs.missingTeeth > 2) {
      maxGrade = Math.max(maxGrade, 4);
      notes.push(
        "Mất trên 2 răng: Ảnh hưởng sức khỏe nha khoa (Loại 4 trở lên).",
      );
    }

    // 3. Hình xăm & Thẩm mỹ
    if (inputs.hasTattoo) {
      if (inputs.tattooExposed) {
        maxGrade = Math.max(maxGrade, 6);
        notes.push(
          "Hình xăm ở vị trí lộ (cổ, mặt, bàn tay): Không đủ điều kiện tuyển chọn NVCA.",
        );
      } else {
        notes.push(
          "Hình xăm ở vị trí kín: Cần tẩy xóa hoàn toàn hoặc nằm trong kích thước quy định trước khi khám sơ tuyển.",
        );
      }
    }

    // 4. Bệnh mãn tính
    if (inputs.chronicDisease) {
      maxGrade = Math.max(maxGrade, 5);
      notes.push(
        "Tiền sử bệnh lý nội khoa/mãn tính: Cần hồ sơ bệnh án chi tiết từ bệnh viện cấp tỉnh/trung ương.",
      );
    }

    // Điều kiện đạt NVCA: Loại 1, Loại 2 (Loại 3 xem xét tùy chỉ tiêu địa phương, Loại 4-6 Không đạt)
    const isPass = maxGrade <= 2 || (maxGrade === 3 && maxDiopter <= 1.5);

    setResult({
      grade: maxGrade,
      isPass,
      notes:
        notes.length > 0 ? notes : ["Các thông số thể lực cơ bản đạt loại 1."],
    });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Khối Mắt & Thị Lực */}
        <div className="space-y-4 p-4 bg-slate-50  rounded-2xl border border-slate-50 ">
          <h4 className="text-sm font-bold text-slate-800  flex items-center gap-2">
            👁️ Thị Lực (Cận / Loạn)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500 ">Mắt trái (Diop)</label>
              <input
                type="number"
                step="0.25"
                min="0"
                value={inputs.leftEye}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    leftEye: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full mt-1 bg-white text-black  border-slate-200    rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 ">
                Mắt phải (Diop)
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                value={inputs.rightEye}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    rightEye: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full mt-1 bg-white text-black  border-slate-200    rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700  cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={inputs.hasAstigmatism}
              onChange={(e) =>
                setInputs({ ...inputs, hasAstigmatism: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            Có bị loạn thị
          </label>
        </div>

        {/* Khối Răng & Hình Xăm */}
        <div className="space-y-4 p-4 bg-slate-50  rounded-2xl  ">
          <h4 className="text-sm font-bold text-slate-800  flex items-center gap-2">
            🦷 Răng Hàm Mặt & Hình Xăm
          </h4>
          <div>
            <label className="text-xs text-slate-500 ">
              Số răng bị mất (chưa làm răng giả)
            </label>
            <input
              type="number"
              min="0"
              value={inputs.missingTeeth}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  missingTeeth: parseInt(e.target.value) || 0,
                })
              }
              className="w-full mt-1 bg-white  border border-slate-200  text-slate-900  rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2 text-sm text-slate-700  cursor-pointer">
              <input
                type="checkbox"
                checked={inputs.hasTattoo}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    hasTattoo: e.target.checked,
                    tattooExposed: false,
                  })
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              Có hình xăm / phun xăm trên cơ thể
            </label>
            {inputs.hasTattoo && (
              <label className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-medium pl-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.tattooExposed}
                  onChange={(e) =>
                    setInputs({ ...inputs, tattooExposed: e.target.checked })
                  }
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                Hình xăm ở vị trí lộ (cổ, mặt, tay, chân)
              </label>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={calculateHealth}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition-all active:scale-98"
      >
        Đánh Giá Phân Loại Sức Khỏe
      </button>

      {/* Hiển thị kết quả */}
      {result && (
        <div
          className={`p-5 rounded-2xl border transition-all ${
            result.isPass
              ? "bg-emerald-50  border-emerald-600  text-emerald-900 "
              : "bg-rose-50  border-rose-200  text-rose-900 da"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            {result.isPass ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <XCircle className="w-7 h-7 text-rose-600 dark:text-rose-400" />
            )}
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold">
                Kết quả dự kiến:
              </span>
              <h4 className="text-xl font-extrabold">
                Sức Khỏe Phân Loại:{" "}
                <span className="underline">Loại {result.grade}</span> (
                {result.isPass ? "ĐẠT TIÊU CHUẨN" : "KHÔNG ĐẠT / CẦN KHẮC PHỤC"}
                )
              </h4>
            </div>
          </div>
          <ul className="space-y-1.5 text-sm pl-2">
            {result.notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-xs mt-1">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
