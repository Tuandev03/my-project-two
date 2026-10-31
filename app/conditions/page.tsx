import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { MAIN_CONDITIONS, DEFER_AND_EXEMPT_DATA } from '@/data/conditions';

const iconMap = {
  Clock: <Clock className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  UserCheck: <UserCheck className="w-6 h-6" />,
};

const iconBgMap = {
  Clock: 'bg-blue-100 text-blue-600',
  GraduationCap: 'bg-emerald-100 text-emerald-600',
  ShieldCheck: 'bg-indigo-100 text-indigo-600',
  UserCheck: 'bg-amber-100 text-amber-600',
};

export default function ConditionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Tiêu Chuẩn & Điều Kiện Thực Hiện Nghĩa Vụ Công An
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
          Tổng hợp chi tiết các tiêu chuẩn tuyển chọn công dân thực hiện nghĩa vụ tham gia Công an Nhân dân theo quy định hiện hành.
        </p>
      </div>

      {/* Render 4 Nhóm Điều Kiện Từ File Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MAIN_CONDITIONS.map((group) => (
          <div key={group.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${iconBgMap[group.iconName]}`}>
                {iconMap[group.iconName]}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{group.title}</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {group.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  {item.type === 'check' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  )}
                  <span>
                    {item.text}
                    {item.boldText && <strong>{item.boldText}</strong>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Khối Hoãn & Miễn */}
      <div className="bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <AlertCircle className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-bold">Các Trường Hợp Tạm Hoãn & Miễn Gọi Nhập Ngũ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-amber-400">🟡 Các trường hợp TẠM HOÃN:</h3>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              {DEFER_AND_EXEMPT_DATA.defer.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-rose-400">🔴 Các trường hợp MIỄN gọi nhập ngũ:</h3>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              {DEFER_AND_EXEMPT_DATA.exempt.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}