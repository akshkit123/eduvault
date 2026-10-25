import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  ShieldCheck,
  Award,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Copy,
  Check,
  FileCheck,
  Building2,
  GraduationCap,
  Sparkles,
  LogOut,
  Mail,
  Phone,
  Printer,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
} from "lucide-react";

import { getPlacementCandidates } from "../../api/placementApi";
import { getCurrentUser } from "../../api/authApi";
import { logout } from "../../api/apiClient";
import { getShareableUrl } from "../../utils/qrHelper";

export default function PlacementDashboard() {
  const navigate = useNavigate();

  // Current placement officer
  const [officer, setOfficer] = useState(null);

  // Filters State
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [minCgpa, setMinCgpa] = useState("");
  const [status, setStatus] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Data State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({
    total_candidates: 0,
    placement_ready: 0,
    verified_candidates: 0,
    avg_cgpa: 0,
    departments_count: 0,
  });

  // Copied link toast feedback
  const [copiedId, setCopiedId] = useState(null);

  // Auth & Initial Load
  useEffect(() => {
    async function checkAuth() {
      try {
        const u = await getCurrentUser();
        if (u.role !== "PLACEMENT" && u.role !== "COMMITTEE" && u.role !== "ADMIN") {
          navigate("/dashboard");
          return;
        }
        setOfficer(u);
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login");
      }
    }
    checkAuth();
  }, [navigate]);

  // Load Candidates with debounce
  useEffect(() => {
    let isCancelled = false;
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPlacementCandidates({
          search,
          department,
          min_cgpa: minCgpa,
          status,
          verified_only: verifiedOnly,
        });

        if (!isCancelled) {
          setCandidates(data.results || []);
          if (data.departments) {
            setDepartments(data.departments);
          }
          if (data.stats) {
            setStats(data.stats);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Placement candidates fetch error:", err);
          if (err.message?.includes("401")) {
            navigate("/login");
            return;
          }
          setError("Failed to load candidates. Please verify credentials.");
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
  }, [search, department, minCgpa, status, verifiedOnly, navigate]);

  const handleCopyLink = (candidateId) => {
    const link = getShareableUrl(`/candidate/${candidateId}`);
    navigator.clipboard.writeText(link);
    setCopiedId(candidateId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleResetFilters = () => {
    setSearch("");
    setDepartment("All");
    setMinCgpa("");
    setStatus("All");
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* =========================================================
          TOP NAVIGATION BAR
      ========================================================= */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md print:hidden">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link to="/placement/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200">
                <Briefcase size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  EduVault
                </span>
                <span className="-mt-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Placement & T&P Portal
                </span>
              </div>
            </Link>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
              title="Print Recruitment Batch Roster"
            >
              <Printer size={14} />
              Print Roster
            </button>

            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-900">
                {officer ? `${officer.first_name} ${officer.last_name}`.trim() || officer.email : "Placement Officer"}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {officer?.college?.toUpperCase() || "Training & Placement Cell"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50/80 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title & Intro */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
              <Sparkles size={13} />
              Corporate Recruitment & Student Eligibility Engine
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Candidate Pool & Placement Drives
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Filter campus talent by verified institutional CGPA, verified degrees, projects, and work experience. Share authenticated QR-backed dossiers directly with visiting recruiters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
              <ShieldCheck size={14} />
              Tamper-Proof Verification
            </span>
          </div>
        </div>

        {/* =========================================================
            KEY RECRUITMENT STATS
        ========================================================= */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatBox
            icon={Users}
            label="Total Candidates"
            value={loading ? "--" : stats.total_candidates}
            subtext="Enrolled in placement pool"
            color="blue"
          />
          <StatBox
            icon={CheckCircle2}
            label="Placement Ready"
            value={loading ? "--" : stats.placement_ready}
            subtext="CGPA ≥ 6.5 & Verified Docs"
            color="emerald"
          />
          <StatBox
            icon={Award}
            label="Verified Credentials"
            value={loading ? "--" : stats.verified_candidates}
            subtext="Students with audited certificates"
            color="indigo"
          />
          <StatBox
            icon={GraduationCap}
            label="Average CGPA"
            value={loading ? "--" : stats.avg_cgpa ? `${stats.avg_cgpa} / 10` : "N/A"}
            subtext="Across candidate pool"
            color="amber"
          />
        </div>

        {/* =========================================================
            DRIVE CRITERIA & ELIGIBILITY FILTERS
        ========================================================= */}
        <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex flex-col gap-4">
            {/* Search & Main Selectors */}
            <div className="flex flex-col gap-3 lg:flex-row">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by student name, PRN, email, or skill (e.g. React, Python)..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-xs font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Department Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="h-11 min-w-[170px] rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium text-slate-700 outline-none focus:border-blue-500"
                >
                  <option value="All">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch / Status Selector */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 min-w-[150px] rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="All">All Batches</option>
                <option value="ONGOING">Current Students</option>
                <option value="GRADUATED">Graduated Alumni</option>
              </select>
            </div>

            {/* Quick CGPA Cutoff Pills & Verification Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                  <Filter size={12} /> Min CGPA Cutoff:
                </span>
                {["", "6.0", "7.0", "7.5", "8.0", "8.5"].map((cutoff) => (
                  <button
                    key={cutoff || "all"}
                    type="button"
                    onClick={() => setMinCgpa(cutoff)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      minCgpa === cutoff
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cutoff ? `${cutoff}+` : "Any"}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="h-4 w-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Verified Credentials Only</span>
                </label>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            CANDIDATE ROSTER / TALENT POOL TABLE
        ========================================================= */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Eligible Candidate Roster
              </h2>
              <p className="text-xs text-slate-500">
                {loading ? "Filtering talent pool..." : `${candidates.length} candidates match current drive requirements`}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>Placement Ready: CGPA ≥ 6.5 & Verified</span>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 mb-3">
                <AlertCircle size={24} />
              </div>
              <p className="text-sm font-semibold text-slate-800">{error}</p>
              <button
                onClick={handleResetFilters}
                className="mt-3 text-xs font-bold text-blue-600 underline"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-5 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200" />
                    <div className="space-y-1.5">
                      <div className="h-3.5 w-40 rounded-sm bg-slate-200" />
                      <div className="h-3 w-28 rounded-sm bg-slate-100" />
                    </div>
                  </div>
                  <div className="h-4 w-16 rounded-sm bg-slate-200" />
                  <div className="h-8 w-24 rounded-lg bg-slate-100" />
                </div>
              ))}
            </div>
          )}

          {/* Candidate Table */}
          {!loading && candidates.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3.5">Candidate Details</th>
                    <th className="px-4 py-3.5">PRN & Dept</th>
                    <th className="px-4 py-3.5">Verified CGPA</th>
                    <th className="px-4 py-3.5">Credentials & Portfolio</th>
                    <th className="px-4 py-3.5">Drive Readiness</th>
                    <th className="px-6 py-3.5 text-right">Recruiter Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {candidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      {/* Name & Contact */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xs font-bold text-blue-700">
                            {candidate.full_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 group-hover:text-blue-600 transition block truncate">
                              {candidate.full_name}
                            </span>
                            <span className="text-[11px] text-slate-400 block truncate">
                              {candidate.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* PRN & Dept */}
                      <td className="px-4 py-4">
                        <span className="font-semibold text-slate-800 block">
                          {candidate.prn_number}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate max-w-[150px]">
                          {candidate.department || "Engineering"}
                        </span>
                      </td>

                      {/* CGPA */}
                      <td className="px-4 py-4">
                        {candidate.cgpa ? (
                          <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                candidate.cgpa >= 8.5
                                  ? "bg-emerald-500"
                                  : candidate.cgpa >= 7.0
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            <span>{candidate.cgpa}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">N/A</span>
                        )}
                      </td>

                      {/* Verified Records */}
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <ShieldCheck size={13} className="text-emerald-600" />
                            <span>{candidate.verified_credentials} Verified Certs</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span>{candidate.projects_count} Projects</span>
                            <span>•</span>
                            <span>{candidate.internships_count} Internships</span>
                          </div>
                        </div>
                      </td>

                      {/* Placement Readiness */}
                      <td className="px-4 py-4">
                        {candidate.placement_ready ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-100">
                            <CheckCircle2 size={11} />
                            Ready for Drive
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-100">
                            Audit Pending
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Copy Recruiter Link */}
                          <button
                            type="button"
                            onClick={() => handleCopyLink(candidate.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
                            title="Copy candidate verification link for corporate recruiter"
                          >
                            {copiedId === candidate.id ? (
                              <>
                                <Check size={13} className="text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Share</span>
                              </>
                            )}
                          </button>

                          {/* View Recruiter Dossier */}
                          <Link
                            to={`/candidate/${candidate.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-2xs hover:bg-blue-700 transition"
                          >
                            <span>Open Dossier</span>
                            <ExternalLink size={12} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {!loading && candidates.length === 0 && !error && (
            <div className="p-12 text-center">
              <Users size={40} className="mx-auto text-slate-300" />
              <h3 className="mt-3 text-sm font-bold text-slate-800">
                No candidates match these criteria
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                Try lowering the CGPA cutoff, selecting &quot;All Departments&quot;, or unchecking &quot;Verified Credentials Only&quot;.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
              >
                Reset All Criteria
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   STAT BOX COMPONENT
========================================================= */
function StatBox({ icon: Icon, label, value, subtext, color = "blue" }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900">
            {value}
          </p>
          <p className="mt-1 text-[11px] font-medium text-slate-500">
            {subtext}
          </p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorMap[color] || colorMap.blue}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
