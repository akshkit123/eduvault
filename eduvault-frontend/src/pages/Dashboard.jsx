import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCards from "../components/dashboard/StatCards";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import DigitalLocker from "../components/dashboard/DigitalLocker";
import VaultKey from "../components/dashboard/VaultKey";
import Timeline from "../components/dashboard/Timeline";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getCurrentUser } from "../api/authApi";
import { getProfile } from "../api/profileApi";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // MOBILE SIDEBAR STATE
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [userData, profileData] = await Promise.all([
          getCurrentUser(),
          getProfile(),
        ]);

        setUser(userData);
        setProfile(profileData);
      } catch (error) {
        console.error("Dashboard loading error:", error);

        if (
          error.message === "NO_ACCESS_TOKEN" ||
          error.message === "SESSION_EXPIRED"
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7ff]">
        <div className="text-sm text-slate-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff]">

      {/* SIDEBAR */}

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* MAIN CONTENT */}

      <div className="min-w-0 lg:ml-[280px]">

        {/* TOPBAR */}

        <Topbar
          user={user}
          setMobileOpen={setMobileOpen}
        />

        {/* PAGE CONTENT */}

        <main className="w-full p-4 sm:p-5 lg:p-7">

          <StatCards
            user={user}
            profile={profile}
          />

          <div className="mt-5 sm:mt-6">
            <ProfileSummary
              user={user}
              profile={profile}
            />
          </div>

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-6
              sm:mt-6
              xl:grid-cols-[minmax(0,1fr)_300px]
            "
          >
            <DigitalLocker />

            <VaultKey />
          </div>

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-6
              sm:mt-6
              xl:grid-cols-[minmax(0,1fr)_300px]
            "
          >
            <div className="w-full">
              <Timeline />
            </div>

            <div className="w-full">
              <RecentActivity />
            </div>
          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;
