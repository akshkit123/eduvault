import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";

function TrustSection() {
  return (
    <section
      id="trust"
      className="w-full bg-[#faf8ff] px-5 py-16 sm:px-8 lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12 lg:flex-row lg:gap-14">

        {/* =====================================================
            LEFT — EDUVAULT VERIFICATION VISUAL
        ====================================================== */}
        <div className="relative w-full flex-1">

          {/* OUTER CONTAINER
              IMPORTANT: overflow-visible
          */}
          <div className="relative h-[360px] w-full overflow-visible sm:h-[420px] lg:h-[500px]">

            {/* Main visual */}
            <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#dcecff]">

              {/* Soft background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#dcecff] via-[#edf5ff] to-[#d9e5ff]" />

              {/* Decorative glow */}
              <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-white/50 blur-2xl" />

              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#c8d9ff]/60 blur-2xl" />

              {/* EduVault header */}
              <div className="absolute left-1/2 top-8 z-10 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-white/70 bg-white/60 px-4 py-2 shadow-sm backdrop-blur">

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8edff] text-[#3525cd]">
                  <ShieldCheck size={16} />
                </div>

                <span className="text-sm font-semibold text-[#24304a]">
                  EduVault
                </span>

                <span className="text-sm text-[#8b91a2]">
                  Home
                </span>

              </div>

              {/* Verification network */}
              <div className="absolute left-1/2 top-1/2 z-10 h-[270px] w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2">

                {/* Horizontal connecting lines */}
                <div className="absolute left-[18%] right-[18%] top-[50%] h-px bg-white/80" />

                {/* Vertical connecting line */}
                <div className="absolute left-1/2 top-[12%] bottom-[12%] w-px -translate-x-1/2 bg-white/80" />

                {/* Left records */}
                <div className="absolute left-0 top-[8%] flex flex-col gap-5">

                  <Record label="Course Records" />
                  <Record label="Student Records" />
                  <Record label="Academic Data" />
                  <Record label="Learning Records" />

                </div>

                {/* Center verification boxes */}
                <div className="absolute left-1/2 top-[2%] flex -translate-x-1/2 flex-col gap-4">

                  <VerifyBox />
                  <VerifyBox />
                  <VerifyBox />
                  <VerifyBox />

                </div>

                {/* Right records */}
                <div className="absolute right-0 top-[8%] flex flex-col gap-5">

                  <Record label="Course Documents" />
                  <Record label="Student Records" />
                  <Record label="Academic Data" />
                  <Record label="Learning Records" />

                </div>

              </div>

            </div>

            {/* =================================================
                VERIFICATION PASSED CARD

                This is OUTSIDE the image container so it can
                overlap the bottom-right corner.
            ================================================== */}
            <div className="absolute bottom-[-8px] right-[-18px] z-30 flex items-center gap-3 rounded-[16px] bg-white px-5 py-4 shadow-xl sm:right-[-22px]">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dcf8e6] text-[#1e9b52]">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#1b2235]">
                  Verification Passed
                </p>

                <p className="mt-1 text-xs text-[#777587]">
                  Mit-Wpu University
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* =====================================================
            RIGHT — TRUST CONTENT
        ====================================================== */}
        <div className="w-full flex-1">

          <h2 className="max-w-[550px] text-[32px] font-normal leading-[1.12] tracking-tight text-[#1b2235] sm:text-[38px]">
            The new paradigm of academic trust.
          </h2>

          <p className="mt-5 max-w-[560px] text-[14px] leading-6 text-[#686a78] sm:text-[15px]">
            Move away from easily forged PDFs and cumbersome manual
            verification processes.
          </p>

          {/* Comparison cards */}
          <div className="mt-8 space-y-4">

            {/* Traditional Methods */}
            <div className="flex items-start gap-4 rounded-xl border border-[#f1dcdc] bg-[#fff5f5] px-5 py-4">

              <XCircle
                size={20}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[#e46767]"
              />

              <div>
                <h3 className="text-[14px] font-semibold text-[#303548]">
                  Traditional Methods
                </h3>

                <p className="mt-1 text-[13px] leading-5 text-[#777587]">
                  Paper certificates easily lost. PDFs easily altered.
                  Verification takes weeks of manual emails and phone calls.
                </p>
              </div>

            </div>

            {/* With EduVault */}
            <div className="relative flex items-start gap-4 overflow-hidden rounded-xl border border-[#d8d4ff] bg-[#eeecff] px-5 py-4">

              {/* Purple accent */}
              <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-[#3525cd]" />

              <CheckCircle2
                size={20}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[#3525cd]"
              />

              <div>
                <h3 className="text-[14px] font-semibold text-[#303548]">
                  With EduVault
                </h3>

                <p className="mt-1 text-[13px] leading-5 text-[#777587]">
                  Cryptographically signed digital records. Instant
                  scan-to-verify. Tamper-evident and permanently accessible.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

/* ============================================================
   RECORD CARD
============================================================ */

function Record({ label }) {
  return (
    <div className="flex h-9 w-[100px] items-center justify-center rounded-lg border border-white/70 bg-white/55 px-2 text-center text-[7px] font-medium text-[#66728b] shadow-sm backdrop-blur sm:w-[115px]">
      {label}
    </div>
  );
}

/* ============================================================
   VERIFICATION BOX
============================================================ */

function VerifyBox() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/80 bg-[#7fb8f1]/70 shadow-md backdrop-blur">
      <CheckCircle2
        size={25}
        strokeWidth={2}
        className="text-white"
      />
    </div>
  );
}

export default TrustSection;