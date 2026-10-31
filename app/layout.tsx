import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";
import ChatBot from "@/components/ChatBot";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tra Cứu Điều Kiện & Sức Khỏe Nghĩa Vụ Công An",
  description:
    "Công cụ tính BMI, kiểm tra tiêu chuẩn sức khỏe và điều kiện tham gia nghĩa vụ Công an Nhân dân.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      {/* 💥 Thêm suppressHydrationWarning vào thẻ body ở đây */}
      <body
        suppressHydrationWarning
        className={`${inter.className} bg-slate-50 dark:bg-slate-950 dark:text-slate-100 antialiased flex flex-col min-h-screen transition-colors`}
      >
        <WelcomeModal />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
         <Analytics />
      </body>
    </html>
  );
}
