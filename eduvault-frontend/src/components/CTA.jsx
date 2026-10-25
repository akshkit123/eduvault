function CTA() {
  return (
    <section className="w-full bg-[#faf8ff] px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
      <div className="mx-auto w-full max-w-[1280px] rounded-[20px] bg-gradient-to-br from-[#4030d8] via-[#452bd8] to-[#3420c7] px-6 py-12 text-center shadow-[0_20px_45px_rgba(63,48,216,0.18)] sm:px-10 sm:py-14 md:py-16">

        <div className="mx-auto max-w-2xl">

          <h2 className="text-[28px] font-medium leading-[1.15] tracking-tight text-white sm:text-[32px]">
            Start Building Your Professional
            <br className="hidden sm:block" />
            Identity Today
          </h2>

          <p className="mx-auto mt-4 max-w-[560px] text-[12px] leading-5 text-white/80 sm:text-[13px]">
            Join thousands of students and top institutions securing their
            academic future on the blockchain.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            {/* Create Account */}
            <button
              type="button"
              className="h-11 min-w-[130px] rounded-lg bg-white px-5 text-[12px] font-medium text-[#3525cd] shadow-sm transition hover:bg-[#f5f5ff]"
            >
              Create Free Account
            </button>

            {/* Contact Sales */}
            <button
              type="button"
              className="h-11 min-w-[105px] rounded-lg border border-white/50 bg-transparent px-5 text-[12px] font-medium text-white transition hover:bg-white/10"
            >
              Contact Sales
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CTA;