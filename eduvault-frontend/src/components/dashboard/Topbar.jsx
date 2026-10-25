import {
  Search,
  UserRound,
  Menu,
} from "lucide-react";

function Topbar({ user, setMobileOpen }) {
  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "Student";

  const role = user?.role || "STUDENT";

  const formattedRole =
    role === "ALUMNI"
      ? "Alumni"
      : role === "COMMITTEE"
        ? "Committee"
        : role === "ADMIN"
          ? "Admin"
          : "Student";

  return (
    <header
      className="
        flex
        min-h-[72px]
        items-center
        justify-between
        gap-3
        border-b
        border-slate-100
        bg-white
        px-4
        py-3
        sm:gap-4
        sm:px-5
        lg:px-7
      "
    >

      {/* =================================================
          LEFT SIDE
      ================================================== */}

      <div className="flex min-w-0 flex-1 items-center gap-3">

        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() => setMobileOpen?.(true)}
          aria-label="Open navigation menu"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            text-slate-700
            transition
            hover:bg-slate-100
            lg:hidden
          "
        >
          <Menu size={23} />
        </button>


        {/* Search */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3
            rounded-full
            bg-[#eef0ff]
            px-4
            py-2.5
            sm:max-w-[375px]
            sm:px-5
          "
        >

          <Search
            size={19}
            className="shrink-0 text-slate-600"
          />

          <input
            type="text"
            placeholder="Search records, projects..."
            className="
              w-full
              min-w-0
              bg-transparent
              text-sm
              text-slate-700
              outline-none
              placeholder:text-slate-400
            "
          />

        </div>

      </div>


      {/* =================================================
          USER
      ================================================== */}

      <div className="flex shrink-0 items-center gap-3">

        {/* User Name and Role */}

        <div className="hidden text-right leading-tight sm:block">

          <p className="text-sm font-semibold text-slate-900">
            {fullName}
          </p>

          <p className="text-xs text-slate-500">
            {formattedRole}
          </p>

        </div>


        {/* User Icon */}

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-indigo-600
            text-white
            shadow-md
            shadow-indigo-200
            sm:h-10
            sm:w-10
          "
        >

          <UserRound
            size={19}
            strokeWidth={1.8}
          />

        </div>

      </div>

    </header>
  );
}

export default Topbar;
