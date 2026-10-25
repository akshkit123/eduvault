import { useEffect, useRef, useState } from "react";
import {
  Award,
  Upload,
  FileText,
  ShieldCheck,
  KeyRound,
  QrCode,
  Download,
  Link2,
  CheckCircle2,
  Clock3,
  ChevronRight,
  CalendarDays,
  HardDrive,
  X,
  AlertCircle,
  Loader2,
  ExternalLink,
  Share2,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ShareVerificationModal from "../components/documents/ShareVerificationModal";

import {
  getDocuments,
  uploadDocument,
} from "../api/documentApi";
import { getShareableUrl } from "../utils/qrHelper";
import { getMediaUrl } from "../api/apiClient";



function Certificates() {

  const fileInputRef = useRef(null);


  // =====================================================
  // STATE
  // =====================================================

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [certificates, setCertificates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [uploadError, setUploadError] =
    useState("");

  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const [showShareModal, setShowShareModal] =
    useState(false);


  const [formData, setFormData] = useState({
    title: "",
    type: "Professional Certificate",
    issueDate: "",
    organization: "",
    description: "",
  });


  // =====================================================
  // LOAD CERTIFICATES
  // =====================================================

  const loadCertificates = async () => {

    try {

      setLoading(true);
      setError("");

      const documents =
        await getDocuments();

      console.log(
        "All documents:",
        documents
      );


      // Only CERTIFICATE documents
      const certificateDocuments =
        Array.isArray(documents)
          ? documents.filter(
              (document) =>
                document.category ===
                "CERTIFICATE"
            )
          : [];


      console.log(
        "Certificate documents:",
        certificateDocuments
      );


      setCertificates(
        certificateDocuments
      );


      // Select latest certificate
      if (
        certificateDocuments.length > 0
      ) {

        setSelectedCertificate(
          certificateDocuments[0]
        );

      } else {

        setSelectedCertificate(null);

      }

    } catch (err) {

      console.error(
        "Failed to load certificates:",
        err
      );

      setError(
        err.message ||
        "Failed to load certificates."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOAD WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {

    loadCertificates();

  }, []);


  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };


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


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      setUploadError(
        "Only PDF, JPG, JPEG and PNG files are allowed."
      );

      return false;
    }


    // 10 MB maximum
    if (
      file.size >
      10 * 1024 * 1024
    ) {

      setUploadError(
        "File size must be less than 10 MB."
      );

      return false;
    }


    setUploadError("");

    return true;
  };


  // =====================================================
  // FILE SELECT
  // =====================================================

  const handleFileSelect = (
    event
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }


    if (!validateFile(file)) {

      event.target.value = "";

      setSelectedFile(null);

      return;
    }


    setSelectedFile(file);


    // Automatically use filename as title
    if (!formData.title.trim()) {

      const fileName =
        file.name.replace(
          /\.[^/.]+$/,
          ""
        );

      setFormData(
        (previous) => ({
          ...previous,
          title: fileName,
        })
      );
    }
  };


  // =====================================================
  // DRAG & DROP
  // =====================================================

  const handleDrop = (
    event
  ) => {

    event.preventDefault();

    const file =
      event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }


    if (!validateFile(file)) {
      return;
    }


    setSelectedFile(file);


    if (!formData.title.trim()) {

      const fileName =
        file.name.replace(
          /\.[^/.]+$/,
          ""
        );

      setFormData(
        (previous) => ({
          ...previous,
          title: fileName,
        })
      );
    }
  };


  // =====================================================
  // SAVE / UPLOAD CERTIFICATE
  // =====================================================

  const handleSaveRecord = async () => {

    setUploadError("");


    if (!selectedFile) {

      setUploadError(
        "Please upload a certificate first."
      );

      return;
    }


    if (!formData.title.trim()) {

      setUploadError(
        "Please enter a certificate title."
      );

      return;
    }


    try {

      setUploading(true);


      console.log(
        "Uploading certificate:",
        {
          title: formData.title,
          category: "CERTIFICATE",
          file: selectedFile.name,
        }
      );


      await uploadDocument({
        title: formData.title.trim(),
        category: "CERTIFICATE",
        file: selectedFile,
      });


      // Reset form
      setFormData({
        title: "",
        type: "Professional Certificate",
        issueDate: "",
        organization: "",
        description: "",
      });


      setSelectedFile(null);


      if (fileInputRef.current) {

        fileInputRef.current.value =
          "";

      }


      // Reload from backend
      await loadCertificates();


      alert(
        "Certificate uploaded successfully. It is now pending Committee verification."
      );


    } catch (err) {

      console.error(
        "Certificate upload failed:",
        err
      );


      setUploadError(
        err.message ||
        "Failed to upload certificate."
      );

    } finally {

      setUploading(false);

    }
  };


  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {

    if (uploading) {
      return;
    }


    setFormData({
      title: "",
      type: "Professional Certificate",
      issueDate: "",
      organization: "",
      description: "",
    });


    setSelectedFile(null);

    setUploadError("");


    if (fileInputRef.current) {

      fileInputRef.current.value =
        "";

    }
  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "Recently";
    }


    const parsed =
      new Date(date);


    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {

      return "Recently";

    }


    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };


  // =====================================================
  // FORMAT STATUS
  // =====================================================

  const getStatus = (
    status
  ) => {

    switch (status) {

      case "VERIFIED":

        return {
          label: "Verified",
          icon: (
            <CheckCircle2
              size={11}
            />
          ),
          className:
            "bg-green-100 text-green-700",
        };


      case "REJECTED":

        return {
          label: "Rejected",
          icon: (
            <AlertCircle
              size={11}
            />
          ),
          className:
            "bg-red-100 text-red-700",
        };


      default:

        return {
          label: "Pending",
          icon: (
            <Clock3
              size={11}
            />
          ),
          className:
            "bg-amber-100 text-amber-700",
        };
    }
  };


  // =====================================================
  // DOWNLOAD / OPEN FILE
  // =====================================================

  const openDocument = (
    document
  ) => {

    if (!document?.file) {
      return;
    }

    const fullUrl = getMediaUrl(document.file);

    window.open(
      fullUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };



  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div
      className="
        min-h-screen
        bg-[#f8f7ff]
        text-[#15182b]
      "
    >

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar />


      {/* =================================================
          MAIN AREA
      ================================================= */}

      <div className="lg:ml-[280px]">

        <Topbar />


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main
          className="
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >

          <div
            className="
              mx-auto
              max-w-[1250px]
            "
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mb-7">

              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-[#11152a]
                  sm:text-4xl
                "
              >
                Certificate Vault
              </h1>


              <p
                className="
                  mt-2
                  max-w-[650px]
                  text-sm
                  leading-6
                  text-[#626477]
                "
              >
                Securely upload and manage
                your academic and professional
                certificates.
              </p>

            </div>


            {/* =================================================
                MAIN GRID
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-[minmax(0,1fr)_320px]
              "
            >

              {/* =================================================
                  LEFT COLUMN
              ================================================= */}

              <div className="space-y-6">


                {/* =================================================
                    UPLOAD AREA
                ================================================= */}

                <section
                  onDragOver={(event) =>
                    event.preventDefault()
                  }
                  onDrop={handleDrop}
                  className="
                    rounded-2xl
                    border-2
                    border-dashed
                    border-indigo-200
                    bg-white
                    px-5
                    py-10
                    text-center
                    shadow-[0_5px_25px_rgba(50,40,150,0.04)]
                    transition
                    hover:border-indigo-400
                    hover:bg-indigo-50/20
                  "
                >

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={
                      handleFileSelect
                    }
                  />


                  {!selectedFile ? (

                    <>

                      <div
                        className="
                          mx-auto
                          flex
                          h-20
                          w-20
                          items-center
                          justify-center
                          rounded-2xl
                          bg-indigo-50
                          text-indigo-600
                        "
                      >

                        <FileText
                          size={38}
                        />

                      </div>


                      <h2
                        className="
                          mt-5
                          text-xl
                          font-bold
                          text-slate-900
                        "
                      >
                        Drag & Drop Documents
                      </h2>


                      <p
                        className="
                          mt-2
                          text-sm
                          text-slate-500
                        "
                      >
                        Supported formats:
                        PDF, JPG, JPEG, PNG
                        (Max 10MB per file).
                      </p>


                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-indigo-600
                          px-6
                          py-3
                          text-sm
                          font-semibold
                          text-white
                          shadow-lg
                          shadow-indigo-200
                          transition
                          hover:bg-indigo-700
                        "
                      >

                        <Upload
                          size={17}
                        />

                        Select Files

                      </button>

                    </>

                  ) : (

                    <>

                      <div
                        className="
                          mx-auto
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-2xl
                          bg-green-50
                          text-green-600
                        "
                      >

                        <CheckCircle2
                          size={34}
                        />

                      </div>


                      <h2
                        className="
                          mt-4
                          text-lg
                          font-bold
                          text-slate-900
                        "
                      >
                        {selectedFile.name}
                      </h2>


                      <p
                        className="
                          mt-1
                          text-sm
                          text-slate-500
                        "
                      >
                        {(
                          selectedFile.size /
                          1024 /
                          1024
                        ).toFixed(2)}
                        {" "}MB
                      </p>


                      <div
                        className="
                          mt-5
                          flex
                          justify-center
                          gap-3
                        "
                      >

                        <button
                          type="button"
                          disabled={uploading}
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                          className="
                            rounded-xl
                            border
                            border-indigo-200
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-indigo-600
                            hover:bg-indigo-50
                            disabled:opacity-50
                          "
                        >
                          Change File
                        </button>


                        <button
                          type="button"
                          disabled={uploading}
                          onClick={() => {

                            setSelectedFile(
                              null
                            );

                            if (
                              fileInputRef.current
                            ) {

                              fileInputRef.current.value =
                                "";

                            }

                          }}
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-red-200
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-red-600
                            hover:bg-red-50
                            disabled:opacity-50
                          "
                        >

                          <X
                            size={14}
                          />

                          Remove

                        </button>

                      </div>

                    </>

                  )}

                </section>


                {/* =================================================
                    UPLOAD ERROR
                ================================================= */}

                {uploadError && (

                  <div
                    className="
                      rounded-xl
                      border
                      border-red-100
                      bg-red-50
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-red-600
                    "
                  >
                    {uploadError}
                  </div>

                )}


                {/* =================================================
                    DOCUMENT DETAILS
                ================================================= */}

                <section
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#e9e6f4]
                    bg-white
                    shadow-[0_5px_25px_rgba(50,40,150,0.04)]
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      border-b
                      border-slate-100
                      px-5
                      py-5
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-50
                        text-indigo-600
                      "
                    >

                      <FileText
                        size={20}
                      />

                    </div>


                    <div>

                      <h2
                        className="
                          text-lg
                          font-bold
                          text-slate-900
                        "
                      >
                        Document Details
                      </h2>


                      <p
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        Add information about
                        your certificate.
                      </p>

                    </div>

                  </div>


                  <div
                    className="
                      space-y-5
                      p-5
                    "
                  >

                    {/* TITLE */}

                    <div>

                      <label
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-slate-600
                        "
                      >
                        Certificate Title
                      </label>


                      <input
                        type="text"
                        name="title"
                        value={
                          formData.title
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="e.g. AWS Solutions Architect Professional"
                        disabled={uploading}
                        className="
                          mt-2
                          h-11
                          w-full
                          rounded-lg
                          border
                          border-slate-200
                          bg-[#faf9ff]
                          px-4
                          text-sm
                          text-slate-700
                          outline-none
                          transition
                          focus:border-indigo-500
                          focus:ring-2
                          focus:ring-indigo-100
                          disabled:opacity-60
                        "
                      />

                    </div>


                    {/* TYPE + DATE */}

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                      "
                    >

                      <div>

                        <label
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wide
                            text-slate-600
                          "
                        >
                          Document Type
                        </label>


                        <select
                          name="type"
                          value={
                            formData.type
                          }
                          onChange={
                            handleChange
                          }
                          disabled={uploading}
                          className="
                            mt-2
                            h-11
                            w-full
                            rounded-lg
                            border
                            border-slate-200
                            bg-[#faf9ff]
                            px-4
                            text-sm
                            text-slate-700
                            outline-none
                            focus:border-indigo-500
                            disabled:opacity-60
                          "
                        >

                          <option>
                            Academic Degree
                          </option>

                          <option>
                            Professional Certificate
                          </option>

                          <option>
                            Technical Certificate
                          </option>

                          <option>
                            Course Certificate
                          </option>

                          <option>
                            Internship Certificate
                          </option>

                          <option>
                            Other
                          </option>

                        </select>

                      </div>


                      <div>

                        <label
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wide
                            text-slate-600
                          "
                        >
                          Issue Date
                        </label>


                        <input
                          type="date"
                          name="issueDate"
                          value={
                            formData.issueDate
                          }
                          onChange={
                            handleChange
                          }
                          disabled={uploading}
                          className="
                            mt-2
                            h-11
                            w-full
                            rounded-lg
                            border
                            border-slate-200
                            bg-[#faf9ff]
                            px-4
                            text-sm
                            text-slate-700
                            outline-none
                            focus:border-indigo-500
                            disabled:opacity-60
                          "
                        />

                      </div>

                    </div>


                    {/* ORGANIZATION */}

                    <div>

                      <label
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-slate-600
                        "
                      >
                        Issuing Organization
                      </label>


                      <input
                        type="text"
                        name="organization"
                        value={
                          formData.organization
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="e.g. Amazon Web Services"
                        disabled={uploading}
                        className="
                          mt-2
                          h-11
                          w-full
                          rounded-lg
                          border
                          border-slate-200
                          bg-[#faf9ff]
                          px-4
                          text-sm
                          text-slate-700
                          outline-none
                          focus:border-indigo-500
                          disabled:opacity-60
                        "
                      />

                    </div>


                    {/* DESCRIPTION */}

                    <div>

                      <label
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-slate-600
                        "
                      >
                        Description (Optional)
                      </label>


                      <textarea
                        name="description"
                        value={
                          formData.description
                        }
                        onChange={
                          handleChange
                        }
                        rows={4}
                        placeholder="Brief details about the curriculum or skills acquired..."
                        disabled={uploading}
                        className="
                          mt-2
                          w-full
                          resize-none
                          rounded-lg
                          border
                          border-slate-200
                          bg-[#faf9ff]
                          px-4
                          py-3
                          text-sm
                          text-slate-700
                          outline-none
                          focus:border-indigo-500
                          disabled:opacity-60
                        "
                      />

                    </div>


                    {/* BACKEND NOTE */}

                    <div
                      className="
                        rounded-xl
                        bg-indigo-50
                        px-4
                        py-3
                      "
                    >

                      <p
                        className="
                          text-xs
                          leading-5
                          text-indigo-700
                        "
                      >

                        After uploading, your
                        certificate will be marked{" "}

                        <strong>
                          Pending
                        </strong>

                        {" "}and sent to the
                        University Committee
                        for verification.

                      </p>

                    </div>


                    {/* BUTTONS */}

                    <div
                      className="
                        flex
                        justify-end
                        gap-3
                        border-t
                        border-slate-100
                        pt-5
                      "
                    >

                      <button
                        type="button"
                        disabled={uploading}
                        onClick={
                          handleCancel
                        }
                        className="
                          rounded-lg
                          border
                          border-slate-200
                          px-5
                          py-2.5
                          text-xs
                          font-semibold
                          text-slate-600
                          transition
                          hover:bg-slate-50
                          disabled:opacity-50
                        "
                      >
                        Cancel
                      </button>


                      <button
                        type="button"
                        disabled={uploading}
                        onClick={
                          handleSaveRecord
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-lg
                          bg-indigo-600
                          px-5
                          py-2.5
                          text-xs
                          font-semibold
                          text-white
                          shadow-md
                          shadow-indigo-200
                          transition
                          hover:bg-indigo-700
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                        "
                      >

                        {uploading ? (

                          <>
                            <Loader2
                              size={14}
                              className="
                                animate-spin
                              "
                            />

                            Uploading...

                          </>

                        ) : (

                          <>
                            <FileText
                              size={14}
                            />

                            Save Record
                          </>

                        )}

                      </button>

                    </div>

                  </div>

                </section>


                {/* =================================================
                    YOUR VAULT
                ================================================= */}

                <section>

                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <h2
                        className="
                          text-xl
                          font-bold
                          text-slate-900
                        "
                      >
                        Your Vault
                      </h2>


                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        Your saved certificates
                        and credentials.
                      </p>

                    </div>


                    <button
                      type="button"
                      onClick={() =>
                        window.location.href =
                          "/digital-locker"
                      }
                      className="
                        flex
                        items-center
                        gap-1
                        text-xs
                        font-semibold
                        text-indigo-600
                        hover:text-indigo-700
                      "
                    >
                      View All

                      <ChevronRight
                        size={15}
                      />

                    </button>

                  </div>


                  {/* LOADING */}

                  {loading && (

                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-slate-100
                        bg-white
                        py-12
                      "
                    >

                      <Loader2
                        size={20}
                        className="
                          mr-2
                          animate-spin
                          text-indigo-600
                        "
                      />

                      <span
                        className="
                          text-sm
                          text-slate-500
                        "
                      >
                        Loading certificates...
                      </span>

                    </div>

                  )}


                  {/* ERROR */}

                  {!loading &&
                    error && (

                      <div
                        className="
                          rounded-2xl
                          border
                          border-red-100
                          bg-red-50
                          p-5
                          text-sm
                          text-red-600
                        "
                      >
                        {error}
                      </div>

                    )}


                  {/* EMPTY */}

                  {!loading &&
                    !error &&
                    certificates.length === 0 && (

                      <div
                        className="
                          rounded-2xl
                          border
                          border-[#e9e6f4]
                          bg-white
                          p-10
                          text-center
                        "
                      >

                        <FileText
                          size={38}
                          className="
                            mx-auto
                            text-slate-300
                          "
                        />


                        <h3
                          className="
                            mt-4
                            text-sm
                            font-bold
                            text-slate-800
                          "
                        >
                          No certificates yet
                        </h3>


                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-500
                          "
                        >
                          Upload your first
                          certificate above.
                        </p>

                      </div>

                    )}


                  {/* CERTIFICATES */}

                  {!loading &&
                    !error &&
                    certificates.length > 0 && (

                      <div
                        className="
                          grid
                          grid-cols-1
                          gap-5
                          sm:grid-cols-2
                        "
                      >

                        {certificates.map(
                          (certificate) => (

                            <CertificateCard
                              key={
                                certificate.id
                              }
                              certificate={
                                certificate
                              }
                              onSelect={() =>
                                setSelectedCertificate(
                                  certificate
                                )
                              }
                              onOpen={() =>
                                openDocument(
                                  certificate
                                )
                              }
                            />

                          )
                        )}

                      </div>

                    )}

                </section>

              </div>


              {/* =================================================
                  RIGHT COLUMN
              ================================================= */}

              <div className="space-y-6">


                {/* =================================================
                    TRUST CENTER
                ================================================= */}

                <section
                  className="
                    rounded-2xl
                    border
                    border-[#e9e6f4]
                    bg-white
                    p-5
                    shadow-[0_5px_25px_rgba(50,40,150,0.04)]
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-50
                        text-indigo-600
                      "
                    >

                      <ShieldCheck
                        size={20}
                      />

                    </div>


                    <h2
                      className="
                        text-lg
                        font-bold
                        text-slate-900
                      "
                    >
                      Trust Center
                    </h2>

                  </div>


                  <div
                    className="
                      mt-5
                      rounded-xl
                      bg-[#f5f4ff]
                      p-4
                    "
                  >

                    {selectedCertificate ? (

                      <>

                        {/* STATUS */}

                        <div
                          className="
                            flex
                            gap-3
                          "
                        >

                          {selectedCertificate.status ===
                          "VERIFIED" ? (

                            <CheckCircle2
                              size={18}
                              className="
                                mt-0.5
                                shrink-0
                                text-green-500
                              "
                            />

                          ) : selectedCertificate.status ===
                            "REJECTED" ? (

                            <AlertCircle
                              size={18}
                              className="
                                mt-0.5
                                shrink-0
                                text-red-500
                              "
                            />

                          ) : (

                            <Clock3
                              size={18}
                              className="
                                mt-0.5
                                shrink-0
                                text-amber-500
                              "
                            />

                          )}


                          <div>

                            <p
                              className="
                                text-xs
                                font-bold
                                text-slate-800
                              "
                            >
                              {selectedCertificate.status ===
                              "VERIFIED"
                                ? "Verified by University Committee"
                                : selectedCertificate.status ===
                                  "REJECTED"
                                ? "Certificate Rejected"
                                : "Pending Committee Verification"}
                            </p>


                            <p
                              className="
                                mt-1
                                text-[10px]
                                text-slate-500
                              "
                            >
                              Updated{" "}
                              {formatDate(
                                selectedCertificate.updated_at
                              )}
                            </p>

                          </div>

                        </div>


                        <div
                          className="
                            my-4
                            border-t
                            border-indigo-100
                          "
                        />


                        {/* SECURITY */}

                        <div
                          className="
                            flex
                            gap-3
                          "
                        >

                          <KeyRound
                            size={18}
                            className="
                              mt-0.5
                              shrink-0
                              text-indigo-600
                            "
                          />


                          <div>

                            <p
                              className="
                                text-xs
                                font-bold
                                text-slate-800
                              "
                            >
                              Committee Verified Record
                            </p>


                            <p
                              className="
                                mt-1
                                text-[10px]
                                leading-4
                                text-slate-500
                              "
                            >
                              This certificate is
                              securely stored in
                              your EduVault and its
                              verification status is
                              maintained by the
                              University Committee.
                            </p>


                            {selectedCertificate.status ===
                              "REJECTED" &&
                              selectedCertificate.rejection_reason && (

                                <p
                                  className="
                                    mt-3
                                    rounded-lg
                                    bg-red-50
                                    p-2
                                    text-[10px]
                                    leading-4
                                    text-red-600
                                  "
                                >
                                  <strong>
                                    Reason:
                                  </strong>{" "}
                                  {
                                    selectedCertificate.rejection_reason
                                  }
                                </p>

                              )}

                          </div>

                        </div>

                      </>

                    ) : (

                      <div
                        className="
                          py-4
                          text-center
                        "
                      >

                        <ShieldCheck
                          size={30}
                          className="
                            mx-auto
                            text-slate-300
                          "
                        />

                        <p
                          className="
                            mt-3
                            text-xs
                            text-slate-500
                          "
                        >
                          Upload a certificate
                          to view its verification
                          information.
                        </p>

                      </div>

                    )}

                  </div>

                </section>


                {/* =================================================
                    INSTANT VERIFICATION
                ================================================= */}

                <section
                  className="
                    rounded-2xl
                    border
                    border-[#e9e6f4]
                    bg-white
                    p-5
                    text-center
                    shadow-[0_5px_25px_rgba(50,40,150,0.04)]
                  "
                >

                  <h2
                    className="
                      text-lg
                      font-bold
                      text-slate-900
                    "
                  >
                    Document Access
                  </h2>


                  <p
                    className="
                      mx-auto
                      mt-2
                      max-w-[220px]
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    Open your certificate
                    directly from the secure
                    document storage.
                  </p>


                  <div
                    onClick={() => {
                      if (selectedCertificate) setShowShareModal(true);
                    }}
                    className="
                      group/qr
                      relative
                      mx-auto
                      mt-5
                      flex
                      h-40
                      w-40
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      p-2
                      shadow-sm
                      transition-all
                      hover:border-indigo-400
                      hover:shadow-md
                    "
                    title="Click to view full QR and verification details"
                  >
                    {selectedCertificate ? (
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                          getShareableUrl(`/verify/${selectedCertificate.verification_id || selectedCertificate.id}`)
                        )}&margin=2`}
                        alt="Certificate QR Code"
                        className="h-32 w-32 rounded-lg object-contain"
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-32
                          w-32
                          items-center
                          justify-center
                          rounded-lg
                          bg-slate-50
                        "
                      >
                        <QrCode
                          size={100}
                          strokeWidth={1.5}
                          className="
                            text-slate-400
                          "
                        />
                      </div>
                    )}

                    {selectedCertificate && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-indigo-900/70 text-white opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover/qr:opacity-100">
                        <span className="flex items-center gap-1.5 text-xs font-semibold">
                          <Share2 size={14} />
                          Share / Verify
                        </span>
                      </div>
                    )}
                  </div>


                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-2
                      gap-3
                    "
                  >
                    <button
                      type="button"
                      disabled={!selectedCertificate}
                      onClick={() => setShowShareModal(true)}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-indigo-600
                        px-3
                        py-2.5
                        text-xs
                        font-semibold
                        text-white
                        transition
                        hover:bg-indigo-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <Share2 size={14} />
                      Share / QR
                    </button>

                    <button
                      type="button"
                      disabled={!selectedCertificate}
                      onClick={() =>
                        openDocument(selectedCertificate)
                      }
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-indigo-500
                        px-3
                        py-2.5
                        text-xs
                        font-semibold
                        text-indigo-600
                        transition
                        hover:bg-indigo-50
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <ExternalLink size={14} />
                      View File
                    </button>
                  </div>

                </section>


                {/* =================================================
                    DOCUMENT HISTORY
                ================================================= */}

                <section
                  className="
                    rounded-2xl
                    border
                    border-[#e9e6f4]
                    bg-white
                    p-5
                    shadow-[0_5px_25px_rgba(50,40,150,0.04)]
                  "
                >

                  <h2
                    className="
                      text-lg
                      font-bold
                      text-slate-900
                    "
                  >
                    Document History
                  </h2>


                  <div
                    className="
                      relative
                      mt-6
                      space-y-7
                      pl-5
                    "
                  >

                    <div
                      className="
                        absolute
                        bottom-3
                        left-[5px]
                        top-2
                        w-px
                        bg-slate-200
                      "
                    />


                    {selectedCertificate ? (

                      <>

                        <HistoryItem
                          color={
                            selectedCertificate.status ===
                            "VERIFIED"
                              ? "green"
                              : selectedCertificate.status ===
                                "REJECTED"
                              ? "red"
                              : "yellow"
                          }
                          title={
                            selectedCertificate.status ===
                            "VERIFIED"
                              ? "Successfully Verified"
                              : selectedCertificate.status ===
                                "REJECTED"
                              ? "Certificate Rejected"
                              : "Pending Verification"
                          }
                          description={
                            selectedCertificate.status ===
                            "VERIFIED"
                              ? "Committee Review Complete"
                              : selectedCertificate.status ===
                                "REJECTED"
                              ? selectedCertificate.rejection_reason ||
                                "Committee rejected this certificate."
                              : "Waiting for Committee Review"
                          }
                          date={formatDate(
                            selectedCertificate.updated_at
                          )}
                        />


                        <HistoryItem
                          color="indigo"
                          title="Certificate Uploaded"
                          description="Document added to EduVault"
                          date={formatDate(
                            selectedCertificate.created_at
                          )}
                        />

                      </>

                    ) : (

                      <p
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        No certificate history
                        available.
                      </p>

                    )}

                  </div>

                </section>

              </div>

            </div>

          </div>

        </main>

      </div>

      {showShareModal && selectedCertificate && (
        <ShareVerificationModal
          document={selectedCertificate}
          onClose={() => setShowShareModal(false)}
        />
      )}

    </div>
  );
}


/* =========================================================
   CERTIFICATE CARD
========================================================= */

function CertificateCard({
  certificate,
  onSelect,
  onOpen,
}) {

  const status =
    getCertificateStatus(
      certificate.status
    );


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
      "
    >

      {/* TOP */}

      <div
        className="
          relative
          h-40
          bg-gradient-to-br
          from-indigo-50
          via-white
          to-purple-50
          p-4
        "
      >

        <div
          className="
            flex
            h-full
            items-center
            justify-center
            rounded-xl
            border
            border-white
            bg-white/60
            shadow-sm
          "
        >

          <Award
            size={55}
            strokeWidth={1.2}
            className="
              text-indigo-300
            "
          />

        </div>


        {/* STATUS */}

        <div
          className={`
            absolute
            right-5
            top-5
            flex
            items-center
            gap-1
            rounded-full
            px-2.5
            py-1
            text-[9px]
            font-bold
            ${status.className}
          `}
        >

          {status.icon}

          {status.label}

        </div>

      </div>


      {/* CONTENT */}

      <div className="p-4">

        <h3
          className="
            text-sm
            font-bold
            text-slate-900
          "
        >
          {certificate.title}
        </h3>


        <p
          className="
            mt-1
            text-xs
            text-slate-500
          "
        >
          Certificate
        </p>


        <div
          className="
            mt-4
            flex
            items-center
            gap-4
            border-t
            border-slate-100
            pt-3
          "
        >

          <div
            className="
              flex
              items-center
              gap-1.5
              text-[10px]
              text-slate-500
            "
          >

            <CalendarDays
              size={12}
            />

            {formatCertificateDate(
              certificate.created_at
            )}

          </div>


          <div
            className="
              flex
              items-center
              gap-1.5
              text-[10px]
              text-slate-500
            "
          >

            <HardDrive
              size={12}
            />

            Document

          </div>

        </div>


        {/* ACTIONS */}

        <div
          className="
            mt-4
            flex
            gap-2
          "
        >

          <button
            type="button"
            onClick={onSelect}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-lg
              bg-indigo-50
              px-3
              py-2
              text-[10px]
              font-semibold
              text-indigo-600
              transition
              hover:bg-indigo-100
            "
          >

            Select

          </button>


          <button
            type="button"
            onClick={onOpen}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-lg
              bg-indigo-600
              px-3
              py-2
              text-[10px]
              font-semibold
              text-white
              transition
              hover:bg-indigo-700
            "
          >

            <ExternalLink
              size={12}
            />

            Open

          </button>

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   STATUS HELPER
========================================================= */

function getCertificateStatus(
  status
) {

  switch (status) {

    case "VERIFIED":

      return {
        label: "Verified",
        icon: (
          <CheckCircle2
            size={11}
          />
        ),
        className:
          "bg-green-100 text-green-700",
      };


    case "REJECTED":

      return {
        label: "Rejected",
        icon: (
          <AlertCircle
            size={11}
          />
        ),
        className:
          "bg-red-100 text-red-700",
      };


    default:

      return {
        label: "Pending",
        icon: (
          <Clock3
            size={11}
          />
        ),
        className:
          "bg-amber-100 text-amber-700",
      };

  }
}


/* =========================================================
   DATE HELPER
========================================================= */

function formatCertificateDate(
  date
) {

  if (!date) {
    return "Recently";
  }


  const parsed =
    new Date(date);


  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {

    return "Recently";

  }


  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}


/* =========================================================
   HISTORY ITEM
========================================================= */

function HistoryItem({
  color,
  title,
  description,
  date,
}) {

  const colors = {

    green:
      "bg-green-500",

    yellow:
      "bg-amber-500",

    indigo:
      "bg-indigo-600",

    red:
      "bg-red-500",

  };


  return (

    <div
      className="
        relative
      "
    >

      <span
        className={`
          absolute
          -left-[19px]
          top-1
          h-2.5
          w-2.5
          rounded-full
          ring-4
          ring-white
          ${colors[color] || colors.indigo}
        `}
      />


      <p
        className="
          text-xs
          font-bold
          text-slate-800
        "
      >
        {title}
      </p>


      <p
        className="
          mt-1
          text-[10px]
          text-slate-500
        "
      >
        {description}
      </p>


      <p
        className="
          mt-1
          text-[9px]
          font-medium
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        {date}
      </p>

    </div>

  );
}


export default Certificates;