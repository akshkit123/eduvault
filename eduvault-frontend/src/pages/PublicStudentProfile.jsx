import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  GraduationCap,
  Briefcase,
  FolderGit2,
  ExternalLink,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  QrCode,
  Printer,
  Share2,
  Calendar,
  Building2,
  FileCheck,
  AlertCircle,
  Loader2,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { getPublicStudentProfile } from "../api/profileApi";
import { API_BASE_URL } from "../api/apiClient";
import { getShareableUrl } from "../utils/qrHelper";

function GithubIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function PublicStudentProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getPublicStudentProfile(id);
        if (res.valid && res.data) {
          setProfileData(res.data);
        } else {
          setError(res.error || "Candidate profile not found.");
        }
      } catch (err) {
        setError(err.message || "Failed to load candidate profile.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  const shareableProfileUrl = getShareableUrl(`/student/${id}`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableProfileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getMediaUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
            <Loader2 size={28} className="animate-spin" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Verifying candidate credentials...
          </p>
          <p className="text-xs text-slate-400">Loading verified portfolio dossier</p>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle size={28} />
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Candidate Profile Not Found
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            {error || "The requested candidate profile ID or PRN does not exist or has been made private."}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-700"
            >
              Return to EduVault
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const p = profileData;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    shareableProfileUrl
  )}&margin=4`;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* =========================================================
          TOP BAR / INTERVIEW ACTIONS
      ========================================================= */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                Edu<span className="text-indigo-600">Vault</span>
              </span>
              <span className="ml-2 hidden rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 sm:inline">
                Verified Candidate Dossier
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              title="Copy Profile Link"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print / Save Dossier</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN CONTAINER
      ========================================================= */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* =========================================================
            CANDIDATE HERO CARD
        ========================================================= */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Background decorative tint */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-100/60 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Left: Avatar & Identity */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center md:items-start">
              <div className="relative shrink-0">
                {p.profile_image ? (
                  <img
                    src={getMediaUrl(p.profile_image)}
                    alt={p.full_name}
                    className="h-24 w-24 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-3xl font-extrabold text-white shadow-lg shadow-indigo-200">
                    {p.full_name?.charAt(0)?.toUpperCase() || "S"}
                  </div>
                )}
                {p.stats?.verified_by_committee && (
                  <span
                    className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white shadow-sm"
                    title="Committee Verified Student"
                  >
                    <CheckCircle2 size={16} />
                  </span>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    {p.full_name}
                  </h1>
                  {p.stats?.verified_by_committee && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                      <ShieldCheck size={13} />
                      Verified Candidate
                    </span>
                  )}
                </div>

                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-indigo-700">
                  <Building2 size={16} />
                  <span>{p.college || "Academic Institution"}</span>
                  <span className="text-slate-300">•</span>
                  <span>{p.department || "Department"}</span>
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  {p.prn_number && (
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono font-medium text-slate-700">
                      PRN: {p.prn_number}
                    </span>
                  )}
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                    Status: {p.graduation_status === "GRADUATED" ? `Graduated (${p.graduation_date || p.graduation_year || ""})` : `Ongoing (${p.graduation_year || "Current"})`}
                  </span>
                  {p.cgpa && (
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 font-bold text-indigo-700">
                      CGPA: {p.cgpa} / 10
                    </span>
                  )}
                </div>

                {/* Social & Contact */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.email && (
                    <a
                      href={`mailto:${p.email}`}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
                    >
                      <Mail size={13} />
                      {p.email}
                    </a>
                  )}

                  {p.mobile_number && (
                    <a
                      href={`tel:${p.mobile_number}`}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
                    >
                      <Phone size={13} />
                      {p.mobile_number}
                    </a>
                  )}

                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
                    >
                      <LinkedinIcon size={13} />
                      LinkedIn
                    </a>
                  )}

                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                    >
                      <GithubIcon size={13} />
                      GitHub
                    </a>
                  )}

                  {p.portfolio && (
                    <a
                      href={p.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
                    >
                      <Globe size={13} />
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Interview Pass QR Stamp */}
            <div className="flex flex-col items-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 p-4 text-center md:w-44">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Official Interview Key
              </span>
              <div className="mt-2 rounded-xl border border-white bg-white p-1.5 shadow-sm">
                <img
                  src={qrUrl}
                  alt="Candidate QR"
                  className="h-28 w-28 rounded-lg object-contain"
                />
              </div>
              <p className="mt-1.5 font-mono text-[9px] font-bold text-slate-500">
                EV-STUDENT-{p.id}
              </p>
              <span className="mt-1 text-[9px] text-slate-400">
                Scan for live verification
              </span>
            </div>
          </div>

          {/* Skills Matrix */}
          {Array.isArray(p.skills) && p.skills.length > 0 && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Candidate Skills & Competencies
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {p.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
                  >
                    <Sparkles size={11} className="text-indigo-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* =========================================================
            KEY STATS ROW
        ========================================================= */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">
              Verified Credentials
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-600">
                {p.stats?.verified_credentials ?? p.verified_documents?.length ?? 0}
              </span>
              <span className="text-[10px] font-semibold text-emerald-700">
                Approved
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">
              Academic Projects
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-indigo-600">
                {p.stats?.projects ?? p.projects?.length ?? 0}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Showcased
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">
              Internships
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-purple-600">
                {p.stats?.internships ?? p.internships?.length ?? 0}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Experience
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">
              Institutional Status
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-sm font-bold text-slate-800">
                {p.graduation_status === "GRADUATED" ? "Alumni" : "Enrolled"}
              </span>
              <span className="rounded bg-indigo-100 px-1 text-[10px] font-bold text-indigo-700">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 1: VERIFIED DOCUMENTS & CERTIFICATES
        ========================================================= */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Award size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Committee-Verified Credentials
                </h2>
                <p className="text-xs text-slate-500">
                  Official certificates & marksheets verified by college authority
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              {p.verified_documents?.length || 0} Authenticated
            </span>
          </div>

          {p.verified_documents?.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <FileCheck size={32} className="mx-auto text-slate-300" />
              <p className="mt-2 text-sm font-semibold text-slate-600">
                No committee-verified documents published yet
              </p>
              <p className="text-xs text-slate-400">
                Uploaded credentials will appear here once approved by the Institutional Committee.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.verified_documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        {doc.category || "CERTIFICATE"}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] font-semibold text-slate-400">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        Verified
                      </span>
                    </div>

                    <h3 className="mt-3 font-bold text-slate-900 line-clamp-2">
                      {doc.title}
                    </h3>

                    {doc.verification_id && (
                      <p className="mt-1 font-mono text-[10px] font-medium text-slate-500">
                        Key: <span className="font-bold text-indigo-600">{doc.verification_id}</span>
                      </p>
                    )}

                    <p className="mt-1 text-[10px] text-slate-400">
                      Verified on: {doc.verified_at ? new Date(doc.verified_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Approved"}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <Link
                      to={`/verify/${doc.verification_id || doc.id}`}
                      target="_blank"
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Verify Authenticity →
                    </Link>

                    {doc.file && (
                      <a
                        href={getMediaUrl(doc.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <ExternalLink size={12} />
                        View File
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================
            SECTION 2: PROJECTS PORTFOLIO
        ========================================================= */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <FolderGit2 size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Projects & Technical Showcase
                </h2>
                <p className="text-xs text-slate-500">
                  Practical software and academic research built by candidate
                </p>
              </div>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-200">
              {p.projects?.length || 0} Projects
            </span>
          </div>

          {p.projects?.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <FolderGit2 size={32} className="mx-auto text-slate-300" />
              <p className="mt-2 text-sm font-semibold text-slate-600">
                No projects added yet
              </p>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {p.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200">
                        {proj.project_type || "Academic"}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {proj.status || "Completed"}
                      </span>
                    </div>

                    <h3 className="mt-2.5 text-base font-bold text-slate-900">
                      {proj.title}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {proj.description || "No project description provided."}
                    </p>

                    {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {proj.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                    {proj.live_url && (
                      <a
                        href={proj.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}

                    {proj.github_url && (
                      <a
                        href={proj.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <GithubIcon size={13} />
                        Repository
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================
            SECTION 3: INTERNSHIPS & WORK EXPERIENCE
        ========================================================= */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Briefcase size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Internships & Industry Experience
                </h2>
                <p className="text-xs text-slate-500">
                  Professional work engagements & verified industry training
                </p>
              </div>
            </div>
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200">
              {p.internships?.length || 0} Experiences
            </span>
          </div>

          {p.internships?.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <Briefcase size={32} className="mx-auto text-slate-300" />
              <p className="mt-2 text-sm font-semibold text-slate-600">
                No internships documented yet
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {p.internships.map((intern) => (
                <div
                  key={intern.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {intern.role}
                      </h3>
                      <p className="text-xs font-semibold text-indigo-700">
                        {intern.company} • {intern.location || "Remote / Onsite"}
                      </p>
                    </div>

                    <span className="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 border border-purple-200 sm:self-start">
                      {intern.duration || "Internship"}
                    </span>
                  </div>

                  {intern.responsibilities && (
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                      {intern.responsibilities}
                    </p>
                  )}

                  {intern.certificate_url && (
                    <div className="mt-3">
                      <a
                        href={intern.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        <ExternalLink size={12} />
                        View Experience Certificate
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================
            SECTION 4: INSTITUTIONAL VERIFICATION AUDIT TRAIL
        ========================================================= */}
        <section className="mt-12 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-200">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  EduVault Trust & Verification Assurance
                </h3>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600">
                  This candidate dossier was generated from verified institutional records. Credential verification keys are cryptographically anchored to prevent academic fraud.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 shadow-xs md:self-auto">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Direct Institutional Source</span>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400 print:hidden">
        <p>© {new Date().getFullYear()} EduVault Academic Credential Verification System.</p>
      </footer>
    </div>
  );
}

export default PublicStudentProfile;
