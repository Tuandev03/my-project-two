export interface BmiEvaluation {
  status: 'pass' | 'warning' | 'fail';
  message: string;
}

export function evaluateBMI(bmi: number): BmiEvaluation {
  if (bmi >= 18.5 && bmi < 25.0) {
    return {
      status: 'pass',
      message: 'Chỉ số BMI lý tưởng ĐẠT tiêu chuẩn tham gia nghĩa vụ Công an (18.5 - dưới 25.0).',
    };
  }
  if (bmi >= 25.0 && bmi < 30.0) {
    return {
      status: 'warning',
      message: 'Chỉ số BMI từ 25.0 đến dưới 30.0 (Thừa cân). Cần xem xét tỷ lệ cơ/mỡ thực tế tại vòng sơ tuyển.',
    };
  }
  if (bmi < 18.5) {
    return {
      status: 'fail',
      message: 'Chỉ số BMI CHƯA ĐẠT (Dưới 18.5 - Quá gầy, thiếu cân theo quy định sơ tuyển).',
    };
  }
  return {
    status: 'fail',
    message: 'Chỉ số BMI CHƯA ĐẠT (Từ 30.0 trở lên - Béo phì độ 2, rớt từ vòng sơ tuyển).',
  };
}