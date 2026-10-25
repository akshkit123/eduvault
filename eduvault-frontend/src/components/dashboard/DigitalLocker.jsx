import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Upload,
  FileText,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { getDocuments } from "../../api/documentApi";

function DigitalLocker() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD DOCUMENTS
  // =====================================================

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDocuments();

      const list = Array.isArray(data)
        ? data
        : data?.results || [];

      setDocuments(list);
    } catch (err) {
      console.error(
        "Failed to load dashboard documents:",
        err
      );

      setError(
        err.message ||
          "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // =====================================================
  // STATUS
  // =====================================================

  const getStatusUI = (status) => {
    if (status === "VERIFIED") {
      return {
        label: "Verified",
        icon: <CheckCircle2 size={12} />,
        className:
          "bg-green-50 text-green-700",
      };
    }

    if (status === "REJECTED") {
      return {
        label: "Rejected",
        icon: <AlertCircle size={12} />,
        className:
          "bg-red-50 text-red-700",
      };
    }

    return {
      label: "Pending",
      icon: <Clock3 size={12} />,
      className:
        "bg-amber-50 text-amber-700",
    };
  };

  // =====================================================
  // CATEGORY STYLE
  // =====================================================

  const getDocumentStyle = (category) => {
    switch (category) {
      case "MARKSHEET":
        return {
          bg: "bg-purple-50",
          text: "text-purple-600",
        };

      case "INTERNSHIP":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
        };

      case "PROJECT":
        return {
          bg: "bg-indigo-50",
          text: "text-indigo-600",
        };

      case "ACHIEVEMENT":
        return {
          bg: "bg-amber-50",
          text: "text-amber-600",
        };

      default:
        return {
          bg: "bg-red-50",
          text: "text-red-500",
        };
    }
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Recently";
    }

    const uploadedDate = new Date(date);

    if (
      Number.isNaN(
        uploadedDate.getTime()
      )
    ) {
      return "Recently";
    }

    const now = new Date();

    const difference =
      now.getTime() -
      uploadedDate.getTime();

    const days = Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      return "Uploaded today";
    }

    if (days === 1) {
      return "Uploaded 1 day ago";
    }

    if (days < 7) {
      return `Uploaded ${days} days ago`;
    }

    return `Uploaded ${uploadedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    )}`;
  };

  const displayedDocuments =
    documents.slice(0, 2);

  return (
    <div
      className="
        group
        rounded-2xl
        border border-[#EEECFA]
        bg-white
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-indigo-100
        sm:p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Digital Locker
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate("/digital-locker")
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-indigo-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-md
            shadow-indigo-200
            transition
            hover:bg-indigo-700
            sm:w-auto
          "
        >
          <Upload size={15} />
          Upload
        </button>
      </div>

      {/* DOCUMENTS */}

      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2
              size={22}
              className="animate-spin text-indigo-600"
            />
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl bg-red-50 px-4 py-4 text-center">
            <p className="text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={loadDocuments}
              className="mt-2 text-xs font-semibold text-red-700 underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          documents.length === 0 && (
            <div className="rounded-xl bg-slate-50 px-4 py-8 text-center">
              <FileText
                size={30}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-semibold text-slate-700">
                No documents uploaded
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Upload your first document.
              </p>

              <button
                onClick={() =>
                  navigate("/digital-locker")
                }
                className="
                  mt-4
                  rounded-lg
                  bg-indigo-600
                  px-4 py-2
                  text-xs
                  font-semibold
                  text-white
                "
              >
                Upload Document
              </button>
            </div>
          )}

        {!loading &&
          !error &&
          displayedDocuments.map((document) => {
            const style =
              getDocumentStyle(
                document.category
              );

            const status =
              getStatusUI(
                document.status
              );

            return (
              <div
                key={document.id}
                className="
                  flex
                  flex-col
                  gap-3
                  rounded-xl
                  p-2
                  transition
                  hover:bg-indigo-50
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                {/* DOCUMENT */}

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                    sm:gap-4
                  "
                >
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${style.bg}
                      ${style.text}
                      sm:h-11
                      sm:w-11
                    `}
                  >
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <p
                      title={document.title}
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-slate-800
                      "
                    >
                      {document.title}
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        text-[11px]
                        text-slate-500
                        sm:text-xs
                      "
                    >
                      {formatDate(
                        document.created_at
                      )}

                      {" • "}

                      {document.category ||
                        "Document"}
                    </p>
                  </div>
                </div>

                {/* STATUS */}

                <div
                  className={`
                    ml-[52px]
                    flex
                    w-fit
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-md
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    sm:ml-0
                    ${status.className}
                  `}
                >
                  {status.icon}
                  {status.label}
                </div>
              </div>
            );
          })}
      </div>

      {/* VIEW ALL */}

      <div className="mt-5 text-center sm:mt-6">
        <button
          type="button"
          onClick={() =>
            navigate("/digital-locker")
          }
          className="
            text-sm
            font-medium
            text-indigo-600
            hover:text-indigo-800
            hover:underline
          "
        >
          View all {documents.length}{" "}
          {documents.length === 1
            ? "document"
            : "documents"}
        </button>
      </div>
    </div>
  );
}

export default DigitalLocker;