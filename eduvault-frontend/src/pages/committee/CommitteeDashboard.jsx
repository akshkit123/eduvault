import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  UserRoundCheck,
  ArrowRight,
  FileCheck,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import CommitteeNavbar from "../../components/committee/CommitteeNavbar";
import {
  getCommitteeStudents,
  getCommitteeDocuments,
} from "../../api/committeeApi";

function CommitteeDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [studentsData, documentsData] = await Promise.all([
          getCommitteeStudents(),
          getCommitteeDocuments(),
        ]);

        setStudents(Array.isArray(studentsData) ? studentsData : []);
        setDocuments(Array.isArray(documentsData) ? documentsData : []);
      } catch (err) {
        console.error("Committee dashboard loading error:", err);
        if (err.message?.includes("401") || err.message === "NO_ACCESS_TOKEN") {
          navigate("/login");
          return;
        }
        if (err.message?.includes("403")) {
          navigate("/dashboard");
          return;
        }
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Student metrics
  const totalStudents = students.length;
  const graduationPending = students.filter(
    (student) => student.graduation_status === "ONGOING"
  ).length;
  const alumni = students.filter(
    (student) => student.graduation_status === "GRADUATED"
  ).length;

  // Document metrics
  const totalDocuments = documents.length;
  const pendingDocuments = documents.filter(
    (doc) => doc.status === "PENDING"
  ).length;
  const verifiedDocuments = documents.filter(
    (doc) => doc.status === "VERIFIED"
  ).length;

  return (
    <div className="min-h-screen bg-[#f8f7ff] pb-16">
      {/* Top Navbar */}
      <CommitteeNavbar pendingDocumentsCount={pendingDocuments} />

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Administrative Oversight
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Committee Dashboard
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Audit student credentials, verify academic records, and oversee degree graduation.
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-rose-600" />
            <div className="flex-1 text-sm">
              <p className="font-semibold">Failed to fetch data</p>
              <p className="mt-0.5 text-rose-700">{error}</p>
            </div>
          </div>
        )}

        {/* Primary Statistics Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Documents Pending Review */}
          <div
            onClick={() => navigate("/committee/documents")}
            className="group cursor-pointer rounded-2xl border border-amber-200/80 bg-white p-5 shadow-xs transition hover:border-amber-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Pending Verification
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition group-hover:scale-105">
                <Clock3 size={20} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-amber-900">
              {loading ? "--" : pendingDocuments}
            </p>
            <p className="mt-1 text-xs text-amber-600">
              {pendingDocuments > 0
                ? "Submissions awaiting approval →"
                : "Queue is all caught up"}
            </p>
          </div>

          {/* Verified Documents */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Verified Documents
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">
              {loading ? "--" : verifiedDocuments}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Out of {loading ? "--" : totalDocuments} total submitted
            </p>
          </div>

          {/* Total Enrolled Students */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Active Students
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Users size={20} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">
              {loading ? "--" : totalStudents}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {loading ? "--" : graduationPending} pending graduation
            </p>
          </div>

          {/* Graduated Alumni */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Alumni Graduated
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <UserRoundCheck size={20} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">
              {loading ? "--" : alumni}
            </p>
            <p className="mt-1 text-xs text-slate-400">Official graduated records</p>
          </div>
        </div>

        {/* Feature Action Modules */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Card 1: Document Verification */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-200">
                  <FileCheck size={24} />
                </div>
                {pendingDocuments > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                    {pendingDocuments} Pending Action
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Document Verification Queue
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Inspect certificates, marksheets, and internship proofs submitted by students. Verify credentials or provide specific feedback for rejected uploads.
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => navigate("/committee/documents")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <span>Open Verification Queue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2: Student Graduation */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-200">
                  <GraduationCap size={24} />
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                  Role Transition
                </span>
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Graduation Management
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Confirm a student's completion of their degree program. Once confirmed, their profile automatically shifts from Student to Alumni with a graduation date.
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => navigate("/committee/students")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <span>Manage Graduation</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Security & Audit Note */}
        <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <UserRoundCheck size={18} />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-indigo-900">
                Institutional Authority & Role Integrity
              </p>
              <p className="mt-0.5 leading-relaxed text-indigo-700">
                Only authenticated Committee members can verify credentials and graduate students. Every approved document is permanently tied to the institution's verified trust ledger.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CommitteeDashboard;