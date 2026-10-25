import { useState } from "react";
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock3,
  XCircle,
  QrCode,
  Download,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getShareableUrl } from "../../utils/qrHelper";

export default function ShareVerificationModal({
  document,
  student,
  type = "DOCUMENT",
  onClose,
}) {
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // If student profile mode:
  const isStudentMode = Boolean(student || type === "STUDENT");

  if (!document && !student) return null;

  const targetPath = isStudentMode
    ? `/student/${student.id}`
    : `/verify/${document.verification_id || document.id}`;
  const targetUrl = getShareableUrl(targetPath);

  const lookupCode = isStudentMode
    ? student.prn_number || `EV-STUDENT-${student.id}`
    : document.verification_id || document.id;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    targetUrl
  )}&margin=10`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(String(lookupCode));
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  const isVerified = isStudentMode ? true : document.status === "VERIFIED";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                isVerified
                  ? "bg-emerald-100 text-emerald-600 shadow-sm shadow-emerald-100"
                  : "bg-amber-100 text-amber-600 shadow-sm shadow-amber-100"
              }`}
            >
              {isStudentMode ? (
                <GraduationCap size={24} />
              ) : isVerified ? (
                <ShieldCheck size={24} />
              ) : (
                <Clock3 size={24} />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isStudentMode
                  ? "Candidate Interview Pass"
                  : isVerified
                  ? "Verified Credential QR"
                  : "Credential Details"}
              </h3>
              <p className="text-xs text-slate-500">
                {isStudentMode
                  ? "Interviewer scan & verification key"
                  : "Public digital verification record"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Info Card */}
        <div className="mt-4 rounded-2xl border border-slate-100 bg-[#f8f7ff] p-3.5">
          {isStudentMode ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-indigo-700 uppercase">
                  Verified Candidate
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  <ShieldCheck size={11} className="text-emerald-600" />
                  <span>Interview Ready</span>
                </span>
              </div>
              <h4 className="mt-2 text-sm font-bold text-slate-900">
                {student.full_name || student.email}
              </h4>
              <p className="mt-0.5 text-xs text-indigo-700">
                {student.college || "Academic Institution"} • {student.department || "Department"}
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-indigo-700 uppercase">
                  {document.category || "Certificate"}
                </span>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isVerified
                      ? "bg-emerald-100 text-emerald-800"
                      : document.status === "REJECTED"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {isVerified ? (
                    <ShieldCheck size={11} className="text-emerald-600" />
                  ) : document.status === "REJECTED" ? (
                    <XCircle size={11} className="text-rose-600" />
                  ) : (
                    <Clock3 size={11} className="text-amber-600" />
                  )}
                  <span>{document.status || "Pending"}</span>
                </span>
              </div>

              <h4 className="mt-2 truncate text-sm font-bold text-slate-800">
                {document.title}
              </h4>
            </div>
          )}

          <div className="mt-2 flex items-center justify-between border-t border-indigo-50/80 pt-2 text-xs">
            <span className="text-[11px] font-medium text-slate-500">
              {isStudentMode ? "Vault Identifier:" : "Verification Code:"}
            </span>
            <button
              type="button"
              onClick={handleCopyId}
              className="flex items-center gap-1 font-mono font-bold text-indigo-600 hover:text-indigo-800"
            >
              <span>{lookupCode}</span>
              {copiedId ? (
                <Check size={12} className="text-emerald-600" />
              ) : (
                <Copy size={12} />
              )}
            </button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-100 bg-white p-5 text-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
            <img
              src={qrImageUrl}
              alt="QR Code"
              className="h-40 w-40 object-contain"
            />
          </div>

          <p className="mt-3 text-xs font-semibold text-slate-700">
            {isStudentMode
              ? "Scan for Candidate Details"
              : "Scan to Verify on Mobile"}
          </p>
          <p className="mt-0.5 max-w-[260px] text-[11px] text-slate-400">
            {isStudentMode
              ? "Interviewers can scan to review verified credentials, CGPA, projects & internships."
              : "Recruiters or third-party institutions can scan to confirm authenticity directly."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 space-y-2.5">
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition shadow-xs ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>
              {copied ? "Link Copied to Clipboard!" : "Copy Verification Link"}
            </span>
          </button>

          <Link
            to={targetUrl.replace(window.location.origin, "")}
            target="_blank"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <span>
              {isStudentMode
                ? "Preview Interview Profile"
                : "Open Public Verification Page"}
            </span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
