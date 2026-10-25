import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  UserRoundCheck,
  CalendarDays,
  Search,
  SlidersHorizontal,
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  Mail,
  UserPlus,
  CheckCircle2,
  ArrowRight,
  Clock3,
  ExternalLink,
  ShieldCheck,
  Loader2,
  Sparkles,
  X,
  Award,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getAlumniNetwork } from "../api/alumniApi";

function AlumniNetwork() {
  const navigate = useNavigate();

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  // Data & Async State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alumniList, setAlumniList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({
    total_alumni: 0,
    companies: 0,
    departments: 0,
    verified_alumni: 0,
  });

  // Fetch alumni data with debounce
  useEffect(() => {
    let isCancelled = false;
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAlumniNetwork({
          search,
          department: departmentFilter,
          filter: roleFilter,
        });

        if (!isCancelled) {
          setAlumniList(res.results || []);
          if (res.departments) {
            setDepartments(res.departments);
          }
          if (res.stats) {
            setStats(res.stats);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Alumni fetch error:", err);
          setError("Failed to load alumni directory. Please check network connection.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [search, departmentFilter, roleFilter]);

  const handleClearFilters = () => {
    setSearch("");
    setDepartmentFilter("All");
    setRoleFilter("All");
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#15182b]">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar />

      {/* =====================================================
          MAIN AREA
      ====================================================== */}
      <div className="lg:ml-[280px]">
        {/* =================================================
            TOPBAR
        ================================================== */}
        <Topbar />

        {/* =================================================
            PAGE CONTENT
        ================================================== */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1250px]">
            {/* =================================================
                PAGE HEADER
            ================================================== */}
            <section className="mb-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 border border-indigo-100/60 shadow-xs">
                    <Users size={14} />
                    Verified Alumni Community
                  </div>

                  <h1 className="text-3xl font-extrabold tracking-tight text-[#11152a] sm:text-4xl">
                    Alumni Network
                  </h1>

                  <p className="mt-2 max-w-[650px] text-sm leading-6 text-[#626477]">
                    Connect with authenticated graduates from your institution, explore verified career portfolios,
                    and discover professional mentorship opportunities.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <Link
                    to="/verify"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors"
                  >
                    <ShieldCheck size={15} />
                    Verify Any Alumni
                  </Link>
                </div>
              </div>
            </section>

            {/* =================================================
                DYNAMIC STAT CARDS
            ================================================== */}
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={Users}
                label="Total Alumni"
                value={loading ? "--" : stats.total_alumni}
                description="Registered graduates"
              />

              <StatCard
                icon={Building2}
                label="Companies"
                value={loading ? "--" : stats.companies}
                description="Active industry hubs"
              />

              <StatCard
                icon={Award}
                label="Verified Alumni"
                value={loading ? "--" : stats.verified_alumni}
                description="Cryptographic proof"
              />

              <StatCard
                icon={GraduationCap}
                label="Departments"
                value={loading ? "--" : stats.departments || departments.length || 1}
                description="Academic faculties"
              />
            </section>

            {/* =================================================
                SEARCH + MULTI-FILTER BAR
            ================================================== */}
            <section className="mb-6 rounded-2xl border border-[#e9e6f4] bg-white p-4 shadow-[0_5px_25px_rgba(50,40,150,0.04)]">
              <div className="flex flex-col gap-3 lg:flex-row">
                {/* Search */}
                <div className="relative flex-1">
                  <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search alumni by name, company, role, department or skill..."
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-[#faf9ff]
                      pl-11
                      pr-10
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-slate-400 shrink-0" />
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="
                        h-11
                        min-w-[150px]
                        rounded-xl
                        border
                        border-slate-200
                        bg-[#faf9ff]
                        px-3
                        text-xs
                        font-medium
                        text-slate-700
                        outline-none
                        focus:border-indigo-500
                      "
                    >
                      <option value="All">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="
                      h-11
                      min-w-[140px]
                      rounded-xl
                      border
                      border-slate-200
                      bg-[#faf9ff]
                      px-3
                      text-xs
                      font-medium
                      text-slate-700
                      outline-none
                      focus:border-indigo-500
                    "
                  >
                    <option value="All">All Roles</option>
                    <option value="Engineer">Engineers</option>
                    <option value="Architect">Architects</option>
                    <option value="Scientist">Data Scientists</option>
                    <option value="Designer">Designers</option>
                    <option value="Lead">Team Leads</option>
                    <option value="Specialist">Specialists</option>
                  </select>
                </div>
              </div>
            </section>

            {/* =================================================
                MAIN GRID
            ================================================== */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              {/* =================================================
                  LEFT - DYNAMIC ALUMNI DIRECTORY
              ================================================== */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Alumni Directory
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Discover verified graduates and open their authenticated portfolios.
                    </p>
                  </div>

                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 border border-indigo-100/60">
                    {loading ? "Searching..." : `${alumniList.length} Alumni Found`}
                  </span>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mb-5 rounded-2xl border border-red-200 bg-red-50/70 p-4 text-xs font-medium text-red-600 flex items-center justify-between">
                    <span>{error}</span>
                    <button
                      onClick={handleClearFilters}
                      className="underline font-bold hover:text-red-800"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Loading Skeletons */}
                {loading && (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-full bg-slate-200 shrink-0" />
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-3/4 rounded-sm bg-slate-200" />
                            <div className="h-3 w-1/2 rounded-sm bg-slate-200" />
                          </div>
                        </div>
                        <div className="mt-5 space-y-2">
                          <div className="h-3 w-full rounded-sm bg-slate-100" />
                          <div className="h-3 w-2/3 rounded-sm bg-slate-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Alumni Grid */}
                {!loading && (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {alumniList.map((person) => (
                      <AlumniCard
                        key={person.id}
                        person={person}
                        onViewProfile={() => navigate(person.public_profile_url || `/student/${person.user_id}`)}
                      />
                    ))}
                  </div>
                )}

                {/* No Results */}
                {!loading && alumniList.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-indigo-200 bg-white p-12 text-center shadow-xs">
                    <Users size={44} className="mx-auto text-indigo-300" />
                    <h3 className="mt-4 text-base font-bold text-slate-800">
                      No alumni found matching criteria
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                      Try adjusting your search terms, selecting a different department, or clearing the role filter.
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </section>

              {/* =================================================
                  RIGHT SIDEBAR: REFERRALS & EVENTS
              ================================================== */}
              <aside className="space-y-6">
                {/* Job Referrals */}
                <section className="rounded-2xl border border-[#e9e6f4] bg-white p-5 shadow-[0_5px_25px_rgba(50,40,150,0.04)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <BriefcaseBusiness size={19} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Alumni Career Hub
                      </h2>
                      <p className="text-[10px] text-slate-500">
                        Top hiring partners across network
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <JobReferral
                      title="Software Engineer"
                      company="Meta • Menlo Park / Remote"
                      referrer="Alumni Referral Hub"
                    />
                    <JobReferral
                      title="Cloud Architecture Specialist"
                      company="Microsoft • Hyderabad"
                      referrer="Akshay Darji"
                    />
                    <JobReferral
                      title="Full Stack Engineer"
                      company="Google • Mountain View"
                      referrer="Class of 2026"
                    />
                  </div>
                </section>

                {/* Upcoming Events */}
                <section className="rounded-2xl border border-[#e9e6f4] bg-white p-5 shadow-[0_5px_25px_rgba(50,40,150,0.04)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <CalendarDays size={19} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Alumni Meetups
                      </h2>
                      <p className="text-[10px] text-slate-500">
                        Upcoming sessions & mixer
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <EventItem
                      month="NOV"
                      day="15"
                      title="Tech Portfolio & Mock Interviews"
                      type="Virtual Panel"
                    />
                    <EventItem
                      month="DEC"
                      day="05"
                      title="Annual Alumni Connect 2026"
                      type="Campus Auditorium"
                    />
                  </div>
                </section>

                {/* Verified Identity Guarantee Banner */}
                <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-5 text-white shadow-lg shadow-indigo-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                    <ShieldCheck size={22} className="text-white" />
                  </div>

                  <h3 className="mt-4 text-sm font-bold tracking-tight">
                    EduVault Verified Identity
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-indigo-100">
                    Every alumni profile in this network is backed by cryptographically sealed institutional records.
                  </p>

                  <Link
                    to="/verify"
                    className="
                      mt-4
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-4
                      py-2.5
                      text-xs
                      font-bold
                      text-indigo-600
                      transition
                      hover:bg-indigo-50
                    "
                  >
                    Open Verification Portal
                    <ArrowRight size={14} />
                  </Link>
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */
function StatCard({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#e9e6f4]
        bg-white
        p-5
        shadow-[0_5px_25px_rgba(50,40,150,0.04)]
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#11152a]">
            {value}
          </p>
          <p className="mt-1 text-[10px] font-medium text-indigo-600">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DYNAMIC ALUMNI CARD
========================================================= */
function AlumniCard({ person, onViewProfile }) {
  const [connected, setConnected] = useState(false);

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[#e9e6f4]
        bg-white
        shadow-[0_5px_20px_rgba(30,25,90,0.04)]
        transition
        hover:-translate-y-1
        hover:shadow-lg
        flex
        flex-col
        justify-between
      "
    >
      <div className="p-5">
        {/* Profile Header */}
        <div className="flex items-start gap-4">
          {person.profile_image ? (
            <img
              src={person.profile_image}
              alt={person.full_name}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-indigo-50/60"
            />
          ) : (
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-indigo-50
                text-base
                font-bold
                text-indigo-600
                ring-4
                ring-indigo-50/60
              "
            >
              {person.initials || "AL"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-1.5">
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-slate-900" title={person.full_name}>
                  {person.full_name}
                </h3>
                <p className="mt-0.5 truncate text-xs font-semibold text-indigo-600">
                  {person.current_role}
                </p>
              </div>

              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
                title={`${person.verified_count || 1} Verified institutional certificates`}
              >
                <CheckCircle2 size={15} />
              </span>
            </div>

            <p className="mt-1 truncate text-xs font-medium text-slate-500">
              {person.company}
            </p>
          </div>
        </div>

        {/* Academic & Geographic Info */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <GraduationCap size={13} className="shrink-0 text-indigo-500" />
            <span className="truncate">{person.graduation_display}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <MapPin size={13} className="shrink-0 text-indigo-500" />
            <span className="truncate">{person.location_display}</span>
          </div>
        </div>

        {/* Department / College */}
        {person.department && (
          <p className="mt-2 text-[10px] text-slate-400 truncate">
            {person.department} {person.college ? `• ${person.college.toUpperCase()}` : ""}
          </p>
        )}

        {/* Skills Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {(person.skills_list || []).slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="
                rounded-full
                bg-indigo-50
                px-2.5
                py-0.5
                text-[10px]
                font-semibold
                text-indigo-600
              "
            >
              {skill}
            </span>
          ))}
          {(person.skills_list || []).length > 3 && (
            <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[9px] font-semibold text-slate-500">
              +{(person.skills_list || []).length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 border-t border-slate-100 bg-[#faf9ff] px-5 py-3">
        {/* Direct Link to Verified Profile Dossier */}
        <button
          type="button"
          onClick={onViewProfile}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-1.5
            rounded-xl
            bg-indigo-600
            px-3.5
            py-2.5
            text-xs
            font-semibold
            text-white
            shadow-xs
            shadow-indigo-100
            hover:bg-indigo-700
            transition-colors
          "
        >
          <ExternalLink size={13} />
          <span>View Profile</span>
        </button>

        {/* Connect Button */}
        <button
          type="button"
          onClick={() => setConnected(!connected)}
          className={`
            flex
            items-center
            justify-center
            gap-1.5
            rounded-xl
            px-3
            py-2.5
            text-xs
            font-semibold
            transition-colors
            border
            ${
              connected
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
            }
          `}
        >
          {connected ? (
            <>
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>Connected</span>
            </>
          ) : (
            <>
              <UserPlus size={13} />
              <span>Connect</span>
            </>
          )}
        </button>

        {/* Mail Button */}
        {person.email && (
          <a
            href={`mailto:${person.email}?subject=EduVault%20Alumni%20Network%20Connection`}
            title={`Email ${person.full_name}`}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              hover:bg-indigo-50
              hover:text-indigo-600
              hover:border-indigo-200
              transition-colors
            "
          >
            <Mail size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   JOB REFERRAL ITEM
========================================================= */
function JobReferral({ title, company, referrer }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-100
        bg-[#faf9ff]
        p-3.5
        transition
        hover:border-indigo-100
        hover:bg-indigo-50/40
      "
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-slate-800">
            {title}
          </h4>
          <p className="mt-0.5 text-[10px] text-slate-500">
            {company}
          </p>
        </div>
        <ExternalLink size={13} className="shrink-0 text-indigo-500" />
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[8px] font-bold text-indigo-600">
          AL
        </div>
        <p className="text-[9px] text-slate-500">
          Network partner • <span className="font-semibold text-slate-700">{referrer}</span>
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   EVENT ITEM
========================================================= */
function EventItem({ month, day, title, type }) {
  return (
    <div className="flex gap-3 rounded-xl border border-slate-100 bg-[#faf9ff] p-3">
      <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-indigo-50">
        <span className="text-[8px] font-bold uppercase text-indigo-500">
          {month}
        </span>
        <span className="text-sm font-extrabold text-indigo-700">
          {day}
        </span>
      </div>

      <div className="min-w-0">
        <h4 className="truncate text-xs font-bold text-slate-800">
          {title}
        </h4>
        <div className="mt-1 flex items-center gap-1.5">
          <Clock3 size={11} className="text-slate-400" />
          <p className="truncate text-[9px] text-slate-500">
            {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AlumniNetwork;