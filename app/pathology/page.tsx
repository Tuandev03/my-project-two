"use client";

import React, { useState } from "react";
import { Eye, AlertTriangle, CheckCircle, XCircle, Search } from "lucide-react";

interface PathologyItem {
  category: string;
  condition: string;
  status: "pass" | "fail" | "warning";
  note: string;
}

const pathologyData: PathologyItem[] = [
  {
    category: "Thị lực",
    condition: "Cận thị dưới 1.5 đi-ốp (không quá 1.5 độ)",
    status: "pass",
    note: "Đạt điều kiện nếu thị lực sau khi chỉnh kính đạt mức quy định.",
  },
  {
    category: "Thị lực",
    condition: "Cận thị từ 1.5 đi-ốp trở lên / Loạn thị nặng",
    status: "fail",
    note: "Thuộc diện loại 4, 5, 6 (Không đủ tiêu chuẩn sức khỏe tuyển chọn NVCA).",
  },
  {
    category: "Hình xăm / Thẩm mỹ",
    condition: "Xăm hình, phun xăm trên da",
    status: "warning",
    note: "Các hình xăm, phun xăm có nội dung phản cảm, hoặc ở vị trí hở (mặt, cổ, tay, chân) sẽ bị loại. Một số hình xăm nhỏ kín đáo có thể xem xét tùy địa phương.",
  },
  {
    category: "Thể lực / Hình thể",
    condition: "Dị tật bẩm sinh, gù vẹo cột sống, bàn chân bẹt nặng",
    status: "fail",
    note: "Ảnh hưởng trực tiếp đến khả năng huấn luyện và điều lệnh, thuộc diện loại không đạt.",
  },
  {
    category: "Nội khoa",
    condition: "Huyết áp cao / Tim bẩm sinh / Hen suyễn",
    status: "fail",
    note: "Các bệnh lý mãn tính về tim mạch và hô hấp đều không đạt tiêu chuẩn khám tuyển.",
  },
  {
    category: "Ngoại khoa",
    condition: "Sẹo phẫu thuật lớn ảnh hưởng vận động",
    status: "fail",
    note: "Gây cản trở trong quá trình rèn luyện thể lực và công tác.",
  },
];

// Hàm hỗ trợ loại bỏ dấu tiếng Việt để tìm kiếm chính xác 100%
function removeVietnameseTones(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export default function PathologyPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm lọc từ khóa thông minh, bỏ qua khoảng trắng thừa và không phân biệt dấu/hoa-thường
  const filteredData = pathologyData.filter((item) => {
    const rawSearch = removeVietnameseTones(searchTerm).trim();
    if (!rawSearch) return true;

    const targetText = removeVietnameseTones(
      `${item.category} ${item.condition} ${item.note}`,
    );

    return targetText.includes(rawSearch);
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Tiêu đề trang */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Tra Cứu Danh Mục Bệnh Lý & Tiêu Chuẩn Sức Khỏe
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
          Tra cứu nhanh các quy định về thị lực, hình xăm, và các nhóm bệnh lý
          phân loại sức khỏe loại 4, 5, 6.
        </p>
      </div>

      {/* Thanh tìm kiếm nhanh */}
      <div className="max-w-md mx-auto relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm theo từ khóa (VD: cận thị, hình xăm, huyết áp...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-slate-900"
        />
      </div>

      {/* Danh sách thẻ kết quả */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                    {item.category}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
                      item.status === "pass"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.status === "warning"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {item.status === "pass" && (
                      <CheckCircle className="w-3.5 h-3.5" />
                    )}
                    {item.status === "warning" && (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    )}
                    {item.status === "fail" && (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                    {item.status === "pass"
                      ? "Đạt"
                      : item.status === "warning"
                        ? "Xem xét"
                        : "Không đạt"}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-base">
                  {item.condition}
                </h3>
              </div>
              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {item.note}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
            🔍 Không tìm thấy kết quả nào phù hợp với từ khóa &quot;{searchTerm}
            &quot;.
          </div>
        )}
      </div>
    </div>
  );
}
