import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Plus,
  Clock3,
  ShieldCheck,
  CheckCircle2,
  Building2,
  CalendarDays,
  MapPin,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  Quote,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import {
  getInternships,
  createInternship,
  deleteInternship,
} from "../api/internshipApi";

function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  // Mobile sidebar state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    location: "Remote",
    start_date: "",
    end_date: "",
    duration: "",
    responsibilities: "",
    skills: "",
    feedback: "",
    reviewer: "",
    reviewer_role: "",
    status: "Pending",
  });

  // =========================================================
  // LOAD INTERNSHIPS
  // =========================================================
  const loadInternships = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getInternships();
      setInternships(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load internships:", err);
      setError(err.message || "Failed to load internship records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInternships();
  }, []);

  // =========================================================
  // CREATE INTERNSHIP
  // =========================================================
  const handleCreateInternship = async (e) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.company.trim()) {
      setActionError("Please provide both the role and company name.");
      return;
    }

    try {
      setSubmitting(true);
      setActionError("");

      const calculatedDuration =
        formData.duration.trim() ||
        (formData.start_date && formData.end_date
          ? `${formData.start_date} - ${formData.end_date}`
          : "");

      const payload = {
        role: formData.role.trim(),
        company: formData.company.trim(),
        location: formData.location.trim() || "Remote",
        start_date: formData.start_date.trim(),
        end_date: formData.end_date.trim(),
        duration: calculatedDuration,
        responsibilities: formData.responsibilities
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean),
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        feedback: formData.feedback.trim(),
        reviewer: formData.reviewer.trim(),
        reviewer_role: formData.reviewer_role.trim(),
        status: formData.status,
      };

      const created = await createInternship(payload);
      setInternships((prev) => [created, ...prev]);

      // Reset form
      setFormData({
        role: "",
        company: "",
        location: "Remote",
        start_date: "",
        end_date: "",
        duration: "",
        responsibilities: "",
        skills: "",
        feedback: "",
        reviewer: "",
        reviewer_role: "",
        status: "Pending",
      });
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save internship:", err);
      setActionError(err.message || "Failed to save internship entry.");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // DELETE INTERNSHIP
  // =========================================================
  const handleDeleteInternship = async (id, role, company) => {
    if (!window.confirm(`Delete internship record for ${role} at ${company}?`))
      return;

    try {
      await deleteInternship(id);
      setInternships((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete internship entry.");
    }
  };

  const verifiedCount = internships.filter(
    (i) => i.status?.toLowerCase() === "verified"
  ).length;

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#15182b]">
      {/* SIDEBAR */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* MAIN CONTENT AREA */}
      <div className="min-w-0 lg:ml-[280px]">
        {/* TOPBAR */}
        <Topbar setMobileOpen={setMobileOpen} />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <section className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-white via-[#f5f4ff] to-[#e9eaff] p-6 shadow-xs sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                    Industry Experience
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">Corporate & Research Internships</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Internships & Training
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Document your professional work experience, responsibilities, and supervisor recommendations.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActionError("");
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Plus size={16} />
                  <span>Add Internship</span>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Experiences
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <BriefcaseBusiness size={18} />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-900">
                  {loading ? "--" : internships.length}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">Total verified & self-reported</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Verified Proofs
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck size={18} />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-emerald-700">
                  {loading ? "--" : verifiedCount}
                </p>
                <p className="mt-0.5 text-xs text-emerald-600">With verified credentials</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Companies
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Building2 size={18} />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-900">
                  {loading
                    ? "--"
                    : new Set(internships.map((i) => i.company?.toLowerCase()))
                        .size}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">Unique corporate networks</p>
              </div>
            </div>
          </section>

          {/* Internships List */}
          <div className="mt-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 size={32} className="animate-spin text-indigo-600" />
                <p className="mt-3 text-sm font-medium text-slate-600">
                  Loading internship experiences...
                </p>
              </div>
            ) : error ? (
              <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">{error}</span>
                <button
                  onClick={loadInternships}
                  className="ml-auto rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  Retry
                </button>
              </div>
            ) : internships.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <BriefcaseBusiness size={24} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  No internships cataloged yet
                </h3>
                <p className="mt-1 max-w-sm text-xs text-slate-500">
                  Add your summer internships, co-ops, or traineeships to highlight industry-tested skills.
                </p>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="mt-4 flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  <Plus size={15} />
                  <span>Add First Internship</span>
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {internships.map((internship) => (
                  <div
                    key={internship.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-indigo-200 hover:shadow-md"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-lg font-bold text-slate-900">
                            {internship.role}
                          </h3>
                          <span className="text-slate-300">•</span>
                          <span className="font-semibold text-indigo-600">
                            {internship.company}
                          </span>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              internship.status?.toLowerCase() === "verified"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {internship.status?.toLowerCase() === "verified" ? (
                              <CheckCircle2 size={11} className="text-emerald-600" />
                            ) : (
                              <Clock3 size={11} className="text-amber-600" />
                            )}
                            <span>{internship.status || "Pending"}</span>
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          {internship.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={13} className="text-slate-400" />
                              <span>{internship.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <CalendarDays size={13} className="text-slate-400" />
                            <span>
                              {internship.duration ||
                                `${internship.start_date || ""} - ${
                                  internship.end_date || "Present"
                                }`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteInternship(
                            internship.id,
                            internship.role,
                            internship.company
                          )
                        }
                        className="self-start rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        title="Delete Internship"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Key Responsibilities */}
                    {Array.isArray(internship.responsibilities) &&
                      internship.responsibilities.length > 0 && (
                        <div className="mt-4 border-t border-slate-100 pt-3">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Key Responsibilities
                          </p>
                          <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                            {internship.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* Skills Applied */}
                    {Array.isArray(internship.skills) &&
                      internship.skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {internship.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Feedback Quote */}
                    {internship.feedback && (
                      <div className="mt-4 rounded-xl border border-indigo-100 bg-[#f8f7ff] p-3.5">
                        <div className="flex items-start gap-2 text-xs italic text-indigo-900">
                          <Quote size={14} className="mt-0.5 shrink-0 text-indigo-400" />
                          <p>"{internship.feedback}"</p>
                        </div>
                        {internship.reviewer && (
                          <p className="mt-2 text-right text-[11px] font-semibold text-slate-600">
                            — {internship.reviewer}
                            {internship.reviewer_role
                              ? `, ${internship.reviewer_role}`
                              : ""}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* =========================================================
          ADD INTERNSHIP MODAL
      ========================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Add Internship Experience
                </h3>
                <p className="text-xs text-slate-500">
                  Catalog a completed or ongoing internship in your vault.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            {actionError && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
                {actionError}
              </div>
            )}

            <form onSubmit={handleCreateInternship} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Role / Position <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="e.g. Software Engineer Intern"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="e.g. Google, Microsoft, Startup"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. Remote, Mumbai, NY"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Start (Month/Year)
                  </label>
                  <input
                    type="text"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    placeholder="e.g. May 2024"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    End / Duration
                  </label>
                  <input
                    type="text"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                    placeholder="e.g. Aug 2024 (or Present)"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Key Responsibilities (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.responsibilities}
                  onChange={(e) =>
                    setFormData({ ...formData, responsibilities: e.target.value })
                  }
                  placeholder="Developed React microservices...&#10;Reduced query response times by 30%...&#10;Collaborated with Agile engineering team..."
                  className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Skills & Tools Used (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="e.g. React.js, TypeScript, Docker, Git"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Supervisor / Mentor Name (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.reviewer}
                    onChange={(e) =>
                      setFormData({ ...formData, reviewer: e.target.value })
                    }
                    placeholder="e.g. Dr. Jane Smith"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Supervisor Role (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.reviewer_role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviewer_role: e.target.value,
                      })
                    }
                    placeholder="e.g. Engineering Manager"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Supervisor Recommendation / Feedback (optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.feedback}
                  onChange={(e) =>
                    setFormData({ ...formData, feedback: e.target.value })
                  }
                  placeholder="e.g. Exceptional problem-solving skills and fast onboarding to our codebase."
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Internships;