"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react";
import { evaluateBMI, BmiEvaluation } from "@/data/bmiRules";

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    result: BmiEvaluation;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) return;

    const bmi = parseFloat((w / (h * h)).toFixed(1));
    const result = evaluateBMI(bmi);

    setBmiResult({ bmi, result });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Công Cụ Tính Chỉ Số BMI Thể Lực
          </h2>
          <p className="text-xs text-slate-500">
            Nhập chiều cao và cân nặng để kiểm tra mức độ đạt chuẩn
          </p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Chiều cao (cm)
            </label>
            <input
              type="number"
              placeholder="VD: 170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Cân nặng (kg)
            </label>
            <input
              type="number"
              placeholder="VD: 65"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors text-sm"
        >
          Tính Chỉ Số BMI & Kiểm Tra
        </button>
      </form>

      {bmiResult && (
        <div
          className={`p-5 rounded-2xl border ${
            bmiResult.result.status === "pass"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          } space-y-2 animate-in fade-in duration-300`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Chỉ số BMI của bạn:</span>
            <span className="text-2xl font-black">{bmiResult.bmi}</span>
          </div>
          <div className="flex items-start gap-2 text-sm pt-2 border-t border-black/5">
            {bmiResult.result.status === "pass" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <p className="font-semibold">{bmiResult.result.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
