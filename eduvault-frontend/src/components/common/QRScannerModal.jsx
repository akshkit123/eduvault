import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Upload,
  X,
  AlertCircle,
  CheckCircle2,
  QrCode,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import jsQR from "jsqr";

export default function QRScannerModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("camera"); // "camera" | "upload"
  const [cameraError, setCameraError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [processingImage, setProcessingImage] = useState(false);

  // Parse scanned URL or code and navigate
  const handleScannedData = (rawValue) => {
    if (!rawValue) return;
    const value = rawValue.trim();
    setScannedResult(value);

    // Stop camera
    stopCamera();

    // Check if it's a URL
    try {
      if (value.startsWith("http://") || value.startsWith("https://")) {
        const urlObj = new URL(value);
        // If it matches our route structure:
        if (urlObj.pathname.includes("/student/")) {
          navigate(urlObj.pathname);
          onClose();
          return;
        }
        if (urlObj.pathname.includes("/verify/")) {
          navigate(urlObj.pathname);
          onClose();
          return;
        }
        if (urlObj.pathname.includes("/candidate/")) {
          navigate(urlObj.pathname);
          onClose();
          return;
        }
        // External URL
        window.location.href = value;
        return;
      }
    } catch (e) {
      // not a standard URL, continue with code resolution
    }

    // Check if it's a student code
    if (value.startsWith("EV-STUDENT-")) {
      const studentId = value.replace("EV-STUDENT-", "").trim();
      navigate(`/student/${studentId}`);
      onClose();
      return;
    }

    // Check if it's a document verification code
    if (value.startsWith("EV-")) {
      navigate(`/verify/${value}`);
      onClose();
      return;
    }

    // If it's a PRN or numeric ID
    navigate(`/student/${value}`);
    onClose();
  };

  // Start Camera
  const startCamera = async () => {
    setCameraError("");
    setScanning(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Camera access is not supported on this browser. Try uploading a QR image instead."
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        scanFrame();
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(
        err.name === "NotAllowedError"
          ? "Camera permission denied. Please allow camera access in browser settings or upload an image."
          : err.message || "Unable to start camera."
      );
      setScanning(false);
    }
  };

  // Frame scanner loop
  const scanFrame = () => {
    if (!videoRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code && code.data) {
        handleScannedData(code.data);
        return;
      }
    }

    animationFrameRef.current = requestAnimationFrame(scanFrame);
  };

  // Stop Camera
  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  // File Upload scanning
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcessingImage(true);
    setCameraError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        try {
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code && code.data) {
            handleScannedData(code.data);
          } else {
            setCameraError(
              "No valid QR code found in this image. Please upload a clear photo or screenshot."
            );
          }
        } catch (err) {
          setCameraError("Could not process image file.");
        } finally {
          setProcessingImage(false);
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isOpen && activeTab === "camera") {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
              <QrCode size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Scan Candidate QR
              </h3>
              <p className="text-xs text-slate-500">
                Instantly view verified credentials & portfolio
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 bg-slate-50/70 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("camera")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition ${
              activeTab === "camera"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Camera size={15} />
            Live Camera
          </button>

          <button
            type="button"
            onClick={() => {
              stopCamera();
              setActiveTab("upload");
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition ${
              activeTab === "upload"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Upload size={15} />
            Upload QR Image
          </button>
        </div>

        {/* Main Body */}
        <div className="p-6">
          {activeTab === "camera" && (
            <div className="flex flex-col items-center">
              {/* Viewfinder frame */}
              <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-2xl border-2 border-indigo-500 bg-black shadow-inner">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  muted
                />

                {/* Animated laser line */}
                {scanning && (
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse" />
                )}

                {/* Crosshairs */}
                <div className="pointer-events-none absolute inset-4 rounded-xl border border-dashed border-white/40" />

                {!scanning && !cameraError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
                    <Loader2 size={28} className="animate-spin text-indigo-400" />
                  </div>
                )}
              </div>

              <p className="mt-4 text-xs font-semibold text-slate-700">
                Point camera at candidate's QR code
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Works with any resume, phone screen, or student ID
              </p>

              {cameraError && (
                <div className="mt-4 flex w-full items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-left">
                  <AlertCircle size={16} className="shrink-0 text-red-500" />
                  <div className="text-xs text-red-700">
                    <p className="font-semibold">Camera Error</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-red-600">
                      {cameraError}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("upload")}
                      className="mt-2 text-xs font-bold text-red-800 underline"
                    >
                      Upload image instead →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "upload" && (
            <div className="flex flex-col items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/70"
              >
                {processingImage ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 size={32} className="animate-spin text-indigo-600" />
                    <p className="text-xs font-semibold text-slate-700">
                      Reading QR Code...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                      <Upload size={22} />
                    </div>
                    <p className="mt-3 text-xs font-bold text-slate-800">
                      Click to choose or drop QR image
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Supports JPG, PNG, Screenshots
                    </p>
                  </>
                )}
              </div>

              {cameraError && (
                <div className="mt-4 flex w-full items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-left">
                  <AlertCircle size={16} className="shrink-0 text-red-500" />
                  <p className="text-xs text-red-700">{cameraError}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50/70 p-4 text-center">
          <p className="text-[11px] text-slate-500">
            Powered by EduVault Institutional Verification Engine
          </p>
        </div>
      </div>
    </div>
  );
}
