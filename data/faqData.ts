export interface FaqItem {
  question: string;
  answer: string;
  category: 'suckhoe' | 'hoso' | 'quytrinh';
}

export const FAQ_LIST: FaqItem[] = [
  {
    category: 'suckhoe',
    question: 'Cận thị có bị loại khỏi danh sách tham gia nghĩa vụ Công an không?',
    answer: 'Theo quy định, công dân mắc các bệnh về mắt như cận thị dưới 1.5 đi-ốp có thể được xem xét tùy theo tiêu chuẩn phân loại sức khỏe loại 1, 2, 3. Tuy nhiên, nếu cận thị nặng, loạn thị nặng thuộc diện loại 4, 5, 6 sẽ không đạt tiêu chuẩn sức khỏe tuyển chọn.',
  },
  {
    category: 'suckhoe',
    question: 'Hình xăm trên cơ thể có bị rớt vòng sơ tuyển không?',
    answer: 'Có. Theo quy định của Bộ Công An, các hình xăm, phun xăm trên da có nội dung phản cảm, hoặc ở vị trí hở (mặt, cổ, tay, chân) sẽ bị loại ngay từ vòng sơ tuyển tại địa phương. Các hình xăm nhỏ, kín đáo có thể được hội đồng xem xét tùy địa phương nhưng nhìn chung rất hạn chế.',
  },
  {
    category: 'suckhoe',
    question: 'Chỉ số BMI như thế nào thì bị rớt sơ tuyển?',
    answer: 'Bạn sẽ bị loại ngay nếu chỉ số BMI dưới 18,5 (quá gầy, thiếu cân) hoặc từ 30,0 trở lên (béo phì độ 2 trở lên). Ngoài ra, BMI từ 25,0 đến dưới 30,0 nhưng cơ thể mất cân đối, tỷ lệ mỡ quá cao cũng sẽ không đạt[cite: 4].',
  },
  {
    category: 'hoso',
    question: 'Khi đi khám sơ tuyển sức khỏe cần mang theo những giấy tờ gì?',
    answer: 'Bạn cần mang theo Căn cước công dân (CCCD), giấy gọi khám sức khỏe nghĩa vụ của Công an xã/phường, các giấy tờ về trình độ học vấn (bằng tốt nghiệp THPT, Cao đẳng, Đại học nếu có) và các giấy tờ liên quan đến diện tạm hoãn (nếu thuộc diện xem xét).',
  },
  {
    category: 'quytrinh',
    question: 'Nếu kết quả khám sức khỏe không chính xác, có được khiếu nại hay phúc khảo không?',
    answer: 'Có. Nếu công dân hoặc gia đình có căn cứ cho rằng kết quả khám sức khỏe của Hội đồng khám sức khỏe cấp huyện chưa chính xác, có quyền làm đơn kiến nghị lên Hội đồng nghĩa vụ quân sự / Công an cấp huyện hoặc cấp tỉnh để yêu cầu kiểm tra, phúc khảo lại theo quy định.',
  },
];