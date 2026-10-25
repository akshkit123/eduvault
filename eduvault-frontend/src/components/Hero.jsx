import {
    ArrowRight,
    PlayCircle,
    Verified,
} from "lucide-react";

function Hero() {
    return (
        <section className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-16 px-6 pb-16 pt-32 lg:flex-row">

            {/* Background gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.10),#faf8ff_55%,#faf8ff)]" />

            {/* ================= LEFT ================= */}
            <div className="relative z-10 flex w-full max-w-2xl flex-1 flex-col gap-8">

                {/* Badge */}
                <div className="inline-flex w-fit items-center gap-1 rounded-full border border-indigo-600/10 bg-indigo-50 px-3 py-1 text-indigo-600 shadow-sm">

                    <Verified size={16} />

                    <span className="text-xs font-semibold uppercase tracking-wider">
                        The new standard
                    </span>

                </div>

                {/* Heading */}
                <h1 className="text-[42px] font-bold leading-[1.1] tracking-tight text-[#131b2e] md:text-5xl">

                    Your Permanent Academic &{" "}

                    <span className="bg-gradient-to-r from-[#3525cd] to-[#712ae2] bg-clip-text text-transparent">
                        Professional Digital Identity
                    </span>

                </h1>

                {/* Description */}
                <p className="text-lg leading-[1.6] text-[#464555]">

                    Store certificates, projects, internships, achievements,
                    placement records, and alumni information in one secure,
                    verifiable platform.

                </p>

                {/* Buttons */}
                <div className="mt-4 flex flex-wrap items-center gap-4">

                    {/* Primary */}
                    <button
                        type="button"
                        className="group flex items-center gap-2 rounded-xl bg-[#3525cd] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-1 hover:bg-[#2f20b8] active:translate-y-0"
                    >

                        <span>
                            Get Started Free
                        </span>

                        <ArrowRight
                            size={17}
                            className="transition-transform group-hover:translate-x-1"
                        />

                    </button>

                    {/* Secondary */}
                    <button
                        type="button"
                        className="group flex items-center gap-2 rounded-xl border border-[#c7c4d8] bg-white px-8 py-4 text-sm font-semibold text-[#131b2e] shadow-sm transition-all hover:border-[#3525cd]/50 hover:bg-[#f2f3ff]"
                    >

                        <PlayCircle
                            size={20}
                            className="text-[#3525cd] transition-transform group-hover:scale-110"
                        />

                        <span>
                            Watch Demo
                        </span>

                    </button>

                </div>

                {/* Trusted institutions */}
                <div className="mt-4 border-t border-[#c7c4d8]/50 pt-4">

                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#464555]">
                        Trusted by top institutions
                    </p>

                    <div className="flex flex-wrap items-center gap-8 opacity-60">

                        <span className="text-xl font-bold tracking-tight">
                            STANFORD
                        </span>

                        <span className="font-serif text-xl italic">
                            Harvard
                        </span>

                        <span className="font-mono text-xl">
                            MIT
                        </span>

                        <span className="text-xl font-black">
                            OXFORD
                        </span>

                    </div>

                </div>

            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative z-10 w-full flex-1">

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-white/20 bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 p-2 shadow-2xl shadow-indigo-600/10 backdrop-blur-3xl md:aspect-[16/10]">

                    <img
                        src="/images/eduvault-dashboard.png"
                        alt="EduVault Dashboard"
                        className="h-full w-full rounded-[18px] border border-white/40 object-cover shadow-sm"
                    />

                    {/* Purple glow */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl mix-blend-multiply" />

                    {/* Blue glow */}
                    <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl mix-blend-multiply" />

                </div>

            </div>

        </section>
    );
}

export default Hero;