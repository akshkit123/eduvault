import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Clock3,
  XCircle,
  Search,
  ExternalLink,
  Download,
  CheckCircle2,
  Calendar,
  Building2,
  GraduationCap,
  FileText,
  User,
  ArrowLeft,
  Copy,
  Check,
  ShieldAlert,
  Camera,
  Upload,
  QrCode,
} from "lucide-react";
import { API_BASE_URL } from "../api/apiClient";
import QRScannerModal from "../components/common/QRScannerModal";
import { getShareableUrl } from "../utils/qrHelper";

export default function PublicVerify() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(code || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // =========================================================
  // LOOKUP CREDENTIAL OR CANDIDATE
  // =========================================================
  const verifyLookup = async (lookupValue) => {
    if (!lookupValue || !lookupValue.trim()) return;

    const cleanCode = lookupValue.trim();

    // If it's a student code prefix:
    if (cleanCode.startsWith("EV-STUDENT-")) {
      const studentId = cleanCode.replace("EV-STUDENT-", "").trim();
      navigate(`/student/${studentId}`);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      // 1. Try document verification first
      const docResponse = await fetch(
        `${API_BASE_URL}/api/documents/public-verify/${encodeURIComponent(
          cleanCode
        )}/`
      );

      if (docResponse.ok) {
        const docData = await docResponse.json();
        setResult(docData.data);
        return;
      }

      // 2. If not a document, try looking up as a student/candidate profile
      const studentResponse = await fetch(
        `${API_BASE_URL}/api/students/public/${encodeURIComponent(
          cleanCode
        )}/`
      );

      if (studentResponse.ok) {
        const studentData = await studentResponse.json();
        if (studentData.valid && studentData.data) {
          navigate(`/student/${studentData.data.id}`);
          return;
        }
      }

      throw new Error(
        "No authentic credential or student record found matching this code."
      );
    } catch (err) {
      console.error("Verification lookup error:", err);
      setError(
        err.message ||
        "Could not verify credential. Please check the code and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      setSearchQuery(code);
      verifyLookup(code);
    }
  }, [code]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    if (query.startsWith("EV-STUDENT-")) {
      const sId = query.replace("EV-STUDENT-", "").trim();
      navigate(`/student/${sId}`);
      return;
    }

    navigate(`/verify/${query}`);
    verifyLookup(query);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFullFileUrl = (url) => {
    if (!url) return "#";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const qrImageUrl = result?.verification_id
    ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
        getShareableUrl(`/verify/${result.verification_id}`)
      )}&margin=8`
    : null;

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#15182b]">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-sm shadow-indigo-200">
              <ShieldCheck size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900">
                EduVault
              </span>
              <span className="-mt-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                Official Credential Registry
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsScannerOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 shadow-xs transition hover:bg-indigo-100"
            >
              <Camera size={14} />
              <span>Scan QR</span>
            </button>

            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <span>Member Login</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            <ShieldCheck size={14} className="text-indigo-600" />
            <span>Institutional Credential & Candidate Ledger</span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Scan & Verify Credentials
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
            Scan a candidate's Interview Key with your camera or enter a Verification ID to validate authentic academic records.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto mt-6 flex max-w-lg items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xs focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"
          >
            <div className="flex flex-1 items-center gap-2 pl-3">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Verification ID, Candidate Key, or PRN..."
                className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              <span>Verify</span>
            </button>
          </form>

          {/* Scanner Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsScannerOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700"
            >
              <Camera size={15} />
              <span>Scan QR with Camera</span>
            </button>

            <button
              type="button"
              onClick={() => setIsScannerOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50"
            >
              <Upload size={15} />
              <span>Upload QR Image</span>
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-12">
            <Loader2 size={36} className="animate-spin text-indigo-600" />
            <p className="mt-3 text-sm font-semibold text-slate-600">
              Validating credential with institutional ledger...
            </p>
          </div>
        )}

        {/* Error / Not Found Result */}
        {!loading && error && (
          <div className="mt-10 rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <XCircle size={28} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Credential Verification Failed
            </h3>
            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-rose-600">
              {error}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Please ensure you copied the entire Verification ID (e.g. EV-XXXXXXXXXX).
            </p>
          </div>
        )}

        {/* Verification Success Record */}
        {!loading && result && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            {/* Status Header Banner */}
            {result.status === "VERIFIED" ? (
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-4 text-white">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-xs">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                        Institutional Trust Guarantee
                      </p>
                      <h2 className="text-lg font-extrabold tracking-tight">
                        Authentic & Verified Credential
                      </h2>
                    </div>
                  </div>

                  <span className="self-start rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-bold backdrop-blur-xs sm:self-auto">
                    {result.verification_id || `ID: #${result.id}`}
                  </span>
                </div>
              </div>
            ) : result.status === "REJECTED" ? (
              <div className="bg-gradient-to-r from-rose-600 to-red-700 px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                  <XCircle size={24} />
                  <div>
                    <h2 className="text-base font-bold">Credential Rejected</h2>
                    <p className="text-xs text-rose-100">
                      This document failed institutional validation and was rejected.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                  <Clock3 size={24} />
                  <div>
                    <h2 className="text-base font-bold">Verification Pending</h2>
                    <p className="text-xs text-amber-100">
                      This document has been submitted and is currently in the committee audit queue.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Document Content Details */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Left: Credential Details */}
                <div className="space-y-6 md:col-span-2">
                  <div>
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 uppercase">
                      {result.category}
                    </span>
                    <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                      {result.title}
                    </h3>
                  </div>

                  {/* Student & College Metadata Grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-100 bg-[#f8f7ff] p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <User size={15} className="text-indigo-600" />
                        <span>Issued To Student</span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-900">
                        {result.student_name || "Enrolled Student"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {result.department || "Higher Education"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-[#f8f7ff] p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Building2 size={15} className="text-indigo-600" />
                        <span>Issuing Institution</span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-900">
                        {result.college || "Authorized College"}
                      </p>
                      <p className="text-xs text-emerald-600 font-semibold">
                        Registered Academic Member
                      </p>
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div className="grid grid-cols-1 gap-4 text-xs text-slate-500 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      <span>
                        Verified:{" "}
                        <strong className="text-slate-700">
                          {result.verified_at
                            ? new Date(result.verified_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "Awaiting Committee"}
                        </strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" />
                      <span>
                        Uploaded:{" "}
                        <strong className="text-slate-700">
                          {result.created_at
                            ? new Date(result.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "--"}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                    {result.file && (
                      <a
                        href={getFullFileUrl(result.file)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700"
                      >
                        <ExternalLink size={14} />
                        <span>View Official Document</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {copied ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                      <span>{copied ? "Copied Link!" : "Copy Verification URL"}</span>
                    </button>
                  </div>
                </div>

                {/* Right: QR Code & Cryptographic Seal */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-b from-[#f8f7ff] to-white p-6 text-center">
                  <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
                    {qrImageUrl ? (
                      <img
                        src={qrImageUrl}
                        alt="Verification QR Code"
                        className="h-32 w-32 object-contain"
                      />
                    ) : (
                      <div className="flex h-32 w-32 items-center justify-center bg-slate-50">
                        <ShieldCheck size={32} className="text-slate-300" />
                      </div>
                    )}
                  </div>

                  <p className="mt-3 text-xs font-bold text-slate-800">
                    Scan to Verify
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Recruiters & evaluators can verify authenticity directly from mobile.
                  </p>

                  <div className="mt-4 w-full border-t border-indigo-100/70 pt-3">
                    <span className="block text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                      Verification Hash
                    </span>
                    <span className="block mt-0.5 font-mono text-[11px] font-bold text-indigo-700 break-all">
                      {result.verification_id || `EV-DOC-${result.id}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />
    </div>
  );
}
