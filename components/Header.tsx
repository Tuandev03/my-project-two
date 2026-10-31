import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle"; // 👈 Import nút toggle

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2"
        >
          <span className="text-blue-600 dark:text-blue-400">NVCA</span> Check
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Trang Chủ
            </Link>
            <Link
              href="/conditions"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Điều Kiện
            </Link>
            <Link
              href="/pathology"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Bệnh Lý
            </Link>
          </nav>

          {/* Nút chuyển Dark Mode */}
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
