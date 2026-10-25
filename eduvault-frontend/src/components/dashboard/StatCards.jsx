import {
  Award,
  FolderOpen,
  BriefcaseBusiness,
} from "lucide-react";

function StatCards({ user, profile }) {

  /*
   * ---------------------------------------------------------
   * PROFILE COMPLETION
   * ---------------------------------------------------------
   * Calculate completion from the information we currently
   * receive from /api/auth/me/ and /api/profile/
   */

  const completionFields = [
    user?.first_name,
    user?.last_name,
    user?.email,
    user?.mobile_number,
    profile?.academic?.college,
    profile?.academic?.department,
    profile?.academic?.prn_number,
    profile?.academic?.graduation_year,
    profile?.academic?.cgpa,
    profile?.skills?.length > 0,
    profile?.social?.linkedin,
    profile?.social?.github,
    profile?.social?.portfolio,
  ];

  const completedFields = completionFields.filter(Boolean).length;

  const profileCompletion =
    completionFields.length > 0
      ? Math.round(
          (completedFields / completionFields.length) * 100
        )
      : 0;

  /*
   * ---------------------------------------------------------
   * FUTURE API COUNTS
   * ---------------------------------------------------------
   * Keep these as 0 until we connect the actual APIs.
   */

  const certificateCount = 0;
  const projectCount = 0;
  const internshipCount = 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {/* =====================================================
          TOTAL CERTIFICATES
      ====================================================== */}
      <div
        className="
          group
          cursor-pointer
          rounded-2xl
          border border-[#EEECFA]
          bg-[#F4F3FF]
          p-5 sm:p-6
          transition-all
          duration-300
          ease-out
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-indigo-100
        "
      >
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <p className="text-[13px] font-semibold uppercase tracking-wide text-indigo-500">
              Total Certificates
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-none text-slate-900 sm:text-[32px]">
              {String(certificateCount).padStart(2, "0")}
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Verified credentials
            </p>

          </div>

          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl
              bg-indigo-500
              text-white
              shadow-sm
              transition-all
              duration-300
              ease-out
              sm:h-14 sm:w-14
              group-hover:scale-110
              group-hover:rotate-3
              group-hover:shadow-lg
            "
          >
            <Award
              size={23}
              strokeWidth={1.8}
            />
          </div>

        </div>
      </div>


      {/* =====================================================
          PROJECTS
      ====================================================== */}
      <div
        className="
          group
          cursor-pointer
          rounded-2xl
          border border-[#EEECFA]
          bg-[#F4F3FF]
          p-5 sm:p-6
          transition-all
          duration-300
          ease-out
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-purple-100
        "
      >
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <p className="text-[13px] font-semibold uppercase tracking-wide text-purple-500">
              Projects
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-none text-slate-900 sm:text-[32px]">
              {String(projectCount).padStart(2, "0")}
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Projects in vault
            </p>

          </div>

          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl
              bg-purple-500
              text-white
              shadow-sm
              transition-all
              duration-300
              ease-out
              sm:h-14 sm:w-14
              group-hover:scale-110
              group-hover:rotate-3
              group-hover:shadow-lg
            "
          >
            <FolderOpen
              size={23}
              strokeWidth={1.8}
            />
          </div>

        </div>
      </div>


      {/* =====================================================
          INTERNSHIPS
      ====================================================== */}
      <div
        className="
          group
          cursor-pointer
          rounded-2xl
          border border-[#EEECFA]
          bg-[#F4F3FF]
          p-5 sm:p-6
          transition-all
          duration-300
          ease-out
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-slate-200
        "
      >
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              Internships
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-none text-slate-900 sm:text-[32px]">
              {String(internshipCount).padStart(2, "0")}
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Experience records
            </p>

          </div>

          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl
              bg-slate-700
              text-white
              shadow-sm
              transition-all
              duration-300
              ease-out
              sm:h-14 sm:w-14
              group-hover:scale-110
              group-hover:rotate-3
              group-hover:shadow-lg
            "
          >
            <BriefcaseBusiness
              size={23}
              strokeWidth={1.8}
            />
          </div>

        </div>
      </div>


      {/* =====================================================
          PROFILE COMPLETION
      ====================================================== */}
      <div
        className="
          group
          cursor-pointer
          rounded-2xl
          border border-indigo-50
          bg-gradient-to-br
          from-indigo-50
          via-purple-50
          to-indigo-100
          p-5 sm:p-6
          transition-all
          duration-300
          ease-out
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-indigo-100
        "
      >
        <div className="flex items-center justify-between gap-3">

          {/* LEFT CONTENT */}
          <div className="min-w-0">

            <p
              className="
                text-[14px]
                font-semibold
                uppercase
                leading-5
                tracking-wide
                text-slate-600
                sm:text-[15px]
                sm:leading-6
              "
            >
              Profile
              <br />
              Completion
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-bold
                leading-none
                text-slate-900
                sm:text-[32px]
              "
            >
              {profileCompletion}%
            </h2>

          </div>


          {/* CIRCULAR PROGRESS */}
          <div
            className="
              relative
              h-[64px]
              w-[64px]
              shrink-0
              transition-transform
              duration-300
              ease-out
              sm:h-[76px]
              sm:w-[76px]
              group-hover:scale-110
            "
          >

            <svg
              className="h-full w-full -rotate-90"
              viewBox="0 0 42 42"
            >

              {/* BACKGROUND CIRCLE */}
              <circle
                cx="21"
                cy="21"
                r="16"
                fill="none"
                stroke="#d9d7f5"
                strokeWidth="4"
              />

              {/* PROGRESS CIRCLE */}
              <circle
                cx="21"
                cy="21"
                r="16"
                fill="none"
                stroke="#4338ca"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="100.5"
                strokeDashoffset={
                  100.5 - (100.5 * profileCompletion) / 100
                }
              />

            </svg>

            {/* PERCENTAGE */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[12px] font-bold text-indigo-700 sm:text-[14px]">
                {profileCompletion}%
              </span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default StatCards;