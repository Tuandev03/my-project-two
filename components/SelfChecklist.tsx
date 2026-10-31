'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

export default function SelfChecklist() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ageGroup: '18-25', // '18-25', '26-27-higher', 'over'
    education: 'thpt', // 'thpt', 'college-up', 'under-thpt'
    bmiCategory: 'normal', // 'normal', 'under', 'over_warning', 'over_fail'
    vision: 'good', // 'good', 'mild', 'heavy'
    tattoo: 'none', // 'none', 'hidden', 'exposed'
    medicalCondition: 'no', // 'no', 'yes'
  });

  const [result, setResult] = useState<{
    status: 'pass' | 'warning' | 'fail';
    title: string;
    details: string[];
  } | null>(null);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else calculateResult();
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculateResult = () => {
    const issues: string[] = [];
    let status: 'pass' | 'warning' | 'fail' = 'pass';

    // 1. Kiểm tra độ tuổi & học vấn
    if (formData.ageGroup === 'over' || formData.education === 'under-thpt') {
      status = 'fail';
      issues.push('Không đạt tiêu chuẩn về độ tuổi hoặc trình độ văn hóa tối thiểu (THPT).');
    }

    // 2. Kiểm tra BMI theo chuẩn Bộ Công An
    if (formData.bmiCategory === 'under') {
      status = 'fail';
      issues.push('BMI dưới 18,5 (Quá gầy, thiếu cân) - Bị loại ngay từ vòng sơ tuyển[cite: 7].');
    } else if (formData.bmiCategory === 'over_warning') {
      if (status !== 'fail') status = 'warning';
      issues.push('BMI từ 25,0 đến dưới 30,0 (Thừa cân). Cần xem xét tỷ lệ mỡ và cơ thể cân đối tại vòng sơ tuyển[cite: 7].');
    } else if (formData.bmiCategory === 'over_fail') {
      status = 'fail';
      issues.push('BMI từ 30,0 trở lên (Béo phì độ 2 trở lên) - Bị loại ngay từ vòng sơ tuyển[cite: 7].');
    }

    // 3. Kiểm tra thị lực
    if (formData.vision === 'heavy') {
      status = 'fail';
      issues.push('Cận thị nặng / Loạn thị nặng thuộc diện loại 4, 5, 6.');
    } else if (formData.vision === 'mild') {
      if (status !== 'fail') status = 'warning';
      issues.push('Cận thị nhẹ (dưới 1.5 đi-ốp), cần kiểm tra lại thực tế khi khám tuyển.');
    }

    // 4. Kiểm tra hình xăm
    if (formData.tattoo === 'exposed') {
      status = 'fail';
      issues.push('Có hình xăm ở vùng hở (mặt, cổ, tay, chân) hoặc hình xăm phản cảm - Vi phạm quy định tuyển chọn.');
    } else if (formData.tattoo === 'hidden') {
      if (status !== 'fail') status = 'warning';
      issues.push('Có hình xăm nhỏ kín đáo, tùy thuộc vào quy định xét duyệt cụ thể của địa phương.');
    }

    // 5. Bệnh lý nền
    if (formData.medicalCondition === 'yes') {
      status = 'fail';
      issues.push('Có tiền sử bệnh lý mãn tính hoặc không đạt tiêu chuẩn sức khỏe CAND.');
    }

    if (issues.length === 0) {
      setResult({
        status: 'pass',
        title: '🟢 Đủ điều kiện sơ tuyển (Khả năng cao)',
        details: ['Hồ sơ và thể lực của bạn đáp ứng rất tốt các tiêu chuẩn tham gia nghĩa vụ Công an Nhân dân.'],
      });
    } else if (status === 'warning') {
      setResult({
        status: 'warning',
        title: '🟡 Cần lưu ý / Xem xét thêm tại địa phương',
        details: issues,
      });
    } else {
      setResult({
        status: 'fail',
        title: '🔴 Không đủ điều kiện (Rớt sơ tuyển)',
        details: issues,
      });
    }
  };

  const resetForm = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
      {/* <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">Trắc Nghiệm &quot;Self-Check&quot; Tiêu Chuẩn Nhanh</h2>
        <p className="text-xs text-slate-500">Đánh giá sơ bộ khả năng trúng tuyển theo quy định mới nhất của Bộ Công An</p>
      </div> */}

      {!result ? (
        <div className="space-y-6">
          {/* Tiến trình */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Câu hỏi {step} / 5</span>
            <span>{Math.round((step / 5) * 100)}% hoàn thành</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>

          {/* Câu hỏi 1: Tuổi & Học vấn */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-bold text-slate-800 text-base">1. Độ tuổi và trình độ học vấn của bạn hiện tại?</h3>
              <div className="space-y-2">
                {[
                  { id: '18-25', label: 'Từ 18 đến hết 25 tuổi, tốt nghiệp THPT trở lên' },
                  { id: '26-27-higher', label: 'Độ tuổi 26 - 27, có bằng Cao đẳng / Đại học được tạm hoãn trước đó' },
                  { id: 'over', label: 'Ngoài độ tuổi quy định hoặc chưa tốt nghiệp THPT' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.ageGroup === opt.id
                        ? 'border-blue-600 bg-blue-50/50 font-medium text-blue-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ageGroup"
                      checked={formData.ageGroup === opt.id}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          ageGroup: opt.id,
                          education: opt.id === 'over' ? 'under-thpt' : 'thpt',
                        });
                      }}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Câu hỏi 2: Chỉ số BMI chuẩn Bộ Công An */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-bold text-slate-800 text-base">2. Tình trạng cân nặng và chiều cao (Chỉ số BMI) của bạn?</h3>
              <div className="space-y-2">
                {[
                  { id: 'normal', label: 'BMI Lý tưởng: Từ 18,5 đến dưới 25,0 (Đạt tiêu chuẩn)' },
                  { id: 'under', label: 'BMI Dưới 18,5 (Quá gầy, thiếu cân - Rớt sơ tuyển)' },
                  { id: 'over_warning', label: 'BMI Từ 25,0 đến dưới 30,0 (Thừa cân, cần xem xét tỷ lệ mỡ)' },
                  { id: 'over_fail', label: 'BMI Từ 30,0 trở lên (Béo phì độ 2 trở lên - Rớt sơ tuyển)' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.bmiCategory === opt.id
                        ? 'border-blue-600 bg-blue-50/50 font-medium text-blue-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bmiCategory"
                      checked={formData.bmiCategory === opt.id}
                      onChange={() => setFormData({ ...formData, bmiCategory: opt.id })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Câu hỏi 3: Thị lực */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-bold text-slate-800 text-base">3. Tình trạng mắt của bạn như thế nào?</h3>
              <div className="space-y-2">
                {[
                  { id: 'good', label: 'Mắt bình thường, thị lực tốt' },
                  { id: 'mild', label: 'Cận thị nhẹ (dưới 1.5 đi-ốp)' },
                  { id: 'heavy', label: 'Cận thị nặng từ 1.5 đi-ốp trở lên / Loạn thị nặng' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.vision === opt.id
                        ? 'border-blue-600 bg-blue-50/50 font-medium text-blue-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="vision"
                      checked={formData.vision === opt.id}
                      onChange={() => setFormData({ ...formData, vision: opt.id })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Câu hỏi 4: Hình xăm */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-bold text-slate-800 text-base">4. Trên cơ thể bạn có hình xăm, phun xăm không?</h3>
              <div className="space-y-2">
                {[
                  { id: 'none', label: 'Không có hình xăm hoặc phun xăm' },
                  { id: 'hidden', label: 'Có hình xăm nhỏ, kín đáo ở vùng che khuất' },
                  { id: 'exposed', label: 'Có hình xăm ở vùng hở (mặt, cổ, tay, chân) hoặc xăm phản cảm' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.tattoo === opt.id
                        ? 'border-blue-600 bg-blue-50/50 font-medium text-blue-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tattoo"
                      checked={formData.tattoo === opt.id}
                      onChange={() => setFormData({ ...formData, tattoo: opt.id })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Câu hỏi 5: Bệnh lý */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-bold text-slate-800 text-base">5. Bạn có mắc các bệnh lý mãn tính hoặc tiền án tiền sự không?</h3>
              <div className="space-y-2">
                {[
                  { id: 'no', label: 'Không (Sức khỏe hoàn toàn bình thường, lý lịch trong sạch)' },
                  { id: 'yes', label: 'Có (Mắc bệnh mãn tính, tim mạch, huyết áp hoặc dị tật / tiền án)' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.medicalCondition === opt.id
                        ? 'border-blue-600 bg-blue-50/50 font-medium text-blue-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="medicalCondition"
                      checked={formData.medicalCondition === opt.id}
                      onChange={() => setFormData({ ...formData, medicalCondition: opt.id })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Nút điều hướng */}
          <div className="flex justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Quay lại
              </button>
            ) : (
              <div></div>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center gap-1 transition-colors shadow-sm"
            >
              {step === 5 ? 'Xem Kết Quả' : 'Tiếp theo'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Kết quả đánh giá */
        <div className="space-y-6 animate-in fade-in">
          <div
            className={`p-6 rounded-2xl border ${
              result.status === 'pass'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : result.status === 'warning'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            } space-y-3`}
          >
            <div className="flex items-center gap-3">
              {result.status === 'pass' && <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />}
              {result.status === 'warning' && <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />}
              {result.status === 'fail' && <XCircle className="w-8 h-8 text-rose-600 shrink-0" />}
              <h3 className="text-lg font-black">{result.title}</h3>
            </div>
            <ul className="space-y-1.5 text-sm list-disc list-inside pt-2 border-t border-black/5">
              {result.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Làm lại bài trắc nghiệm
          </button>
        </div>
      )}
    </div>
  );
}