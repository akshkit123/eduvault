import { FileText } from "lucide-react";

function ResumeCard() {
  return (
    <div
      className="
        group
        w-full
        rounded-2xl
        border
        border-[#EEECFA]
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
          HEADER
      ========================== */}
      <div className="flex items-center justify-between gap-3">

        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Resume
        </h2>

        <button
          type="button"
          aria-label="Open resume"
          className="
            shrink-0
            text-slate-500
            transition-colors
            duration-200
            hover:text-indigo-600
          "
        >
          <FileText size={19} />
        </button>

      </div>


      {/* =========================
          RESUME PREVIEW
      ========================== */}
      <div
        className="
          mt-4
          h-28
          overflow-hidden
          rounded-xl
          border
          border-[#EEF0FA]
          bg-[#F8F8FF]
          p-3
          transition-all
          duration-300
          group-hover:bg-[#F3F1FF]
          sm:mt-5
          sm:h-32
          sm:p-4
        "
      >

        {/* Fake Resume Lines */}
        <div className="space-y-2.5 sm:space-y-3">

          {/* Heading */}
          <div className="h-2 w-20 rounded-full bg-indigo-100 sm:w-24" />

          {/* Sub Heading */}
          <div className="h-2 w-14 rounded-full bg-indigo-100 sm:w-16" />


          {/* Content */}
          <div className="space-y-1.5 pt-1.5 sm:space-y-2 sm:pt-2">

            <div className="h-1.5 w-full rounded-full bg-indigo-100" />

            <div className="h-1.5 w-[85%] rounded-full bg-indigo-100" />

            <div className="h-1.5 w-[70%] rounded-full bg-indigo-100" />

            <div className="h-1.5 w-[90%] rounded-full bg-indigo-100" />

            <div className="h-1.5 w-[60%] rounded-full bg-indigo-100" />

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeCard;