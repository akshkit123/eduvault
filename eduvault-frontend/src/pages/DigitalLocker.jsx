import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Upload,
  Search,
  FileText,
  Eye,
  Download,
  MoreVertical,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  X,
  Link2,
  ClipboardCheck,
  Settings,
  ArrowRight,
  QrCode,
  Share2,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import UploadDocumentModal from "../components/digital-locker/UploadDocumentModal";
import ShareVerificationModal from "../components/documents/ShareVerificationModal";

import {
  getDocuments,
  uploadDocument,
  deleteDocument,
} from "../api/documentApi";

import { API_BASE_URL } from "../api/apiClient";

// =====================================================
// MAIN DIGITAL LOCKER
// =====================================================

function DigitalLocker() {
  // =====================================================
  // UPLOAD & SHARE MODALS
  // =====================================================

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [shareDocument, setShareDocument] = useState(null);

  // =====================================================
  // DOCUMENT STATE
  // =====================================================

  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // FILTER STATE
  // =====================================================

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  const [selectedStatus, setSelectedStatus] =
    useState("ALL");

  // =====================================================
  // LOAD DOCUMENTS
  // =====================================================

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDocuments();

      const documentList = Array.isArray(data)
        ? data
        : data?.results || [];

      setDocuments(documentList);
    } catch (error) {
      console.error(
        "Failed to load documents:",
        error
      );

      setError(
        error.message ||
          "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {
    loadDocuments();
  }, []);

  // =====================================================
  // CATEGORY LABEL
  // =====================================================

  const getCategoryLabel = (category) => {
    const categories = {
      CERTIFICATE: "Certificate",
      MARKSHEET: "Marksheet",
      INTERNSHIP: "Internship",
      PROJECT: "Project",
      ACHIEVEMENT: "Achievement",
      OTHER: "Other",
    };

    return (
      categories[category] ||
      category ||
      "Other"
    );
  };

  // =====================================================
  // FILE URL
  // =====================================================

  const getFileUrl = (file) => {
    if (!file) {
      return "";
    }

    if (
      file.startsWith("http://") ||
      file.startsWith("https://")
    ) {
      return file;
    }

    const cleanPath = file.startsWith("/") ? file : `/${file}`;
    return `${API_BASE_URL}${cleanPath}`;
  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return `Uploaded ${parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    )}`;
  };

  // =====================================================
  // FORMAT FILE SIZE
  // =====================================================

  const formatFileSize = (bytes) => {
    if (!bytes || bytes <= 0) {
      return "Document";
    }

    const sizeInMB =
      bytes / (1024 * 1024);

    if (sizeInMB >= 1) {
      return `${sizeInMB.toFixed(2)} MB`;
    }

    return `${Math.round(
      bytes / 1024
    )} KB`;
  };

  // =====================================================
  // ICON COLOR
  // =====================================================

  const getIconType = (category) => {
    const colors = {
      CERTIFICATE: "red",
      MARKSHEET: "purple",
      INTERNSHIP: "blue",
      PROJECT: "green",
      ACHIEVEMENT: "blue",
      OTHER: "purple",
    };

    return colors[category] || "blue";
  };

  // =====================================================
  // UPLOAD DOCUMENT
  // =====================================================

  const handleDocumentUpload = async ({
    file,
    category,
    title,
  }) => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // If modal does not send title,
      // use file name without extension.
      const documentTitle =
        title ||
        file.name.replace(
          /\.[^/.]+$/,
          ""
        );

      // Convert frontend category
      // into backend category.
      const categoryMap = {
        Certificate: "CERTIFICATE",
        Certificates: "CERTIFICATE",

        Marksheet: "MARKSHEET",
        Marksheets: "MARKSHEET",

        Internship: "INTERNSHIP",
        Internships: "INTERNSHIP",

        Project: "PROJECT",
        Projects: "PROJECT",

        Achievement: "ACHIEVEMENT",
        Achievements: "ACHIEVEMENT",

        Other: "OTHER",
      };

      const backendCategory =
        categoryMap[category] ||
        category ||
        "OTHER";

      const newDocument =
        await uploadDocument({
          title: documentTitle,
          category: backendCategory,
          file,
        });

      // Add new document to beginning
      setDocuments(
        (previousDocuments) => [
          newDocument,
          ...previousDocuments,
        ]
      );

      // Close modal
      setIsUploadOpen(false);
    } catch (error) {
      console.error(
        "Upload failed:",
        error
      );

      setError(
        error.message ||
          "Failed to upload document."
      );
    } finally {
      setUploading(false);
    }
  };

  // =====================================================
  // DELETE DOCUMENT
  // =====================================================

  const handleDeleteDocument = async (
    documentId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteDocument(documentId);

      setDocuments(
        (previousDocuments) =>
          previousDocuments.filter(
            (document) =>
              document.id !== documentId
          )
      );
    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );

      setError(
        error.message ||
          "Failed to delete document."
      );
    }
  };

  // =====================================================
  // FILTER DOCUMENTS
  // =====================================================

  const filteredDocuments = useMemo(() => {
    return documents.filter(
      (document) => {
        const title =
          document.title || "";

        const matchesSearch =
          title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesCategory =
          selectedCategory === "ALL" ||
          document.category ===
            selectedCategory;

        const matchesStatus =
          selectedStatus === "ALL" ||
          document.status ===
            selectedStatus;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        );
      }
    );
  }, [
    documents,
    searchTerm,
    selectedCategory,
    selectedStatus,
  ]);

  // =====================================================
  // COUNTS
  // =====================================================

  const verifiedCount =
    documents.filter(
      (document) =>
        document.status === "VERIFIED"
    ).length;

  const pendingCount =
    documents.filter(
      (document) =>
        document.status === "PENDING"
    ).length;

  const rejectedCount =
    documents.filter(
      (document) =>
        document.status === "REJECTED"
    ).length;

  return (
    <div className="min-h-screen bg-[#f8f7ff]">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="ml-0 lg:ml-[280px]">
        <Topbar />

        <main className="p-4 sm:p-5 lg:p-7">
          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                <ShieldCheck size={14} />

                Secure Storage
              </div>

              <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                Digital Locker
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Securely store, verify, and
                manage your academic and
                professional documents.
              </p>
            </div>

            {/* =================================================
                HEADER STATS
            ================================================= */}

            <div className="flex flex-wrap items-center gap-3">
              {/* Document Count */}

              <div className="rounded-xl border border-[#ebe9f8] bg-white px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Documents
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {documents.length}

                  <span className="ml-1 text-xs font-medium text-slate-400">
                    Docs
                  </span>
                </p>
              </div>

              {/* Verified */}

              <div className="rounded-xl border border-[#ebe9f8] bg-white px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Verified
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {verifiedCount}

                  <span className="ml-1 text-xs font-medium text-slate-400">
                    Docs
                  </span>
                </p>
              </div>

              {/* Pending */}

              <div className="rounded-xl border border-[#ebe9f8] bg-white px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Pending
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {pendingCount}

                  <span className="ml-1 text-xs font-medium text-slate-400">
                    Docs
                  </span>
                </p>
              </div>

              {/* Upload */}

              <button
                type="button"
                onClick={() =>
                  setIsUploadOpen(true)
                }
                disabled={uploading}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  shadow-indigo-200
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-indigo-700
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <Upload size={17} />

                Upload Document
              </button>
            </div>
          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div className="mt-5 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  setError("")
                }
                className="text-red-400 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <section>
              {/* Search + Filters */}

              <div className="rounded-2xl border border-[#ebe9f8] bg-white p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  {/* Search */}

                  <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#f5f4fc] px-4 py-2.5">
                    <Search
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
                        )
                      }
                      className="
                        w-full
                        bg-transparent
                        text-sm
                        text-slate-700
                        outline-none
                        placeholder:text-slate-400
                      "
                    />
                  </div>

                  {/* Status */}

                  <select
                    value={selectedStatus}
                    onChange={(event) =>
                      setSelectedStatus(
                        event.target.value
                      )
                    }
                    className="
                      rounded-xl
                      border
                      border-[#ebe9f8]
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-slate-600
                      outline-none
                    "
                  >
                    <option value="ALL">
                      All Statuses
                    </option>

                    <option value="PENDING">
                      Pending
                    </option>

                    <option value="VERIFIED">
                      Verified
                    </option>

                    <option value="REJECTED">
                      Rejected
                    </option>
                  </select>
                </div>

                {/* Categories */}

                <div className="mt-4 flex flex-wrap gap-2">
                  <FilterButton
                    active={
                      selectedCategory ===
                      "ALL"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        "ALL"
                      )
                    }
                  >
                    All Documents
                  </FilterButton>

                  <FilterButton
                    active={
                      selectedCategory ===
                      "CERTIFICATE"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        "CERTIFICATE"
                      )
                    }
                  >
                    Certificates
                  </FilterButton>

                  <FilterButton
                    active={
                      selectedCategory ===
                      "MARKSHEET"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        "MARKSHEET"
                      )
                    }
                  >
                    Marksheets
                  </FilterButton>

                  <FilterButton
                    active={
                      selectedCategory ===
                      "INTERNSHIP"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        "INTERNSHIP"
                      )
                    }
                  >
                    Internships
                  </FilterButton>

                  <FilterButton
                    active={
                      selectedCategory ===
                      "PROJECT"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        "PROJECT"
                      )
                    }
                  >
                    Projects
                  </FilterButton>

                  <FilterButton
                    active={
                      selectedCategory ===
                      "ACHIEVEMENT"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        "ACHIEVEMENT"
                      )
                    }
                  >
                    Achievements
                  </FilterButton>

                  <FilterButton
                    active={
                      selectedCategory ===
                      "OTHER"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        "OTHER"
                      )
                    }
                  >
                    Other
                  </FilterButton>
                </div>
              </div>

              {/* =================================================
                  DOCUMENT HEADER
              ================================================= */}

              <div className="mt-7 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Recent Documents
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your recently uploaded
                    credentials
                  </p>
                </div>

                <span className="text-sm font-semibold text-indigo-600">
                  {filteredDocuments.length}{" "}
                  documents
                </span>
              </div>

              {/* =================================================
                  DOCUMENT CARDS
              ================================================= */}

              {loading ? (
                <div className="mt-5 rounded-2xl border border-[#ebe9f8] bg-white py-14 text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

                  <p className="mt-4 text-sm text-slate-500">
                    Loading documents...
                  </p>
                </div>
              ) : filteredDocuments.length ===
                0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-white py-14 text-center">
                  <FileText
                    size={35}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-4 text-sm font-semibold text-slate-600">
                    No documents found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Upload a document to
                    see it here.
                  </p>
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {filteredDocuments.map(
                    (document) => (
                      <DocumentCard
                        key={document.id}
                        id={document.id}
                        document={document}
                        title={
                          document.title
                        }
                        organization={
                          document.student_name ||
                          "Uploaded Document"
                        }
                        type={getCategoryLabel(
                          document.category
                        )}
                        size={
                          document.size ||
                          "Document"
                        }
                        date={formatDate(
                          document.created_at
                        )}
                        status={
                          document.status
                        }
                        statusType={
                          document.status?.toLowerCase()
                        }
                        iconType={getIconType(
                          document.category
                        )}
                        fileUrl={getFileUrl(
                          document.file
                        )}
                        rejectionReason={
                          document.rejection_reason
                        }
                        onDelete={
                          handleDeleteDocument
                        }
                        onShare={
                          setShareDocument
                        }
                      />
                    )
                  )}
                </div>
              )}

              {/* =================================================
                  UPLOAD CARD
              ================================================= */}

              <button
                type="button"
                onClick={() =>
                  setIsUploadOpen(true)
                }
                className="
                  mt-5
                  flex
                  w-full
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-dashed
                  border-indigo-200
                  bg-indigo-50/40
                  px-6
                  py-8
                  text-center
                  transition-all
                  duration-300
                  hover:border-indigo-400
                  hover:bg-indigo-50
                "
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Upload size={20} />
                </div>

                <h3 className="mt-3 text-sm font-bold text-slate-800">
                  Upload New Document
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Click to browse your files
                </p>
              </button>
            </section>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="space-y-5">
              {/* Quick Actions */}

              <div className="rounded-2xl border border-[#ebe9f8] bg-white p-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Quick Actions
                </h2>

                <div className="mt-4 space-y-2">
                  <QuickAction
                    icon={
                      <Link2 size={16} />
                    }
                    title="Share Vault Link"
                    subtitle="Create secure access"
                  />

                  <QuickAction
                    icon={
                      <ClipboardCheck
                        size={16}
                      />
                    }
                    title="Request Verification"
                    subtitle="Send to institution"
                  />

                  <QuickAction
                    icon={
                      <Settings size={16} />
                    }
                    title="Security Settings"
                    subtitle="Manage permissions"
                  />
                </div>
              </div>

              {/* Storage */}

              <div className="rounded-2xl border border-[#ebe9f8] bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">
                    Storage
                  </h2>

                  <span className="text-xs font-semibold text-indigo-600">
                    24%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[24%] rounded-full bg-indigo-600" />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  1.2 GB of 5 GB used
                </p>
              </div>

              {/* Security */}

              <div
                className="
                  rounded-2xl
                  bg-gradient-to-br
                  from-indigo-600
                  to-purple-600
                  p-5
                  text-white
                  shadow-lg
                  shadow-indigo-100
                "
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <ShieldCheck size={20} />
                </div>

                <h2 className="mt-4 text-lg font-bold">
                  Your documents are secure
                </h2>

                <p className="mt-2 text-xs leading-5 text-indigo-100">
                  Your documents are
                  protected with secure
                  storage and verification
                  controls.
                </p>

                <button
                  type="button"
                  className="
                    mt-4
                    text-xs
                    font-semibold
                    text-white
                    underline
                    underline-offset-4
                  "
                >
                  Security Details
                </button>
              </div>
            </aside>
          </div>

          {/* =================================================
              UPLOAD MODAL
          ================================================= */}

          <UploadDocumentModal
            isOpen={isUploadOpen}
            onClose={() =>
              setIsUploadOpen(false)
            }
            onUpload={
              handleDocumentUpload
            }
          />

          {shareDocument && (
            <ShareVerificationModal
              document={shareDocument}
              onClose={() => setShareDocument(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// =========================================================
// FILTER BUTTON
// =========================================================

function FilterButton({
  children,
  active = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-lg
        px-3
        py-2
        text-xs
        font-semibold
        transition-all
        duration-200
        ${
          active
            ? "bg-indigo-100 text-indigo-700"
            : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
        }
      `}
    >
      {children}
    </button>
  );
}

// =========================================================
// DOCUMENT CARD
// =========================================================

function DocumentCard({
  id,
  document,
  title,
  organization,
  type,
  size,
  date,
  status,
  statusType,
  iconType,
  fileUrl,
  rejectionReason,
  onDelete,
  onShare,
}) {
  const iconColors = {
    red: "bg-red-50 text-red-500",
    purple:
      "bg-purple-50 text-purple-600",
    blue: "bg-blue-50 text-blue-600",
    green:
      "bg-green-50 text-green-600",
  };

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-[#ebe9f8]
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        hover:shadow-indigo-100
      "
    >
      {/* =================================================
          TOP
      ================================================= */}

      <div className="flex items-start justify-between gap-3">
        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${
              iconColors[iconType] ||
              iconColors.blue
            }
          `}
        >
          <FileText size={21} />
        </div>

        <StatusBadge
          status={status}
          type={statusType}
        />
      </div>

      {/* =================================================
          DETAILS
      ================================================= */}

      <div className="mt-5">
        <h3 className="truncate text-sm font-bold text-slate-800">
          {title}
        </h3>

        <p className="mt-1 truncate text-xs text-slate-500">
          {organization}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
            {type}
          </span>

          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
            {size}
          </span>
        </div>

        {/* Rejection reason */}

        {status === "REJECTED" &&
          rejectionReason && (
            <div className="mt-3 rounded-lg bg-red-50 px-3 py-2">
              <p className="text-[10px] font-bold text-red-600">
                Rejection Reason
              </p>

              <p className="mt-1 text-[10px] leading-4 text-red-500">
                {rejectionReason}
              </p>
            </div>
          )}
      </div>

      {/* =================================================
          BOTTOM
      ================================================= */}

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-[10px] text-slate-400">
          {date}
        </span>

        <div className="flex items-center gap-1.5">
          {/* Verify / Share QR */}
          {status === "VERIFIED" && onShare && (
            <button
              type="button"
              onClick={() =>
                onShare(
                  document || {
                    id,
                    title,
                    status,
                    file: fileUrl,
                    verification_id: id,
                  }
                )
              }
              className="
                flex
                items-center
                gap-1
                rounded-lg
                bg-indigo-50
                px-2.5
                py-1.5
                text-xs
                font-semibold
                text-indigo-600
                transition
                hover:bg-indigo-100
                hover:text-indigo-700
              "
              title="Verify & QR Code Key"
            >
              <QrCode size={13} />
              <span>Verify / QR</span>
            </button>
          )}

          {/* Preview */}

          <button
            type="button"
            onClick={() => {
              if (fileUrl) {
                window.open(
                  fileUrl,
                  "_blank",
                  "noopener,noreferrer"
                );
              }
            }}
            disabled={!fileUrl}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-indigo-50
              hover:text-indigo-600
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
            title="Preview"
          >
            <Eye size={15} />
          </button>

          {/* Download */}

          <a
            href={fileUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-indigo-50
              hover:text-indigo-600
            "
            title="Download"
          >
            <Download size={15} />
          </a>

          {/* Delete */}

          {status === "PENDING" && (
            <button
              type="button"
              onClick={() =>
                onDelete(id)
              }
              className="
                rounded-lg
                p-2
                text-slate-400
                transition
                hover:bg-red-50
                hover:text-red-600
              "
              title="Delete"
            >
              <MoreVertical
                size={15}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================
// STATUS BADGE
// =========================================================

function StatusBadge({
  status,
  type,
}) {
  const styles = {
    verified:
      "bg-green-50 text-green-700",

    pending:
      "bg-amber-50 text-amber-700",

    rejected:
      "bg-red-50 text-red-700",
  };

  const normalizedType =
    type?.toLowerCase();

  return (
    <span
      className={`
        flex
        shrink-0
        items-center
        gap-1
        rounded-md
        px-2
        py-1
        text-[10px]
        font-bold
        ${
          styles[normalizedType] ||
          styles.pending
        }
      `}
    >
      {normalizedType ===
      "verified" ? (
        <CheckCircle2 size={11} />
      ) : normalizedType ===
        "rejected" ? (
        <X size={11} />
      ) : (
        <Clock3 size={11} />
      )}

      {status}
    </span>
  );
}

// =========================================================
// QUICK ACTION
// =========================================================

function QuickAction({
  icon,
  title,
  subtitle,
}) {
  return (
    <button
      type="button"
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        p-3
        text-left
        transition-all
        duration-200
        hover:bg-indigo-50
      "
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-700">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400">
          {subtitle}
        </p>
      </div>

      <ArrowRight
        size={14}
        className="shrink-0 text-slate-300"
      />
    </button>
  );
}

export default DigitalLocker;