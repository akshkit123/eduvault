import {
  LayoutDashboard,
  UserRound,
  LockKeyhole,
  Award,
  FolderOpen,
  BriefcaseBusiness,
  Trophy,
  FileText,
  Users,
  LogOut,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: UserRound,
    },
    {
      name: "Digital Locker",
      path: "/digital-locker",
      icon: LockKeyhole,
    },
    {
      name: "Certificates",
      path: "/certificates",
      icon: Award,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderOpen,
    },
    {
      name: "Internships",
      path: "/internships",
      icon: BriefcaseBusiness,
    },
    {
      name: "Achievements",
      path: "/achievements",
      icon: Trophy,
    },
    {
      name: "Alumni Network",
      path: "/alumni-network",
      icon: Users,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  const handleMenuClick = () => {
    // Close sidebar on mobile after selecting a page
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* =========================================
          MOBILE OVERLAY
      ========================================== */}

      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[280px]
          flex-col
          border-r
          border-slate-100
          bg-white

          transition-transform
          duration-300
          ease-in-out

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* =========================================
            LOGO
        ========================================== */}

        <div className="flex h-[72px] items-center justify-between px-6">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-indigo-600
                text-white
                shadow-md
              "
            >
              <LockKeyhole size={20} />
            </div>

            <span className="text-2xl font-bold text-indigo-600">
              EduVault
            </span>

          </div>

          {/* Mobile close button */}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="
              rounded-lg
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-700
              lg:hidden
            "
          >
            <X size={22} />
          </button>

        </div>


        {/* =========================================
            NAVIGATION
        ========================================== */}

        <nav className="flex-1 overflow-y-auto px-4 py-5">

          <div className="space-y-2">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleMenuClick}
                  className={({ isActive }) =>
                    `
                    flex
                    items-center
                    gap-4
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }
                    `
                  }
                >

                  <Icon
                    size={20}
                    strokeWidth={1.8}
                  />

                  <span>
                    {item.name}
                  </span>

                </NavLink>
              );

            })}

          </div>

        </nav>

        {/* =========================================
            LOGOUT
        ========================================== */}

        <div className="border-t border-slate-100 p-4">

          <button
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-4
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-red-600
              transition
              hover:bg-red-50
            "
          >

            <LogOut size={20} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;