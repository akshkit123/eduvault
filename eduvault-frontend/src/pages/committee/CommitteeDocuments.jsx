import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileCheck,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Eye,
  ExternalLink,
  Download,
  AlertCircle,
  RefreshCw,
  Loader2,
  FileText,
  User,
  Calendar,
  X,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import CommitteeNavbar from "../../components/committee/CommitteeNavbar";
import {
  getCommitteeDocuments,
  verifyDocument,
  rejectDocument,
} from "../../api/committeeApi";
import { API_BASE_URL } from "../../api/apiClient";

export default function CommitteeDocuments() {
  const navigate = useNavigate();

  // Data states
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("PENDING"); // default to PENDING for fast queue review
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Modal states
  const [previewDoc, setPreviewDoc] = useState(null);
  const [rejectingDoc, setRejectingDoc] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [reasonModalDoc, setReasonModalDoc] = useState(null);

  const quickRejectionReasons = [
    "Blurry or illegible document scan",
    "Missing institutional seal or authorized signature",
    "Student name or PRN does not match profile",
    "Uploaded file does not match selected category",
    "Document is incomplete or pages are missing",
    "Expired or invalid credential",
  ];

  // =====================================================
  // FETCH DOCUMENTS
  // =====================================================
  const loadDocuments = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError("");

      const data = await getCommitteeDocuments();
      setDocuments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load committee documents:", err);
      if (err.message?.includes("401") || err.message === "NO_ACCESS_TOKEN") {
        navigate("/login");
        return;
      }
      if (err.message?.includes("403")) {
        navigate("/dashboard");
        return;
      }
      setError(err.message || "Failed to load documents from server.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // =====================================================
  // COMPUTED STATS
  // =====================================================
  const stats = useMemo(() => {
    const total = documents.length;
    const pending = documents.filter((d) => d.status === "PENDING").length;
    const verified = documents.filter((d) => d.status === "VERIFIED").length;
    const rejected = documents.filter((d) => d.status === "REJECTED").length;
    return { total, pending, verified, rejected };
  }, [documents]);

  // =====================================================
  // FILTERED DOCUMENTS
  // =====================================================
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Status filter
      if (statusFilter !== "ALL" && doc.status !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== "ALL" && doc.category !== categoryFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = doc.title?.toLowerCase().includes(query);
        const nameMatch = doc.student_name?.toLowerCase().includes(query);
        const emailMatch = doc.student_email?.toLowerCase().includes(query);
        if (!titleMatch && !nameMatch && !emailMatch) {
          return false;
        }
      }

      return true;
    });
  }, [documents, statusFilter, categoryFilter, searchQuery]);

  // =====================================================
  // ACTIONS: VERIFY
  // =====================================================
  const handleVerify = async (docId) => {
    try {
      setActionLoading(true);
      const updated = await verifyDocument(docId);

      // Update state locally
      setDocuments((prev) =>
        prev.map((d) => (d.id === docId ? { ...d, ...updated, status: "VERIFIED" } : d))
      );

      // If open in preview, update preview too
      if (previewDoc?.id === docId) {
        setPreviewDoc((prev) => ({ ...prev, status: "VERIFIED" }));
      }

      showFeedback("Document successfully verified and marked official.", "success");
    } catch (err) {
      console.error("Verification failed:", err);
      showFeedback(err.message || "Failed to verify document.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // ACTIONS: REJECT
  // =====================================================
  const openRejectModal = (doc) => {
    setRejectingDoc(doc);
    setRejectionReason("");
  };

  const handleConfirmReject = async () => {
    if (!rejectingDoc) return;
    if (!rejectionReason.trim()) {
      alert("Please provide or select a reason for rejecting this document.");
      return;
    }

    try {
      setActionLoading(true);
      const updated = await rejectDocument(rejectingDoc.id, rejectionReason.trim());

      // Update state locally
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === rejectingDoc.id
            ? { ...d, ...updated, status: "REJECTED", rejection_reason: rejectionReason.trim() }
            : d
        )
      );

      // If open in preview, update preview too
      if (previewDoc?.id === rejectingDoc.id) {
        setPreviewDoc((prev) => ({
          ...prev,
          status: "REJECTED",
          rejection_reason: rejectionReason.trim(),
        }));
      }

      showFeedback("Document marked as Rejected with feedback provided to student.", "info");
      setRejectingDoc(null);
      setRejectionReason("");
    } catch (err) {
      console.error("Rejection failed:", err);
      showFeedback(err.message || "Failed to reject document.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const showFeedback = (text, type = "success") => {
    setFeedbackMessage({ text, type });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4500);
  };

  // Helper to format full file URL
  const getFileUrl = (filePath) => {
    if (!filePath) return "#";
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }
    return `${API_BASE_URL}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  const isPdf = (url) => url?.toLowerCase().includes(".pdf");

  return (
    <div className="min-h-screen bg-[#f8f7ff] pb-16">
      {/* Navigation */}
      <CommitteeNavbar pendingDocumentsCount={stats.pending} />

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Toast Feedback */}
        {feedbackMessage && (
          <div
            className={`mb-6 flex items-center justify-between rounded-xl px-4 py-3.5 shadow-sm transition ${
              feedbackMessage.type === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                : feedbackMessage.type === "error"
                ? "border border-rose-200 bg-rose-50 text-rose-800"
                : "border border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedbackMessage.type === "success" ? (
                <CheckCircle2 size={19} className="text-emerald-600" />
              ) : feedbackMessage.type === "error" ? (
                <AlertCircle size={19} className="text-rose-600" />
              ) : (
                <ShieldAlert size={19} className="text-amber-600" />
              )}
              <span className="text-sm font-medium">{feedbackMessage.text}</span>
            </div>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="rounded-md p-1 hover:bg-black/5"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                Audit & Verification
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Document Review Queue</span>
            </div>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Document Verification
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Audit student-submitted credentials and verify their authenticity before official issuance.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => loadDocuments(true)}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 disabled:opacity-60"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              <span>{refreshing ? "Refreshing..." : "Refresh Queue"}</span>
            </button>
          </div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-rose-600" />
            <div className="flex-1 text-sm">
              <p className="font-semibold">Unable to load documents</p>
              <p className="mt-0.5 text-rose-700">{error}</p>
            </div>
            <button
              onClick={() => loadDocuments()}
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats Row */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {/* Total Submissions */}
          <div
            onClick={() => setStatusFilter("ALL")}
            className={`cursor-pointer rounded-2xl border p-5 shadow-xs transition hover:shadow-md ${
              statusFilter === "ALL"
                ? "border-indigo-400 bg-indigo-50/40 ring-2 ring-indigo-200"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Submitted
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <FileText size={17} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {loading ? "--" : stats.total}
            </p>
            <p className="mt-1 text-xs text-slate-400">All student documents</p>
          </div>

          {/* Pending Review */}
          <div
            onClick={() => setStatusFilter("PENDING")}
            className={`relative cursor-pointer overflow-hidden rounded-2xl border p-5 shadow-xs transition hover:shadow-md ${
              statusFilter === "PENDING"
                ? "border-amber-400 bg-amber-50/50 ring-2 ring-amber-200"
                : "border-slate-200 bg-white hover:border-amber-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Pending Review
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <Clock3 size={17} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-amber-900 sm:text-3xl">
              {loading ? "--" : stats.pending}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-600">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              <span>Requires verification</span>
            </div>
          </div>

          {/* Verified */}
          <div
            onClick={() => setStatusFilter("VERIFIED")}
            className={`cursor-pointer rounded-2xl border p-5 shadow-xs transition hover:shadow-md ${
              statusFilter === "VERIFIED"
                ? "border-emerald-400 bg-emerald-50/50 ring-2 ring-emerald-200"
                : "border-slate-200 bg-white hover:border-emerald-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Verified
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={17} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-emerald-900 sm:text-3xl">
              {loading ? "--" : stats.verified}
            </p>
            <p className="mt-1 text-xs text-emerald-600">Issued & authentic</p>
          </div>

          {/* Rejected */}
          <div
            onClick={() => setStatusFilter("REJECTED")}
            className={`cursor-pointer rounded-2xl border p-5 shadow-xs transition hover:shadow-md ${
              statusFilter === "REJECTED"
                ? "border-rose-400 bg-rose-50/50 ring-2 ring-rose-200"
                : "border-slate-200 bg-white hover:border-rose-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                Rejected
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                <XCircle size={17} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-rose-900 sm:text-3xl">
              {loading ? "--" : stats.rejected}
            </p>
            <p className="mt-1 text-xs text-rose-600">Returned with feedback</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          {/* Search box */}
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, email, or document title..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-10 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 text-xs font-medium text-slate-600">
            {["ALL", "PENDING", "VERIFIED", "REJECTED"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 transition ${
                  statusFilter === st
                    ? "bg-white font-semibold text-slate-900 shadow-xs"
                    : "hover:text-slate-900"
                }`}
              >
                {st.charAt(0) + st.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="relative shrink-0">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-8 pl-3 text-xs font-semibold text-slate-700 transition focus:border-indigo-500 focus:outline-none sm:w-auto"
            >
              <option value="ALL">All Categories</option>
              <option value="CERTIFICATE">Certificates</option>
              <option value="MARKSHEET">Marksheets</option>
              <option value="INTERNSHIP">Internships</option>
              <option value="PROJECT">Projects</option>
              <option value="ACHIEVEMENT">Achievements</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        {/* Content Table / Card List */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 size={32} className="animate-spin text-indigo-600" />
              <p className="mt-3 text-sm font-medium text-slate-600">
                Loading verification queue...
              </p>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                <FileCheck size={28} />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-800">
                No documents found
              </h3>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
                {searchQuery || statusFilter !== "ALL" || categoryFilter !== "ALL"
                  ? "No submissions match your active filters. Try clearing search or status filters."
                  : "There are currently no documents in the verification queue."}
              </p>
              {(searchQuery || statusFilter !== "ALL" || categoryFilter !== "ALL") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("ALL");
                    setCategoryFilter("ALL");
                  }}
                  className="mt-4 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                >
                  Reset all filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 pl-6 pr-4">Student</th>
                    <th className="px-4 py-3.5">Document Details</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Submitted</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="py-3.5 pr-6 pl-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredDocuments.map((doc) => {
                    const initials =
                      doc.student_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2) || "ST";

                    return (
                      <tr
                        key={doc.id}
                        className="transition hover:bg-slate-50/70"
                      >
                        {/* Student Column */}
                        <td className="py-4 pl-6 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 text-xs font-bold text-white shadow-xs">
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-900">
                                {doc.student_name || "Unnamed Student"}
                              </p>
                              <p className="truncate text-xs text-slate-400">
                                {doc.student_email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Document Details */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-800">
                              {doc.title}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              ID: #{doc.id}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                            {doc.category}
                          </span>
                        </td>

                        {/* Submitted Date */}
                        <td className="px-4 py-4 text-xs text-slate-500">
                          {doc.created_at
                            ? new Date(doc.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "--"}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          {doc.status === "VERIFIED" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 size={13} className="text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          ) : doc.status === "REJECTED" ? (
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                                <XCircle size={13} className="text-rose-600" />
                                <span>Rejected</span>
                              </span>
                              {doc.rejection_reason && (
                                <button
                                  type="button"
                                  onClick={() => setReasonModalDoc(doc)}
                                  className="text-slate-400 hover:text-slate-600"
                                  title="View rejection reason"
                                >
                                  <MessageSquare size={14} />
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                              <Clock3 size={13} className="text-amber-600" />
                              <span>Pending</span>
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 pr-6 pl-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Preview */}
                            <button
                              type="button"
                              onClick={() => setPreviewDoc(doc)}
                              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                              title="Preview document"
                            >
                              <Eye size={14} />
                              <span className="hidden sm:inline">Inspect</span>
                            </button>

                            {/* Verify Button (only if Pending) */}
                            {doc.status === "PENDING" && (
                              <button
                                type="button"
                                onClick={() => handleVerify(doc.id)}
                                disabled={actionLoading}
                                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-emerald-700 disabled:opacity-50"
                                title="Approve & Verify"
                              >
                                <CheckCircle2 size={14} />
                                <span>Verify</span>
                              </button>
                            )}

                            {/* Reject Button (only if Pending) */}
                            {doc.status === "PENDING" && (
                              <button
                                type="button"
                                onClick={() => openRejectModal(doc)}
                                disabled={actionLoading}
                                className="flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-rose-600 shadow-2xs transition hover:bg-rose-50 disabled:opacity-50"
                                title="Reject with reason"
                              >
                                <XCircle size={14} />
                                <span>Reject</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* =====================================================
          DOCUMENT PREVIEW & AUDIT MODAL
      ====================================================== */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="flex h-[90vh] w-full max-w-4xl flex-col rounded-3xl bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                    {previewDoc.category}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-medium text-slate-500">
                    Uploaded by {previewDoc.student_name} ({previewDoc.student_email})
                  </span>
                </div>
                <h2 className="mt-1 truncate text-lg font-bold text-slate-900">
                  {previewDoc.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getFileUrl(previewDoc.file)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <ExternalLink size={14} />
                  <span>Open Full Window</span>
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Viewer Body */}
            <div className="relative flex-1 bg-slate-100 overflow-auto flex items-center justify-center p-4">
              {isPdf(previewDoc.file) ? (
                <iframe
                  src={getFileUrl(previewDoc.file)}
                  title={previewDoc.title}
                  className="h-full w-full rounded-xl border border-slate-200 bg-white shadow-sm"
                />
              ) : (
                <img
                  src={getFileUrl(previewDoc.file)}
                  alt={previewDoc.title}
                  className="max-h-full max-w-full rounded-xl object-contain shadow-md"
                />
              )}
            </div>

            {/* Modal Footer / Review Actions */}
            <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500">
                  Current Status:{" "}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${
                    previewDoc.status === "VERIFIED"
                      ? "bg-emerald-100 text-emerald-800"
                      : previewDoc.status === "REJECTED"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {previewDoc.status}
                </span>

                {previewDoc.status === "REJECTED" && previewDoc.rejection_reason && (
                  <p className="mt-1 text-xs text-rose-600">
                    Reason: {previewDoc.rejection_reason}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {previewDoc.status === "PENDING" && (
                  <>
                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => openRejectModal(previewDoc)}
                      className="flex items-center gap-1.5 rounded-xl border border-rose-200 px-4 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
                    >
                      <XCircle size={15} />
                      <span>Reject Document</span>
                    </button>

                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleVerify(previewDoc.id)}
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {actionLoading ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={15} />
                      )}
                      <span>Approve & Verify</span>
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          REJECTION FEEDBACK MODAL
      ====================================================== */}
      {rejectingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <XCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Reject Document
                  </h3>
                  <p className="text-xs text-slate-500">
                    {rejectingDoc.title} • {rejectingDoc.student_name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRejectingDoc(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-slate-600">
                Quick-select common reasons:
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {quickRejectionReasons.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setRejectionReason(reason)}
                    className={`rounded-lg border px-2.5 py-1 text-xs transition ${
                      rejectionReason === reason
                        ? "border-rose-400 bg-rose-50 font-semibold text-rose-700"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-700">
                  Rejection explanation for the student: <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Specify exactly what needs correction so the student can re-upload..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => setRejectingDoc(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={actionLoading || !rejectionReason.trim()}
                onClick={handleConfirmReject}
                className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 disabled:opacity-50"
              >
                {actionLoading && <Loader2 size={14} className="animate-spin" />}
                <span>Confirm Rejection</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          VIEW REJECTION REASON INFO MODAL
      ====================================================== */}
      {reasonModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertCircle size={20} />
                <h4 className="text-sm font-bold">Rejection Feedback</h4>
              </div>
              <button
                type="button"
                onClick={() => setReasonModalDoc(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50/60 p-3.5">
              <p className="text-xs font-medium text-slate-500">Document:</p>
              <p className="text-sm font-bold text-slate-800">
                {reasonModalDoc.title}
              </p>

              <p className="mt-3 text-xs font-medium text-slate-500">
                Feedback sent to student:
              </p>
              <p className="mt-1 text-sm font-medium text-rose-900">
                "{reasonModalDoc.rejection_reason || "No explicit reason specified."}"
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setReasonModalDoc(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
