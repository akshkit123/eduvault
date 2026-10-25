function Timeline() {
  return (
    <div
      className="
        group
        w-full
        rounded-2xl
        border border-[#EEECFA]
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-indigo-100
        sm:p-6
      "
    >

      {/* =========================
          HEADING
      ========================== */}
      <h2
        className="
          text-sm
          font-semibold
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        Timeline
      </h2>


      {/* =========================
          TIMELINE
      ========================== */}
      <div className="mt-5">


        {/* =====================================================
            TIMELINE ITEM 1
        ====================================================== */}
        <div className="relative flex gap-3 sm:gap-4">

          {/* Vertical Line */}
          <div
            className="
              absolute
              left-[6px]
              top-4
              h-[65px]
              w-[2px]
              bg-indigo-100
            "
          />


          {/* Dot */}
          <div
            className="
              relative
              z-10
              mt-1
              h-3
              w-3
              shrink-0
              rounded-full
              bg-indigo-600
              ring-4
              ring-indigo-50
            "
          />


          {/* Content */}
          <div className="min-w-0 pb-7">

            <p className="text-xs font-medium text-slate-500">
              2023 - Present
            </p>

            <h3
              className="
                mt-1
                break-words
                text-sm
                font-bold
                leading-5
                text-slate-900
              "
            >
              SDE Intern @ TechCorp
            </h3>

          </div>

        </div>


        {/* =====================================================
            TIMELINE ITEM 2
        ====================================================== */}
        <div className="relative flex gap-3 sm:gap-4">

          {/* Dot */}
          <div
            className="
              relative
              z-10
              mt-1
              h-3
              w-3
              shrink-0
              rounded-full
              bg-indigo-100
              ring-4
              ring-white
            "
          />


          {/* Content */}
          <div className="min-w-0">

            <p className="text-xs font-medium text-slate-500">
              Summer 2022
            </p>

            <h3
              className="
                mt-1
                break-words
                text-sm
                font-bold
                leading-5
                text-slate-900
              "
            >
              Web Dev Intern @ StartupX
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Timeline;