import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
} from "lucide-react";

import { useState } from "react";
import { loginUser, getCurrentUser } from "../api/authApi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const data = await loginUser(email, password);

    console.log("Login response:", data);

    // Get logged-in user from backend
    const user = await getCurrentUser();

    console.log("Logged-in user:", user);
    console.log("Role:", user.role);

    // Role-based redirect
    if (user.role === "COMMITTEE") {
      window.location.href = "/committee/dashboard";
    } else if (user.role === "PLACEMENT") {
      window.location.href = "/placement/dashboard";
    } else {
      window.location.href = "/dashboard";
    }

  } catch (error) {
    console.error("Login error:", error);

    setError(error.message || "Login failed.");

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen border-t-[3px] border-[#4b35e8] bg-[#faf9ff] text-[#151a2d]">

      {/* =====================================================
          TOP BAR
      ====================================================== */}
      <header className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2"
        >
          <img
            src="/images/eduvault-logo.png"
            alt="EduVault"
            className="h-20 w-20 object-contain"
          />


        </a>

        {/* Back to Site */}
        <a
          href="/"
          className="flex items-center gap-1.5 text-xs font-medium text-[#55586a] transition hover:text-[#3525cd]"
        >
          <ArrowLeft size={14} />
          Back to Site
        </a>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="mx-auto grid min-h-[calc(100vh-75px)] w-full max-w-[1440px] grid-cols-1 lg:grid-cols-[48%_52%]">


        {/* =================================================
            LEFT — LOGIN FORM
        ================================================== */}
        <section className="relative z-10 flex items-center justify-center bg-[#faf9ff] px-6 py-10 sm:px-10 lg:px-14 xl:px-16">

          <div className="w-full max-w-[430px]">

            {/* Heading */}
            <div className="mb-8">

              <h1 className="text-[30px] font-semibold tracking-tight text-[#10162a] sm:text-[32px]">
                Welcome Back
              </h1>

              <p className="mt-2 max-w-[330px] text-[13px] leading-5 text-[#686a78]">
                Access your academic and professional records securely.
              </p>

            </div>


            {/* =================================================
                LOGIN FORM
            ================================================== */}
            <form onSubmit={handleLogin} className="space-y-4">

              {/* Email */}
              <div>

                <label className="mb-1.5 block text-[10px] font-medium text-[#404456]">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9cab]"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.chen@university.edu"
                    className="h-9 w-full rounded-[4px] border border-[#d8d8e2] bg-white pl-9 pr-3 text-xs text-[#303447] outline-none placeholder:text-[#a1a2ae] focus:border-[#4b35e8] focus:ring-2 focus:ring-[#4b35e8]/10"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <label className="mb-1.5 block text-[10px] font-medium text-[#404456]">
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9cab]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="h-9 w-full rounded-[4px] border border-[#d8d8e2] bg-white pl-9 pr-9 text-xs text-[#303447] outline-none placeholder:text-[#a1a2ae] focus:border-[#4b35e8] focus:ring-2 focus:ring-[#4b35e8]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9cab] transition hover:text-[#4b35e8]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>

                </div>

              </div>


              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-2 text-[10px] text-[#77798a]">

                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 accent-[#4b35e8]"
                  />

                  Remember me

                </label>

                <a
                  href="/forgot-password"
                  className="text-[10px] font-medium text-[#4b35e8] hover:underline"
                >
                  Forgot password?
                </a>

              </div>

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-600">
                  {error}
                </div>
              )}

              {/* Sign In */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-[5px] bg-[#3525cd] text-xs font-semibold text-white shadow-[0_6px_16px_rgba(53,37,205,0.20)] transition hover:bg-[#2f21b9] active:translate-y-[1px]"
              >
                {loading ? "Signing In..." : "Sign In"}

                {!loading && <ArrowRight size={13} />}
              </button>

            </form>


            {/* =================================================
                DIVIDER
            ================================================== */}
            <div className="my-6 flex items-center gap-3">

              <div className="h-px flex-1 bg-[#e5e4eb]" />

              <span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.12em] text-[#aaaab5]">
                Or continue with
              </span>

              <div className="h-px flex-1 bg-[#e5e4eb]" />

            </div>


            {/* =================================================
                SOCIAL LOGIN
            ================================================== */}
            


            {/* =================================================
                REGISTER
            ================================================== */}
            <p className="mt-7 text-center text-[10px] text-[#77798a]">

              Don't have an account?{" "}

              <a
                href="/register"
                className="font-semibold text-[#3525cd] hover:underline"
              >
                Create an account
              </a>

            </p>

          </div>

        </section>


        {/* =================================================
            RIGHT — STITCH STYLE VISUAL
        ================================================= */}
        <section className="relative hidden min-h-full overflow-hidden bg-[#f0f1ff] lg:block">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f4f2ff] via-[#eaf6ff] to-[#f3edff]" />


          {/* =================================================
              MAIN ILLUSTRATION
          ================================================= */}
          <img
            src="/images/login-illustration.png"
            alt="EduVault Digital Academic Identity"
            className="
              absolute
              left-1/2
              top-[40%]
              z-10
              h-auto
              w-[60%]
              max-w-[520px]
              -translate-x-1/2
              -translate-y-1/2
              object-contain
            "
          />


          {/* =================================================
              SYNCING DATA CARD
          ================================================= */}
          <div
            className="
              absolute
              left-[16%]
              top-[43%]
              z-30
              w-[145px]
              animate-float-slow
              rounded-xl
              border
              border-white/80
              bg-white/85
              px-5
              py-4
              shadow-[0_15px_35px_rgba(60,50,130,0.16)]
              backdrop-blur-md
            "
          >

            <div className="space-y-2">

              <div className="h-2 w-12 rounded-full bg-[#c8bcff]" />

              <div className="h-2 w-20 rounded-full bg-[#dcd2ff]" />

            </div>

            <p className="mt-2 text-[10px] font-medium text-[#55586a]">
              Syncing Data...
            </p>

          </div>


          {/* =================================================
              RIGHT SHIELD CARD
          ================================================= */}
          <div
            className="
              absolute
              right-[14%]
              top-[34%]
              z-30
              flex
              h-[105px]
              w-[105px]
              animate-float-reverse
              items-center
              justify-center
              rounded-xl
              border
              border-white/80
              bg-[#e8eeff]/90
              shadow-[0_15px_35px_rgba(60,50,130,0.16)]
              backdrop-blur-md
            "
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef0ff]">

              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-[#5142df]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >

                <path
                  d="M12 3L20 6V11C20 16.2 16.7 19.7 12 21C7.3 19.7 4 16.2 4 11V6L12 3Z"
                />

                <path d="M9 12L11 14L15 10" />

              </svg>

            </div>

          </div>


          {/* =================================================
              BOTTOM TEXT
          ================================================= */}
          <div
            className="
              absolute
              bottom-[10%]
              left-1/2
              z-30
              w-[75%]
              -translate-x-1/2
              text-center
            "
          >

            <h2
              className="
                text-[28px]
                font-semibold
                leading-[1.05]
                tracking-tight
                text-[#11172b]
                xl:text-[34px]
              "
            >

              Your Verified Digital
              <br />

              Identity.

            </h2>


            <p
              className="
                mx-auto
                mt-3
                max-w-[430px]
                text-[11px]
                leading-5
                text-[#686a78]
                xl:text-xs
              "
            >

              Consolidate your academic achievements
              <br />

              and professional certifications in one secure,
              <br />

              shareable vault.

            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Login;