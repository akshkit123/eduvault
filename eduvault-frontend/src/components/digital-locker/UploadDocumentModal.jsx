import { useRef, useState } from "react";

import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
} from "lucide-react";

function UploadDocumentModal({
  isOpen,
  onClose,
  onUpload,
  uploading = false,
  uploadError = "",
}) {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [title, setTitle] = useState("");

  const [category, setCategory] =
    useState("CERTIFICATE");

  if (!isOpen) {
    return null;
  }

  // =====================================================
  // FILE VALIDATION
  // =====================================================

  const validateFile = (file) => {
    if (!file) {
      return false;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only PDF, JPG, JPEG and PNG files are allowed."
      );

      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MB.");

      return false;
    }

    return true;
  };

  // =====================================================
  // FILE SELECT
  // =====================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!validateFile(file)) {
      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    // Automatically create title from filename
    if (!title.trim()) {
      const fileName = file.name.replace(
        /\.[^/.]+$/,
        ""
      );

      setTitle(fileName);
    }
  };

  // =====================================================
  // DRAG & DROP
  // =====================================================

  const handleDrop = (event) => {
    event.preventDefault();

    if (uploading) {
      return;
    }

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);

    if (!title.trim()) {
      const fileName = file.name.replace(
        /\.[^/.]+$/,
        ""
      );

      setTitle(fileName);
    }
  };

  // =====================================================
  // UPLOAD
  // =====================================================

  const handleUpload = async () => {
    if (!title.trim()) {
      alert("Please enter a document title.");
      return;
    }

    if (!selectedFile) {
      alert("Please select a document first.");
      return;
    }

    if (onUpload) {
      await onUpload({
        title: title.trim(),
        category,
        file: selectedFile,
      });
    }
  };

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    if (uploading) {
      return;
    }

    setSelectedFile(null);
    setTitle("");
    setCategory("CERTIFICATE");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose();
  };

  // =====================================================
  // RESET AFTER SUCCESS
  // =====================================================

  const handleSuccessfulClose = () => {
    setSelectedFile(null);
    setTitle("");
    setCategory("CERTIFICATE");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-slate-900/50
        p-3 sm:p-4
        backdrop-blur-sm
      "
      onClick={handleClose}
    >
      <div
        className="
          max-h-[92vh]
          w-full
          max-w-lg
          overflow-y-auto
          rounded-2xl
          bg-white
          p-4
          shadow-2xl
          sm:p-6
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Upload Document
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Add a document to your digital locker.
            </p>
          </div>

          <button
            type="button"
            disabled={uploading}
            onClick={handleClose}
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* TITLE */}

        <div className="mt-5">
          <label className="text-xs font-semibold text-slate-700">
            Document Title
          </label>

          <input
            type="text"
            value={title}
            disabled={uploading}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Example: Python Certificate"
            className="
              mt-2
              w-full
              rounded-xl
              border border-slate-200
              bg-white
              px-4 py-3
              text-sm text-slate-700
              outline-none
              transition
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-100
            "
          />
        </div>

        {/* FILE INPUT */}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* UPLOAD AREA */}

        <div className="mt-5">
          {!selectedFile ? (
            <button
              type="button"
              disabled={uploading}
              onClick={() =>
                fileInputRef.current?.click()
              }
              onDragOver={(event) =>
                event.preventDefault()
              }
              onDrop={handleDrop}
              className="
                flex
                min-h-[190px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                border-indigo-200
                bg-indigo-50/40
                px-4 py-8
                text-center
                transition-all
                hover:border-indigo-400
                hover:bg-indigo-50
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:min-h-[210px]
              "
            >
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-indigo-100
                  text-indigo-600
                "
              >
                <Upload size={22} />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800">
                Choose a document
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Drag & drop or click to browse
              </p>

              <p className="mt-3 text-[10px] text-slate-400">
                PDF, JPG, JPEG, PNG • Max 10 MB
              </p>
            </button>
          ) : (
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border border-green-100
                bg-green-50
                p-3 sm:p-4
              "
            >
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-white
                  text-green-600
                  shadow-sm
                "
              >
                <FileText size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {(
                    selectedFile.size /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </p>
              </div>

              <CheckCircle2
                size={20}
                className="shrink-0 text-green-600"
              />
            </div>
          )}
        </div>

        {/* CATEGORY */}

        <div className="mt-5">
          <label className="text-xs font-semibold text-slate-700">
            Document Category
          </label>

          <select
            value={category}
            disabled={uploading}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="
              mt-2
              w-full
              rounded-xl
              border border-slate-200
              bg-white
              px-4 py-3
              text-sm text-slate-700
              outline-none
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-100
            "
          >
            <option value="CERTIFICATE">
              Certificate
            </option>

            <option value="MARKSHEET">
              Marksheet
            </option>

            <option value="INTERNSHIP">
              Internship
            </option>

            <option value="PROJECT">
              Project
            </option>

            <option value="ACHIEVEMENT">
              Achievement
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>
        </div>

        {/* ERROR */}

        {uploadError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-xs leading-5 text-red-600">
              {uploadError}
            </p>
          </div>
        )}

        {/* BUTTONS */}

        <div
          className="
            mt-6
            flex
            flex-col-reverse
            gap-3
            sm:flex-row
            sm:justify-end
          "
        >
          <button
            type="button"
            disabled={uploading}
            onClick={handleClose}
            className="
              w-full
              rounded-xl
              border border-slate-200
              px-5 py-2.5
              text-sm font-semibold
              text-slate-600
              hover:bg-slate-50
              disabled:opacity-50
              sm:w-auto
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={
              uploading ||
              !selectedFile ||
              !title.trim()
            }
            onClick={handleUpload}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-5 py-2.5
              text-sm
              font-semibold
              text-white
              shadow-md
              shadow-indigo-200
              transition
              hover:bg-indigo-700
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
            "
          >
            {uploading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload Document
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadDocumentModal;