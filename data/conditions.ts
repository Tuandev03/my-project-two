export interface ConditionGroup {
  id: string;
  title: string;
  iconName: 'Clock' | 'GraduationCap' | 'ShieldCheck' | 'UserCheck';
  items: Array<{
    type: 'check' | 'cross';
    text: string;
    boldText?: string;
  }>;
}

export const MAIN_CONDITIONS: ConditionGroup[] = [
  {
    id: 'age',
    title: '1. Độ Tuổi Tuyển Chọn',
    iconName: 'Clock',
    items: [
      { type: 'check', text: 'Công dân từ ', boldText: '18 đến hết 25 tuổi' },
      {
        type: 'check',
        text: 'Công dân được đào tạo trình độ ',
        boldText: 'Cao đẳng, Đại học đã được tạm hoãn gọi nhập ngũ thì độ tuổi gọi nhập ngũ đến hết 27 tuổi.',
      },
    ],
  },
  {
    id: 'education',
    title: '2. Trình Độ Văn Hóa',
    iconName: 'GraduationCap',
    items: [
      { type: 'check', text: 'Có bằng tốt nghiệp ', boldText: 'THPT trở lên' },
      {
        type: 'check',
        text: 'Các xã vùng khó khăn, vùng sâu vùng xa được tuyển chọn công dân tốt nghiệp ',
        boldText: 'THCS (tùy địa phương).',
      },
      {
        type: 'check',
        text: '',
        boldText: 'Ưu tiên: Công dân tốt nghiệp CĐ, ĐH các ngành CNTT, Luật, Trinh sát, Ngoại ngữ...',
      },
    ],
  },
  {
    id: 'politics',
    title: '3. Lý Lịch & Chính Trị',
    iconName: 'ShieldCheck',
    items: [
      { type: 'check', text: 'Lý lịch rõ ràng, chấp hành tốt đường lối của Đảng, chính sách pháp luật của Nhà nước.' },
      { type: 'check', text: 'Đạt tiêu chuẩn chính trị của lực lượng CAND (kiểm tra 3 đời theo quy định Bộ Công an).' },
    ],
  },
  {
    id: 'ethics',
    title: '4. Phẩm Chất Đạo Đức',
    iconName: 'UserCheck',
    items: [
      { type: 'check', text: 'Được quần chúng nhân dân nơi cư trú/công tác tin tưởng.' },
      { type: 'cross', text: 'Không có tiền án, tiền sự, không trong thời gian bị truy cứu trách nhiệm hình sự.' },
      { type: 'cross', text: 'Không nghiện ma túy hoặc các chất kích thích bị cấm.' },
    ],
  },
];

export const DEFER_AND_EXEMPT_DATA = {
  defer: [
    'Chưa đủ sức khỏe phục vụ tại ngũ theo kết luận của Hội đồng khám sức khỏe.',
    'Lao động duy nhất trực tiếp nuôi dưỡng thân nhân không còn khả năng lao động.',
    'Một con của thương binh, bệnh binh, người nhiễm chất độc da cam suy giảm khả năng lao động 61% - 80%.',
    'Đang học tại cơ sở giáo dục phổ thông; hệ chính quy đại học, cao đẳng.',
  ],
  exempt: [
    'Con của liệt sĩ, con của thương binh hạng một.',
    'Một thanh niên là anh hoặc em trai của liệt sĩ.',
    'Một con của bệnh binh suy giảm khả năng lao động từ 81% trở lên.',
    'Người làm công tác cơ yếu không phải là quân nhân, Công an nhân dân.',
  ],
};