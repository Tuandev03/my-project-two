import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { log } from "node:console";

const SYSTEM_INSTRUCTION = `
Bạn là Trợ lý AI Tư vấn Sơ tuyển Nghĩa vụ Công an Nhân dân (NVCA Check).
Nhiệm vụ của bạn là giải đáp thân thiện, ngắn gọn, chính xác các thắc mắc của công dân dựa trên quy định pháp luật:
- Luật Nghĩa vụ quân sự & Thông tư 62/2023/TT-BCA về tiêu chuẩn sức khỏe Công an Nhân dân.
- Chiều cao nam tối thiểu 1m62, nữ 1m56. BMI từ 18.5 đến 29.9.
- Thị lực: Cận không quá 1.5 diop (nếu cận >1.5 diop hoặc loạn thị là Không đạt).
- Hình xăm: Không có hình xăm/phun xăm ở vị trí lộ (cổ, mặt, tay, chân...).
- Hãy trả lời ngắn gọn, xuống dòng rõ ràng bằng tiếng Việt, hỗ trợ công dân nhiệt tình.
`;

export async function POST(req: Request) {
  try {
    const rawApiKey = process.env.GROQ_API_KEY;
    const apiKey = rawApiKey ? rawApiKey.trim() : "";

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY chưa được cấu hình trong .env.local" },

        { status: 500 },
      );
    }

    const groq = new Groq({ apiKey });
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Dữ liệu tin nhắn không hợp lệ" },
        { status: 400 },
      );
    }

    // Sử dụng model khả dụng trên Free Tier của Groq
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      model: "openai/gpt-oss-120b",
      temperature: 0.6,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Xin lỗi, tôi không thể xử lý câu hỏi lúc này.";

    return NextResponse.json({ result: reply });
  } catch (error: any) {
    console.error("Groq API Error Detail:", error);
    return NextResponse.json(
      { error: error?.message || "Có lỗi xảy ra trong quá trình xử lý AI." },
      { status: 500 },
    );
  }
}
