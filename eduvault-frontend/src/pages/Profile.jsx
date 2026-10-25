import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserRound,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  Pencil,
  Save,
  X,
  Plus,
  Globe,
  Check,
  QrCode,
  Share2,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ShareVerificationModal from "../components/documents/ShareVerificationModal";

import { API_BASE_URL } from "../api/apiClient";

function Profile() {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);

  // =====================================================
  // USER DATA
  // =====================================================

  const [profile, setProfile] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);

  // =====================================================
  // UI STATE
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editMode, setEditMode] = useState(false);

  // =====================================================
  // EDITABLE PROFILE DATA
  // =====================================================

  const [prnNumber, setPrnNumber] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [cgpa, setCgpa] = useState("");

  const [skills, setSkills] = useState([]);

  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  // =====================================================
  // REFRESH ACCESS TOKEN
  // =====================================================

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/token/refresh/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.access) {
        throw new Error("Session expired.");
      }

      localStorage.setItem("accessToken", data.access);

      return data.access;
    } catch (error) {
      console.error("Refresh token error:", error);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return null;
    }
  };

  // =====================================================
  // AUTHENTICATED FETCH
  // =====================================================

  const authenticatedFetch = async (url, options = {}) => {
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("NO_ACCESS_TOKEN");
    }

    const makeRequest = async (token) => {
      return fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    };

    // First request
    let response = await makeRequest(accessToken);

    // Token expired
    if (response.status === 401) {
      console.log("Access token expired. Refreshing...");

      const newAccessToken = await refreshAccessToken();

      if (!newAccessToken) {
        throw new Error("SESSION_EXPIRED");
      }

      response = await makeRequest(newAccessToken);
    }

    return response;
  };

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {
    const getProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        // -------------------------------------------------
        // BASIC USER
        // -------------------------------------------------

        const userResponse = await authenticatedFetch(
          `${API_BASE_URL}/api/auth/me/`,
          {
            method: "GET",
          }
        );

        const userData = await userResponse.json();

        console.log("User:", userData);

        if (!userResponse.ok) {
          throw new Error(
            userData.detail ||
              userData.message ||
              "Unable to load user information."
          );
        }

        // -------------------------------------------------
        // PROFILE DETAILS
        // -------------------------------------------------

        const profileResponse = await authenticatedFetch(
          `${API_BASE_URL}/api/profile/`,
          {
            method: "GET",
          }
        );

        const profileData = await profileResponse.json();

        console.log("Profile:", profileData);

        if (!profileResponse.ok) {
          throw new Error(
            profileData.detail ||
              profileData.message ||
              "Unable to load profile details."
          );
        }

        // -------------------------------------------------
        // SAVE DATA
        // -------------------------------------------------

        setProfile(userData);
        setProfileDetails(profileData);

        // Academic
        setPrnNumber(
          profileData.academic?.prn_number || ""
        );

        setGraduationYear(
          profileData.academic?.graduation_year || ""
        );

        setCgpa(
          profileData.academic?.cgpa ?? ""
        );

        // Skills
        setSkills(profileData.skills || []);

        // Social
        setLinkedin(
          profileData.social?.linkedin || ""
        );

        setGithub(
          profileData.social?.github || ""
        );

        setPortfolio(
          profileData.social?.portfolio || ""
        );
      } catch (error) {
        console.error("Profile loading error:", error);

        if (
          error.message === "SESSION_EXPIRED" ||
          error.message === "NO_ACCESS_TOKEN"
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          navigate("/login");
          return;
        }

        setError(
          error.message || "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  // =====================================================
  // SKILLS
  // =====================================================

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];

    updatedSkills[index] = value;

    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    setSkills(
      skills.filter(
        (_, skillIndex) => skillIndex !== index
      )
    );
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const cleanedSkills = skills
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      const requestBody = {
        prn_number: prnNumber.trim(),

        graduation_year:
          graduationYear === ""
            ? null
            : Number(graduationYear),

        cgpa:
          cgpa === ""
            ? null
            : Number(cgpa),

        skills: cleanedSkills,

        linkedin: linkedin.trim(),

        github: github.trim(),

        portfolio: portfolio.trim(),
      };

      console.log("Updating profile:", requestBody);

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/profile/`,
        {
          method: "PATCH",
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      console.log("Updated profile:", data);

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.message ||
            "Unable to update profile."
        );
      }

      // -------------------------------------------------
      // UPDATE LOCAL PROFILE
      // -------------------------------------------------

      setProfileDetails(data);

      // Academic
      if (data.academic) {
        setPrnNumber(
          data.academic.prn_number || ""
        );

        setGraduationYear(
          data.academic.graduation_year || ""
        );

        setCgpa(
          data.academic.cgpa ?? ""
        );
      }

      // Skills
      if (data.skills) {
        setSkills(data.skills);
      }

      // Social
      if (data.social) {
        setLinkedin(
          data.social.linkedin || ""
        );

        setGithub(
          data.social.github || ""
        );

        setPortfolio(
          data.social.portfolio || ""
        );
      }

      setEditMode(false);

      setSuccess(
        "Profile updated successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      if (
        error.message === "SESSION_EXPIRED" ||
        error.message === "NO_ACCESS_TOKEN"
      ) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/login");
        return;
      }

      setError(
        error.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DISCARD CHANGES
  // =====================================================

  const handleDiscard = () => {
    if (!profileDetails) {
      return;
    }

    setPrnNumber(
      profileDetails.academic?.prn_number || ""
    );

    setGraduationYear(
      profileDetails.academic?.graduation_year || ""
    );

    setCgpa(
      profileDetails.academic?.cgpa ?? ""
    );

    setSkills(
      profileDetails.skills || []
    );

    setLinkedin(
      profileDetails.social?.linkedin || ""
    );

    setGithub(
      profileDetails.social?.github || ""
    );

    setPortfolio(
      profileDetails.social?.portfolio || ""
    );

    setEditMode(false);

    setError("");
    setSuccess("");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7fc]">
        <div className="text-center">

          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#ddd9ff] border-t-[#4338d5]" />

          <p className="mt-4 text-sm text-[#686a78]">
            Loading your profile...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7fc] px-5">

        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

          <p className="text-sm text-red-500">
            {error}
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-5 rounded-lg bg-[#4338d5] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3529bd]"
          >
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const profileImage =
    profileDetails?.academic?.profile_image;

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f8f7fc] text-[#15182b]">

      <Sidebar />

      <div className="ml-0 lg:ml-[280px]">

        <Topbar user={profile} />

        <main className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#5141d8]">
                Student Profile
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-[#11152a] sm:text-4xl">
                My Profile
              </h1>

              <p className="mt-2 max-w-[550px] text-sm leading-6 text-[#686a78]">
                Manage your personal and academic
                information.
              </p>

            </div>

            {/* ACTION BUTTON */}

            <div className="flex gap-3">

              {editMode && (
                <button
                  type="button"
                  onClick={handleDiscard}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg border border-[#dedce9] bg-white px-5 py-3 text-xs font-medium text-[#303447] transition hover:bg-[#f4f3fa]"
                >
                  <X size={14} />
                  Cancel
                </button>
              )}

              {!editMode && (
                <button
                  type="button"
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-xs font-semibold text-indigo-700 shadow-xs transition hover:bg-indigo-100"
                  title="View and share your interview QR pass"
                >
                  <QrCode size={14} />
                  <span>Interview Pass / QR</span>
                </button>
              )}

              {!editMode ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(true);
                    setError("");
                    setSuccess("");
                  }}
                  className="flex items-center gap-2 rounded-lg bg-[#4338d5] px-5 py-3 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(67,56,213,0.22)] transition hover:bg-[#3529bd]"
                >
                  <Pencil size={14} />
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-[#4338d5] px-5 py-3 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(67,56,213,0.22)] transition hover:bg-[#3529bd] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      Save Changes
                    </>
                  )}
                </button>
              )}

            </div>

          </div>

          {/* SUCCESS */}

          {success && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
              <Check size={16} />
              {success}
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <section className="mb-6 overflow-hidden rounded-2xl border border-[#e8e6f0] bg-white shadow-[0_4px_18px_rgba(30,25,90,0.04)]">

            {/* COVER */}

            <div className="h-32 bg-gradient-to-r from-[#eeeaff] via-[#e7e5ff] to-[#e5eaff]" />

            <div className="px-6 pb-6 sm:px-8">

              <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end">

                {/* PROFILE IMAGE */}

                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#e5e1ff] shadow-md">

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound
                      size={44}
                      className="text-[#5545d9]"
                    />
                  )}

                </div>

                {/* BASIC INFO */}

                <div className="pb-1">

                  <h2 className="text-2xl font-semibold text-[#14172a]">
                    {profile?.first_name || ""}
                    {" "}
                    {profile?.last_name || ""}
                  </h2>

                  <p className="mt-1 text-sm text-[#686a78]">
                    {profile?.role || "Student"}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">

                    {profile?.department && (
                      <span className="rounded-full bg-[#eeeaff] px-3 py-1 text-[10px] font-medium text-[#4338d5]">
                        {profile.department}
                      </span>
                    )}

                    {profile?.college && (
                      <span className="rounded-full bg-[#f2f2f7] px-3 py-1 text-[10px] font-medium text-[#5f6172]">
                        {profile.college}
                      </span>
                    )}

                  </div>

                </div>

              </div>

              {/* CONTACT */}

              <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#eeeef4] pt-5 sm:grid-cols-2">

                <InfoItem
                  icon={<Mail size={16} />}
                  label="Email"
                  value={profile?.email}
                />

                <InfoItem
                  icon={<Phone size={16} />}
                  label="Mobile Number"
                  value={profile?.mobile_number}
                />

              </div>

            </div>

          </section>

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <section className="mb-6 overflow-hidden rounded-2xl border border-[#e8e6f0] bg-white">

            <SectionHeader
              icon={<UserRound size={18} />}
              title="Personal Information"
              description="Your basic account information."
            />

            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">

              <ReadOnlyField
                label="First Name"
                value={profile?.first_name}
              />

              <ReadOnlyField
                label="Last Name"
                value={profile?.last_name}
              />

              <ReadOnlyField
                label="Email"
                value={profile?.email}
              />

              <ReadOnlyField
                label="Mobile Number"
                value={profile?.mobile_number}
              />

            </div>

          </section>

          {/* =================================================
              ACADEMIC INFORMATION
          ================================================= */}

          <section className="mb-6 overflow-hidden rounded-2xl border border-[#e8e6f0] bg-white">

            <SectionHeader
              icon={<GraduationCap size={18} />}
              title="Academic Information"
              description="Your academic details."
            />

            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">

              <ReadOnlyField
                label="College"
                value={profile?.college}
                icon={<Building2 size={15} />}
              />

              <ReadOnlyField
                label="Department"
                value={profile?.department}
              />

              <EditableField
                label="PRN Number"
                value={prnNumber}
                setValue={setPrnNumber}
                editable={editMode}
                placeholder="Enter PRN number"
              />

              <EditableField
                label="Graduation Year"
                value={graduationYear}
                setValue={setGraduationYear}
                editable={editMode}
                type="number"
                placeholder="2027"
              />

              <EditableField
                label="CGPA"
                value={cgpa}
                setValue={setCgpa}
                editable={editMode}
                type="number"
                step="0.01"
                min="0"
                max="10"
                placeholder="8.50"
              />

            </div>

          </section>

          {/* =================================================
              SKILLS
          ================================================= */}

          <section className="mb-6 overflow-hidden rounded-2xl border border-[#e8e6f0] bg-white">

            <div className="flex items-center justify-between border-b border-[#eeeef4] p-5 sm:p-6">

              <div>

                <h3 className="text-sm font-semibold text-[#181b2e]">
                  Skills
                </h3>

                <p className="mt-1 text-[10px] text-[#77798a]">
                  Add your technical and professional skills.
                </p>

              </div>

              {editMode && (
                <button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center gap-1.5 rounded-lg bg-[#eeeaff] px-3 py-2 text-xs font-medium text-[#4338d5] transition hover:bg-[#e3e0ff]"
                >
                  <Plus size={14} />
                  Add Skill
                </button>
              )}

            </div>

            <div className="p-6">

              {editMode ? (
                <div className="space-y-3">

                  {skills.length === 0 && (
                    <p className="text-xs text-[#77798a]">
                      No skills added. Click "Add Skill".
                    </p>
                  )}

                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex gap-2"
                    >

                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Enter skill"
                        className="min-w-0 flex-1 rounded-lg border border-[#dedce8] bg-[#faf9ff] px-3 py-2.5 text-xs text-[#303447] outline-none transition focus:border-[#4938e2] focus:ring-2 focus:ring-[#4938e2]/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeSkill(index)
                        }
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                      >
                        <X size={15} />
                      </button>

                    </div>
                  ))}

                </div>
              ) : (
                <>
                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">

                      {skills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-full bg-[#eeeaff] px-4 py-2 text-xs font-medium text-[#4338d5]"
                        >
                          {skill}
                        </span>
                      ))}

                    </div>
                  ) : (
                    <p className="text-xs text-[#77798a]">
                      No skills added yet.
                    </p>
                  )}
                </>
              )}

            </div>

          </section>

          {/* =================================================
              PROFESSIONAL LINKS
          ================================================= */}

          <section className="mb-6 overflow-hidden rounded-2xl border border-[#e8e6f0] bg-white">

            <SectionHeader
              icon={<Globe size={18} />}
              title="Professional Links"
              description="Add your professional online profiles."
            />

            <div className="grid grid-cols-1 gap-5 p-6">

              <SocialField
                label="LinkedIn"
                value={linkedin}
                setValue={setLinkedin}
                editable={editMode}
                placeholder="https://linkedin.com/in/username"
              />

              <SocialField
                label="GitHub"
                value={github}
                setValue={setGithub}
                editable={editMode}
                placeholder="https://github.com/username"
              />

              <SocialField
                label="Portfolio"
                value={portfolio}
                setValue={setPortfolio}
                editable={editMode}
                placeholder="https://yourportfolio.com"
              />

            </div>

          </section>

          {/* =================================================
              BOTTOM ACTIONS
          ================================================= */}

          {editMode && (
            <div className="flex justify-end gap-3 border-t border-[#e8e6f0] pt-6">

              <button
                type="button"
                onClick={handleDiscard}
                disabled={saving}
                className="rounded-lg border border-[#dedce9] bg-white px-5 py-3 text-xs font-medium text-[#303447] transition hover:bg-[#f4f3fa]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#4338d5] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#3529bd] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Save Changes
                  </>
                )}
              </button>

            </div>
          )}

        </main>

      </div>

      {showShareModal && (
        <ShareVerificationModal
          student={profile}
          type="STUDENT"
          onClose={() => setShowShareModal(false)}
        />
      )}

    </div>
  );
}

// =========================================================
// INFO ITEM
// =========================================================

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#faf9ff] px-4 py-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eeeaff] text-[#5141d8]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[9px] uppercase tracking-wide text-[#999aaa]">
          {label}
        </p>

        <p className="mt-0.5 break-words text-xs font-medium text-[#303447]">
          {value || "Not available"}
        </p>

      </div>

    </div>
  );
}

// =========================================================
// READ ONLY FIELD
// =========================================================

function ReadOnlyField({
  label,
  value,
  icon,
}) {
  return (
    <div>

      <label className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-[#77798a]">
        {icon}
        {label}
      </label>

      <div className="mt-2 rounded-lg border border-[#eeeef4] bg-[#faf9ff] px-3 py-3 text-xs text-[#303447]">
        {value || "Not available"}
      </div>

    </div>
  );
}

// =========================================================
// EDITABLE FIELD
// =========================================================

function EditableField({
  label,
  value,
  setValue,
  editable,
  type = "text",
  placeholder,
  step,
  min,
  max,
}) {
  return (
    <div>

      <label className="text-[10px] font-medium uppercase tracking-wide text-[#77798a]">
        {label}
      </label>

      {editable ? (
        <input
          type={type}
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
          className="mt-2 w-full rounded-lg border border-[#dedce8] bg-[#faf9ff] px-3 py-3 text-xs text-[#303447] outline-none transition focus:border-[#4938e2] focus:ring-2 focus:ring-[#4938e2]/10"
        />
      ) : (
        <div className="mt-2 rounded-lg border border-[#eeeef4] bg-[#faf9ff] px-3 py-3 text-xs text-[#303447]">
          {value || "Not available"}
        </div>
      )}

    </div>
  );
}

// =========================================================
// SOCIAL FIELD
// =========================================================

function SocialField({
  label,
  value,
  setValue,
  editable,
  placeholder,
}) {
  return (
    <div>

      <label className="text-[10px] font-medium uppercase tracking-wide text-[#77798a]">
        {label}
      </label>

      {editable ? (
        <input
          type="url"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder={placeholder}
          className="mt-2 w-full rounded-lg border border-[#dedce8] bg-[#faf9ff] px-3 py-3 text-xs text-[#303447] outline-none transition focus:border-[#4938e2] focus:ring-2 focus:ring-[#4938e2]/10"
        />
      ) : (
        <div className="mt-2 break-all rounded-lg border border-[#eeeef4] bg-[#faf9ff] px-3 py-3 text-xs text-[#424457]">
          {value || "Not added"}
        </div>
      )}

    </div>
  );
}

// =========================================================
// SECTION HEADER
// =========================================================

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#eeeef4] p-5 sm:p-6">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e7e5ff] text-[#5141d8]">
        {icon}
      </div>

      <div>

        <h3 className="text-sm font-semibold text-[#181b2e]">
          {title}
        </h3>

        <p className="mt-1 text-[10px] text-[#77798a]">
          {description}
        </p>

      </div>

    </div>
  );
}

export default Profile;