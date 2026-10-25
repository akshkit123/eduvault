import {
  Upload,
  FileEdit,
  BriefcaseBusiness,
} from "lucide-react";

function RecentActivity() {
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
        hover:shadow-lg
        hover:shadow-indigo-100
        sm:p-5
      "
    >

      {/* =========================
          HEADING
      ========================== */}
      <h2
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        Recent Activity
      </h2>


      {/* =========================
          ACTIVITIES
      ========================== */}
      <div className="mt-5 space-y-4">


        {/* =====================================================
            ACTIVITY 1
        ====================================================== */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Icon */}
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-indigo-50
              text-indigo-600
            "
          >
            <Upload size={14} />
          </div>


          {/* Content */}
          <div className="min-w-0 flex-1">

            <p
              className="
                truncate
                text-xs
                font-medium
                text-slate-800
              "
            >
              Uploaded AWS Certificate
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              2 days ago
            </p>

          </div>

        </div>


        {/* =====================================================
            ACTIVITY 2
        ====================================================== */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Icon */}
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-purple-50
              text-purple-600
            "
          >
            <FileEdit size={14} />
          </div>


          {/* Content */}
          <div className="min-w-0 flex-1">

            <p
              className="
                truncate
                text-xs
                font-medium
                text-slate-800
              "
            >
              Updated Portfolio & Projects
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              5 days ago
            </p>

          </div>

        </div>


        {/* =====================================================
            ACTIVITY 3
        ====================================================== */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Icon */}
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-600
            "
          >
            <BriefcaseBusiness size={14} />
          </div>


          {/* Content */}
          <div className="min-w-0 flex-1">

            <p
              className="
                truncate
                text-xs
                font-medium
                text-slate-800
              "
            >
              Added new Internship
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Last week
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RecentActivity;