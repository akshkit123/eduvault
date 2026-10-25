import { useState } from "react";
import { User, Menu, X, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#eeeef5] bg-white/95 backdrop-blur-md">

      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-5 sm:px-6">

        {/* ================= LOGO ================= */}
        <a
          href="#home"
          className="flex shrink-0 items-center"
        >
          <img
            src="/images/eduvault-logo.png"
            alt="EduVault"
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />

          
        </a>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center gap-8 lg:flex">

          <a
            href="#home"
            className="font-semibold text-[#3525cd]"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-[#464555] transition-colors hover:text-[#3525cd]"
          >
            Features
          </a>

          <a
            href="#trust"
            className="text-sm font-medium text-[#464555] transition-colors hover:text-[#3525cd]"
          >
            About
          </a>

          <a
            href="#workflow"
            className="text-sm font-medium text-[#464555] transition-colors hover:text-[#3525cd]"
          >
            Alumni
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-[#464555] transition-colors hover:text-[#3525cd]"
          >
            Contact
          </a>

        </nav>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-4 lg:flex">

          <Link
            to="/verify"
            className="flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/70 px-4 py-2 text-xs font-bold text-indigo-700 shadow-xs transition hover:bg-indigo-100"
          >
            <QrCode size={14} />
            <span>Scan & Verify</span>
          </Link>

          <Link
            to="/register"
            className="rounded-full bg-[#3525cd] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(53,37,205,0.18)] transition-all hover:bg-[#2f21b9]"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            aria-label="Profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3525cd] text-white shadow-[0_4px_12px_rgba(53,37,205,0.15)]"
          >
            <User size={18} strokeWidth={1.8} />
          </Link>

        </div>

        {/* ================= MOBILE ACTIONS ================= */}
        <div className="flex items-center gap-2 lg:hidden">

          {/* Get Started */}
          <button
            type="button"
            className="rounded-full bg-[#3525cd] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(53,37,205,0.18)] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Get Started
          </button>

          {/* Menu button */}
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3525cd] text-white sm:h-10 sm:w-10"
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>

        </div>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="border-t border-[#eeeef5] bg-white px-5 py-4 shadow-lg lg:hidden">

          <nav className="flex flex-col">

            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#f0f0f5] py-3 text-sm font-semibold text-[#3525cd]"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#f0f0f5] py-3 text-sm font-medium text-[#464555]"
            >
              Features
            </a>

            <a
              href="#trust"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#f0f0f5] py-3 text-sm font-medium text-[#464555]"
            >
              About
            </a>

            <a
              href="#workflow"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#f0f0f5] py-3 text-sm font-medium text-[#464555]"
            >
              Alumni
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#f0f0f5] py-3 text-sm font-medium text-[#464555]"
            >
              Contact
            </a>

            {/* Login */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="mt-4 h-11 rounded-xl bg-[#3525cd] text-sm font-semibold text-white shadow-[0_4px_12px_rgba(53,37,205,0.18)] transition hover:bg-[#2f21b9]"
            >
              Login
            </button>

          </nav>

        </div>
      )}

    </header>
  );
}

export default Navbar;