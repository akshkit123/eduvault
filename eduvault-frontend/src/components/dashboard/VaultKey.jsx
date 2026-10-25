import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Share2,
  ShieldCheck,
  QrCode,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { getCurrentUser } from "../../api/authApi";
import ShareVerificationModal from "../documents/ShareVerificationModal";
import { getShareableUrl } from "../../utils/qrHelper";

function VaultKey({ user: propUser }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(propUser || null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (propUser) {
      setCurrentUser(propUser);
      return;
    }

    const fetchUser = async () => {
      try {
        const u = await getCurrentUser();
        setCurrentUser(u);
      } catch (err) {
        console.error("VaultKey user fetch error:", err);
      }
    };

    fetchUser();
  }, [propUser]);

  const studentId = currentUser?.id || "me";
  const studentProfileUrl = getShareableUrl(`/student/${studentId}`);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    studentProfileUrl
  )}&margin=4`;

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handlePreviewClick = () => {
    if (currentUser?.id) {
      window.open(`/student/${currentUser.id}`, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/student/1`);
    }
  };

  return (
    <>
      <div
        className="
          group
          rounded-2xl
          border-2
          border-indigo-500
          bg-white
          p-5
          text-center
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-indigo-100
          sm:p-6
        "
      >
        {/* TITLE */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <QrCode size={17} />
          </div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Interview Key
          </h2>
        </div>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-2 max-w-[220px] text-xs leading-5 text-slate-600">
          Interviewer scans to verify your credentials, CGPA, & projects.
        </p>

        {/* QR CODE CONTAINER */}
        <div
          onClick={handlePreviewClick}
          className="
            group/qr
            relative
            mx-auto
            mt-4
            flex
            h-32
            w-32
            cursor-pointer
            items-center
            justify-center
            rounded-2xl
            border
            border-indigo-100
            bg-[#f8f7ff]
            p-2.5
            shadow-xs
            transition-all
            duration-300
            hover:border-indigo-400
            hover:shadow-md
          "
          title="Click to preview interview profile"
        >
          <img
            src={qrImageUrl}
            alt="Interview Profile QR"
            className="h-full w-full rounded-xl object-contain"
          />

          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-indigo-900/70 text-white opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover/qr:opacity-100">
            <span className="flex items-center gap-1 text-[11px] font-semibold">
              <ExternalLink size={13} />
              Preview
            </span>
          </div>
        </div>

        {/* CODE BADGE */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-700">
            <ShieldCheck size={11} className="text-emerald-500" />
            EV-STUDENT-{currentUser?.id || "PASS"}
          </span>
        </div>

        {/* BUTTONS */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
          {/* Share QR */}
          <button
            type="button"
            onClick={handleShareClick}
            className="
              flex
              items-center
              justify-center
              gap-1.5
              rounded-xl
              bg-indigo-600
              px-2
              py-2.5
              text-xs
              font-semibold
              text-white
              transition-all
              hover:bg-indigo-700
              hover:shadow-md
            "
          >
            <Share2 size={13} />
            <span>Share Pass</span>
          </button>

          {/* Preview */}
          <button
            type="button"
            onClick={handlePreviewClick}
            className="
              flex
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-indigo-600
              px-2
              py-2.5
              text-xs
              font-semibold
              text-indigo-600
              transition-all
              hover:bg-indigo-50
            "
          >
            <ExternalLink size={13} />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* SHARE MODAL */}
      {showShareModal && (
        <ShareVerificationModal
          student={
            currentUser || {
              id: studentId,
              full_name: "Candidate Profile",
              email: "student@eduvault.edu",
            }
          }
          type="STUDENT"
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
}

export default VaultKey;