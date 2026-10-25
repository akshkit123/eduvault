import { useEffect, useMemo, useState } from "react";
import {
  FolderOpen,
  Filter,
  Plus,
  CheckCircle2,
  Clock3,
  Code2,
  ExternalLink,
  GitBranch,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../api/projectApi";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  // Mobile sidebar state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project_type: "Academic",
    status: "Completed",
    technologies: "",
    github_url: "",
    live_url: "",
  });

  // =========================================================
  // LOAD PROJECTS
  // =========================================================
  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setError(err.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Top technologies extraction
  const topTechnologies = useMemo(() => {
    const counts = {};
    projects.forEach((proj) => {
      if (Array.isArray(proj.technologies)) {
        proj.technologies.forEach((tech) => {
          const clean = tech.trim();
          if (clean) counts[clean] = (counts[clean] || 0) + 1;
        });
      }
    });
    return Object.keys(counts).slice(0, 6);
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter(
      (p) => p.project_type?.toLowerCase() === filter.toLowerCase()
    );
  }, [projects, filter]);

  // =========================================================
  // CREATE PROJECT
  // =========================================================
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setActionError("Please provide a project title.");
      return;
    }

    try {
      setSubmitting(true);
      setActionError("");

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        project_type: formData.project_type,
        status: formData.status,
        technologies: formData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        github_url: formData.github_url.trim(),
        live_url: formData.live_url.trim(),
      };

      const created = await createProject(payload);
      setProjects((prev) => [created, ...prev]);

      // Reset form & close modal
      setFormData({
        title: "",
        description: "",
        project_type: "Academic",
        status: "Completed",
        technologies: "",
        github_url: "",
        live_url: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add project:", err);
      setActionError(err.message || "Failed to create project.");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // DELETE PROJECT
  // =========================================================
  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete project.");
    }
  };

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
                    Portfolio & Lab
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">Live Repos & Builds</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Projects & Research
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Track your academic courseworks, hackathon builds, and personal software projects.
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
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total in Vault
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <FolderOpen size={18} />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-900">
                  {loading ? "--" : projects.length}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">Total cataloged works</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Core Technologies
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Code2 size={18} />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {topTechnologies.length > 0 ? (
                    topTechnologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">Add projects to see stack</span>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Verified Builds
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={18} />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-emerald-700">
                  {loading ? "--" : projects.filter((p) => p.status === "Verified").length}
                </p>
                <p className="mt-0.5 text-xs text-emerald-600">Faculty/Committee verified</p>
              </div>
            </div>
          </section>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Filter size={15} />
              <span>Filter by Type:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
              {["All", "Academic", "Personal", "Research"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilter(t)}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    filter === t
                      ? "bg-white text-slate-900 shadow-xs"
                      : "hover:text-slate-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="mt-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 size={32} className="animate-spin text-indigo-600" />
                <p className="mt-3 text-sm font-medium text-slate-600">
                  Loading projects...
                </p>
              </div>
            ) : error ? (
              <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">{error}</span>
                <button
                  onClick={loadProjects}
                  className="ml-auto rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  Retry
                </button>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <FolderOpen size={24} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  No projects added yet
                </h3>
                <p className="mt-1 max-w-sm text-xs text-slate-500">
                  Add your major project, capstone coursework, or personal open-source repo to showcase on your profile.
                </p>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="mt-4 flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  <Plus size={15} />
                  <span>Add First Project</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-indigo-200 hover:shadow-md"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                          {project.project_type || "Academic"}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              project.status === "Verified"
                                ? "bg-emerald-50 text-emerald-700"
                                : project.status === "In Progress"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-indigo-50 text-indigo-700"
                            }`}
                          >
                            {project.status === "Verified" && (
                              <CheckCircle2 size={11} className="text-emerald-600" />
                            )}
                            {project.status === "In Progress" && (
                              <Clock3 size={11} className="text-amber-600" />
                            )}
                            <span>{project.status || "Completed"}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteProject(project.id, project.title)
                            }
                            className="rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-4 text-base font-bold text-slate-900">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-500">
                        {project.description || "No description provided."}
                      </p>

                      {/* Tech Stack Pills */}
                      {Array.isArray(project.technologies) &&
                        project.technologies.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.technologies.map((t) => (
                              <span
                                key={t}
                                className="rounded-md bg-indigo-50/70 px-2 py-0.5 text-[10px] font-medium text-indigo-700"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>

                    {/* Footer Links */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                      <div className="flex items-center gap-3">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-indigo-600"
                          >
                            <GitBranch size={14} />
                            <span>Code</span>
                          </a>
                        )}

                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                          >
                            <ExternalLink size={14} />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-400">
                        {project.created_at
                          ? new Date(project.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Add Project Card Button */}
                <button
                  type="button"
                  onClick={() => {
                    setActionError("");
                    setShowModal(true);
                  }}
                  className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-transparent p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-xs">
                    <Plus size={20} />
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-slate-800">
                    Add Another Project
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    Showcase new repository or research work
                  </p>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* =========================================================
          ADD PROJECT MODAL
      ========================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Add New Project
                </h3>
                <p className="text-xs text-slate-500">
                  Save a project to your EduVault credential portfolio.
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

            <form onSubmit={handleCreateProject} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Project Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. Distributed Credential Locker"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Type
                  </label>
                  <select
                    value={formData.project_type}
                    onChange={(e) =>
                      setFormData({ ...formData, project_type: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Academic">Academic Coursework</option>
                    <option value="Personal">Personal Project</option>
                    <option value="Research">Research Paper / Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Verified">Verified</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Briefly describe the problem solved, architecture, or features..."
                  className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="e.g. Python, React, PostgreSQL, Docker"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) =>
                      setFormData({ ...formData, github_url: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Live Demo / Link (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) =>
                      setFormData({ ...formData, live_url: e.target.value })
                    }
                    placeholder="https://myproject.app"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
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
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;