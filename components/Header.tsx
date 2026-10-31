import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle"; // 👈 Import nút toggle

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2"
        >
          <span className="text-blue-600 dark:text-blue-400">NVCA</span> Check
        </Link>

        <div className="flex items-center gap-4">
          
          {/* Menu cho Desktop (Màn hình từ sm trở lên) */}
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

          {/* Menu Hamburger cho Mobile (Màn hình nhỏ hơn sm) */}
          <div className="sm:hidden relative">
            <details className="group">
              <summary className="list-none p-2 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {/* Icon 3 gạch */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </summary>
              
              {/* Menu xổ xuống */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-2 flex flex-col">
                <Link href="/" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Trang Chủ
                </Link>
                <Link href="/conditions" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Điều Kiện
                </Link>
                <Link href="/pathology" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Bệnh Lý
                </Link>
              </div>
            </details>
          </div>

          {/* Nút chuyển Dark Mode */}
          <DarkModeToggle />
          
        </div>
      </div>
    </header>
  );
}