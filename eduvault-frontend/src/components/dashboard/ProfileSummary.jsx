import {
  Pencil,
  BadgeCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ProfileSummary({ user, profile }) {
  const navigate = useNavigate();

  const firstName = user?.first_name || "";
  const lastName = user?.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim() || "Student";

  const department =
    user?.department || "Department not available";

  const semester =
    user?.semester || "";

  const prn =
    profile?.academic?.prn_number || "";

  const skills =
    profile?.skills || [];

  const profileImage =
    profile?.academic?.profile_image || null;

  // Backend role
const backendRole = user?.role || "STUDENT";

const isStudent = backendRole === "STUDENT";
const isAlumni = backendRole === "ALUMNI";

// Display role
const role =
  backendRole === "STUDENT"
    ? "Student"
    : backendRole === "ALUMNI"
      ? "Alumni"
      : backendRole.charAt(0) +
        backendRole.slice(1).toLowerCase();

// Only Student and Alumni have graduation status
const graduationStatus =
  isStudent
    ? "Graduation Ongoing"
    : isAlumni
      ? "Graduated"
      : null;

  return (
    <div
      className="
        rounded-2xl
        border border-[#EEECFA]
        bg-gradient-to-br
        from-white
        via-[#F8F7FF]
        to-[#F1EFFF]
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-indigo-100
        sm:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* LEFT SIDE */}
        <div className="flex min-w-0 items-start gap-4 sm:gap-5">

          {/* PROFILE IMAGE */}
          <div className="relative shrink-0">

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border-4
                border-white
                bg-indigo-100
                shadow-md
                sm:h-20
                sm:w-20
              "
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl font-semibold text-indigo-600">
                  {firstName.charAt(0).toUpperCase() || "S"}
                </span>
              )}
            </div>

            {/* VERIFIED */}
            <div
              className="
                absolute
                -bottom-1
                -right-1
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                border-2
                border-white
                bg-indigo-600
                text-white
              "
            >
              <BadgeCheck size={14} />
            </div>

          </div>


          {/* PROFILE INFORMATION */}
          <div className="min-w-0">

            {/* NAME */}
            <h2
              className="
                truncate
                text-xl
                font-bold
                text-slate-900
                sm:text-2xl
              "
            >
              {fullName}
            </h2>


            {/* DEPARTMENT + SEMESTER */}
            <p
              className="
                mt-1
                text-sm
                font-medium
                leading-5
                text-slate-700
                sm:text-base
              "
            >
              {department}

              {semester && (
                <>
                  <span className="mx-2 hidden text-slate-300 sm:inline">
                    •
                  </span>

                  <span className="block sm:inline">
                    {semester}
                  </span>
                </>
              )}
            </p>


            
            {/* ROLE + GRADUATION STATUS */}
<div className="mt-3 flex flex-wrap items-center gap-2">

  {/* ROLE */}
  <span
    className={`
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold
      ${
        isAlumni
          ? "bg-emerald-100 text-emerald-700"
          : isStudent
            ? "bg-indigo-100 text-indigo-700"
            : "bg-purple-100 text-purple-700"
      }
    `}
  >
    {role}
  </span>

  {/* GRADUATION STATUS */}
  {graduationStatus && (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${
          isAlumni
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }
      `}
    >
      {graduationStatus}
    </span>
  )}

</div>


            {/* GRADUATION DATE */}
            {isAlumni && user?.graduation_date && (
                <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                  Graduation Date:{" "}
                  <span className="font-medium text-slate-700">
                    {new Date(
                      user.graduation_date
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
              )}


            {/* PRN */}
            {prn && (
              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                  sm:text-sm
                "
              >
                <span className="font-medium text-slate-700">
                  PRN:
                </span>

                <span>
                  {prn}
                </span>
              </div>
            )}


            {/* SKILLS */}
            <div className="mt-4 flex flex-wrap gap-2">

              {skills.length > 0 ? (
                <>
                  {skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="
                        rounded-full
                        bg-indigo-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-indigo-700
                      "
                    >
                      {skill}
                    </span>
                  ))}

                  {skills.length > 3 && (
                    <span
                      className="
                        rounded-full
                        bg-slate-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-slate-600
                      "
                    >
                      +{skills.length - 3} more
                    </span>
                  )}
                </>
              ) : (
                <span
                  className="
                    rounded-full
                    bg-slate-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  No skills added
                </span>
              )}

            </div>

          </div>

        </div>


        {/* EDIT PROFILE BUTTON */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="
            flex
            w-full
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            border-2
            border-indigo-600
            px-5
            py-3
            text-sm
            font-semibold
            text-indigo-600
            transition-all
            duration-300
            hover:bg-indigo-600
            hover:text-white
            sm:w-auto
            lg:self-center
          "
        >
          <Pencil size={17} />

          <span>
            Edit Profile
          </span>
        </button>

      </div>
    </div>
  );
}

export default ProfileSummary;