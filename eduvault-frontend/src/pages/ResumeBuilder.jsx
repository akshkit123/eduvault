import { useState } from "react";

import {
  Search,
  Bell,
  Moon,
  Download,
  Share2,
  Sparkles,
  UserRound,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  Eye,
  CheckCircle2,
  FileText,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

function ResumeBuilder() {
  /* =========================================================
     STATE
  ========================================================= */

  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const [personalOpen, setPersonalOpen] = useState(true);
  const [educationOpen, setEducationOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);

  const [zoom, setZoom] = useState(100);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Alex Sterling",
    email: "alex.sterling@example.com",
    linkedin: "linkedin.com/in/alexsterling",
    phone: "+1 555 123 4567",
    location: "San Francisco, CA",
    summary:
      "Software engineering student with strong problem-solving skills and experience building modern web and mobile applications.",
  });

  const [education, setEducation] = useState({
    degree: "Bachelor of Computer Science",
    university: "Stanford University",
    year: "2020 - 2024",
    description:
      "Focused on software engineering, data structures, databases and distributed systems.",
  });

  const [skills, setSkills] = useState([
    "React",
    "JavaScript",
    "Python",
    "Node.js",
    "Git",
    "SQL",
  ]);

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handlePersonalChange = (event) => {
    const { name, value } = event.target;

    setPersonalInfo((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEducationChange = (event) => {
    const { name, value } = event.target;

    setEducation((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const increaseZoom = () => {
    setZoom((previous) => Math.min(previous + 10, 130));
  };

  const decreaseZoom = () => {
    setZoom((previous) => Math.max(previous - 10, 70));
  };

  const handleDownload = () => {
    alert("PDF download will be connected to the backend later.");
  };

  const handleShare = () => {
    alert("Resume sharing link will be generated here.");
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#15182b]">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />


      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <div className="lg:ml-[280px]">

        {/* ===================================================
            TOPBAR
        ==================================================== */}

        <Topbar />


        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}

        <main>

          {/* =================================================
              HEADER
          ================================================== */}

          <section className="border-b border-indigo-100 bg-gradient-to-r from-white via-[#f5f4ff] to-[#e9eaff] px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-[1250px]">

              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                <div>

                  <h1 className="text-3xl font-bold tracking-tight text-[#11152a] sm:text-4xl">
                    Resume Builder
                  </h1>

                  <p className="mt-2 max-w-[650px] text-sm leading-6 text-[#55596d]">
                    Create a professional resume automatically using your
                    verified academic and professional records.
                  </p>

                </div>


                {/* AUTO SYNC */}

                <div
                  className="
                    flex
                    w-fit
                    items-center
                    gap-2
                    rounded-full
                    bg-white/70
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-slate-700
                    shadow-sm
                  "
                >

                  <Sparkles
                    size={15}
                    className="text-indigo-600"
                  />

                  Auto-sync active

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              MAIN BUILDER
          ================================================== */}

          <section className="px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-[1250px]">

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[225px_minmax(0,1fr)]">


                {/* =================================================
                    LEFT PANEL
                ================================================== */}

                <aside className="space-y-5">


                  {/* ============================
                      TEMPLATES
                  ============================= */}

                  <div>

                    <div className="mb-4 flex items-center justify-between">

                      <h2 className="text-lg font-bold text-slate-900">
                        Templates
                      </h2>

                      <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                        View All
                      </button>

                    </div>


                    <div className="grid grid-cols-2 gap-3 xl:grid-cols-1">


                      {/* MODERN */}

                      <button
                        type="button"
                        onClick={() => setSelectedTemplate("modern")}
                        className={`
                          rounded-xl
                          border
                          bg-white
                          p-1
                          text-left
                          transition
                          ${
                            selectedTemplate === "modern"
                              ? "border-indigo-500 shadow-md shadow-indigo-100"
                              : "border-slate-200 hover:border-indigo-300"
                          }
                        `}
                      >

                        <div className="relative h-[180px] overflow-hidden rounded-lg bg-slate-100 p-3">

                          <div className="h-full rounded-sm border border-slate-300 bg-white p-3 shadow-sm">

                            <div className="mb-3 h-3 w-20 rounded bg-indigo-600" />

                            <div className="mb-1 h-1.5 w-24 rounded bg-slate-300" />

                            <div className="mb-4 h-1.5 w-16 rounded bg-slate-200" />

                            <div className="space-y-2">

                              <div className="h-1 w-full rounded bg-slate-200" />
                              <div className="h-1 w-5/6 rounded bg-slate-200" />
                              <div className="h-1 w-4/6 rounded bg-slate-200" />

                            </div>

                            <div className="mt-5 h-1.5 w-14 rounded bg-indigo-200" />

                            <div className="mt-2 space-y-1">

                              <div className="h-1 w-full rounded bg-slate-200" />
                              <div className="h-1 w-4/5 rounded bg-slate-200" />

                            </div>

                          </div>

                        </div>


                        <div className="px-2 py-2">

                          <p className="text-xs font-bold text-slate-800">
                            Modern
                          </p>

                          <p className="mt-0.5 text-[10px] text-indigo-600">
                            Active
                          </p>

                        </div>

                      </button>


                      {/* PROFESSIONAL */}

                      <button
                        type="button"
                        onClick={() => setSelectedTemplate("professional")}
                        className={`
                          rounded-xl
                          border
                          bg-white
                          p-1
                          text-left
                          transition
                          ${
                            selectedTemplate === "professional"
                              ? "border-indigo-500 shadow-md shadow-indigo-100"
                              : "border-slate-200 hover:border-indigo-300"
                          }
                        `}
                      >

                        <div className="relative h-[180px] overflow-hidden rounded-lg bg-slate-100 p-3">

                          <div className="h-full rounded-sm border border-slate-300 bg-white p-3 shadow-sm">

                            <div className="text-center">

                              <div className="mx-auto h-3 w-24 rounded bg-slate-700" />

                              <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-slate-300" />

                            </div>

                            <div className="mt-5 grid grid-cols-[1fr_1.6fr] gap-3">

                              <div className="space-y-2">

                                <div className="h-1.5 w-12 rounded bg-indigo-300" />

                                <div className="h-1 w-full rounded bg-slate-200" />
                                <div className="h-1 w-full rounded bg-slate-200" />
                                <div className="h-1 w-4/5 rounded bg-slate-200" />

                              </div>

                              <div className="space-y-2">

                                <div className="h-1.5 w-14 rounded bg-indigo-300" />

                                <div className="h-1 w-full rounded bg-slate-200" />
                                <div className="h-1 w-full rounded bg-slate-200" />
                                <div className="h-1 w-4/5 rounded bg-slate-200" />

                              </div>

                            </div>

                          </div>

                        </div>


                        <div className="px-2 py-2">

                          <p className="text-xs font-bold text-slate-800">
                            Professional
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-500">
                            Classic layout
                          </p>

                        </div>

                      </button>

                    </div>

                  </div>


                  {/* =================================================
                      PERSONAL INFORMATION
                  ================================================== */}

                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

                    <button
                      type="button"
                      onClick={() => setPersonalOpen(!personalOpen)}
                      className="flex w-full items-center justify-between px-4 py-3"
                    >

                      <span className="flex items-center gap-2 text-xs font-semibold text-indigo-700">

                        <UserRound size={15} />

                        Personal Information

                      </span>

                      {personalOpen ? (
                        <ChevronUp size={15} />
                      ) : (
                        <ChevronDown size={15} />
                      )}

                    </button>


                    {personalOpen && (

                      <div className="space-y-3 border-t border-slate-100 p-3">


                        {/* PROFILE */}

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-full
                              bg-indigo-100
                              text-indigo-600
                            "
                          >
                            <UserRound size={20} />
                          </div>

                          <button
                            type="button"
                            className="rounded-md bg-indigo-50 px-3 py-1.5 text-[10px] font-semibold text-indigo-600"
                          >
                            Change Photo
                          </button>

                        </div>


                        {/* NAME */}

                        <div>

                          <label className="text-[9px] font-semibold text-slate-500">
                            Full Name
                          </label>

                          <input
                            name="fullName"
                            value={personalInfo.fullName}
                            onChange={handlePersonalChange}
                            className="
                              mt-1
                              h-9
                              w-full
                              rounded-md
                              border
                              border-slate-200
                              bg-[#faf9ff]
                              px-2
                              text-xs
                              outline-none
                              focus:border-indigo-500
                            "
                          />

                        </div>


                        {/* EMAIL */}

                        <div>

                          <label className="text-[9px] font-semibold text-slate-500">
                            Email
                          </label>

                          <input
                            name="email"
                            value={personalInfo.email}
                            onChange={handlePersonalChange}
                            className="
                              mt-1
                              h-9
                              w-full
                              rounded-md
                              border
                              border-slate-200
                              bg-[#faf9ff]
                              px-2
                              text-xs
                              outline-none
                              focus:border-indigo-500
                            "
                          />

                        </div>


                        {/* LINKEDIN */}

                        <div>

                          <label className="text-[9px] font-semibold text-slate-500">
                            LinkedIn
                          </label>

                          <input
                            name="linkedin"
                            value={personalInfo.linkedin}
                            onChange={handlePersonalChange}
                            className="
                              mt-1
                              h-9
                              w-full
                              rounded-md
                              border
                              border-slate-200
                              bg-[#faf9ff]
                              px-2
                              text-xs
                              outline-none
                              focus:border-indigo-500
                            "
                          />

                        </div>

                      </div>

                    )}

                  </div>


                  {/* =================================================
                      EDUCATION
                  ================================================== */}

                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

                    <button
                      type="button"
                      onClick={() => setEducationOpen(!educationOpen)}
                      className="flex w-full items-center justify-between px-4 py-3"
                    >

                      <span className="flex items-center gap-2 text-xs font-semibold text-indigo-700">

                        <GraduationCap size={15} />

                        Education

                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[8px] font-bold text-green-600">
                          Synced
                        </span>

                      </span>

                      {educationOpen ? (
                        <ChevronUp size={15} />
                      ) : (
                        <ChevronDown size={15} />
                      )}

                    </button>


                    {educationOpen && (

                      <div className="space-y-3 border-t border-slate-100 p-3">

                        <input
                          name="degree"
                          value={education.degree}
                          onChange={handleEducationChange}
                          placeholder="Degree"
                          className="h-9 w-full rounded-md border border-slate-200 bg-[#faf9ff] px-2 text-xs outline-none focus:border-indigo-500"
                        />

                        <input
                          name="university"
                          value={education.university}
                          onChange={handleEducationChange}
                          placeholder="University"
                          className="h-9 w-full rounded-md border border-slate-200 bg-[#faf9ff] px-2 text-xs outline-none focus:border-indigo-500"
                        />

                        <input
                          name="year"
                          value={education.year}
                          onChange={handleEducationChange}
                          placeholder="Year"
                          className="h-9 w-full rounded-md border border-slate-200 bg-[#faf9ff] px-2 text-xs outline-none focus:border-indigo-500"
                        />

                      </div>

                    )}

                  </div>


                  {/* =================================================
                      SKILLS
                  ================================================== */}

                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

                    <button
                      type="button"
                      onClick={() => setSkillsOpen(!skillsOpen)}
                      className="flex w-full items-center justify-between px-4 py-3"
                    >

                      <span className="flex items-center gap-2 text-xs font-semibold text-indigo-700">

                        <Award size={15} />

                        Skills

                      </span>

                      {skillsOpen ? (
                        <ChevronUp size={15} />
                      ) : (
                        <ChevronDown size={15} />
                      )}

                    </button>


                    {skillsOpen && (

                      <div className="border-t border-slate-100 p-3">

                        <div className="flex flex-wrap gap-2">

                          {skills.map((skill) => (

                            <span
                              key={skill}
                              className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600"
                            >
                              {skill}
                            </span>

                          ))}

                        </div>

                      </div>

                    )}

                  </div>

                </aside>


                {/* =================================================
                    RIGHT CONTENT
                ================================================== */}

                <div className="min-w-0">


                  {/* =================================================
                      PREVIEW TOOLBAR
                  ================================================== */}

                  <div className="flex flex-col justify-between gap-3 rounded-t-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center">

                    <div className="flex items-center gap-4">

                      <button
                        type="button"
                        onClick={decreaseZoom}
                        className="text-slate-600 hover:text-indigo-600"
                      >
                        <ZoomOut size={17} />
                      </button>

                      <span className="text-xs font-semibold text-slate-700">
                        {zoom}%
                      </span>

                      <button
                        type="button"
                        onClick={increaseZoom}
                        className="text-slate-600 hover:text-indigo-600"
                      >
                        <ZoomIn size={17} />
                      </button>

                    </div>


                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={handleShare}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-lg
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-indigo-600
                          hover:bg-indigo-50
                        "
                      >

                        <Share2 size={14} />

                        Share

                      </button>


                      <button
                        type="button"
                        onClick={handleDownload}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-lg
                          bg-indigo-600
                          px-4
                          py-2
                          text-xs
                          font-semibold
                          text-white
                          shadow-md
                          shadow-indigo-200
                          transition
                          hover:bg-indigo-700
                        "
                      >

                        <Download size={14} />

                        Download PDF

                      </button>

                    </div>

                  </div>


                  {/* =================================================
                      RESUME PREVIEW
                  ================================================== */}

                  <div className="overflow-auto rounded-b-xl border-x border-b border-slate-200 bg-[#eeeeF7] p-4 sm:p-6">

                    <div
                      className="mx-auto origin-top rounded-lg bg-white shadow-xl transition-transform"
                      style={{
                        width: `${8.27 * (zoom / 100)}in`,
                        minHeight: `${11.69 * (zoom / 100)}in`,
                        maxWidth: "100%",
                      }}
                    >

                      <div className="p-8 sm:p-10">


                        {/* =================================================
                            RESUME HEADER
                        ================================================== */}

                        <div className="border-b-2 border-indigo-600 pb-5">

                          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            {personalInfo.fullName}
                          </h1>

                          <p className="mt-1 text-sm font-medium text-indigo-600">
                            Software Engineer
                          </p>

                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[9px] text-slate-500">

                            <span>
                              {personalInfo.email}
                            </span>

                            <span>
                              {personalInfo.phone}
                            </span>

                            <span>
                              {personalInfo.location}
                            </span>

                          </div>

                          <p className="mt-1 text-[9px] text-slate-500">
                            {personalInfo.linkedin}
                          </p>

                        </div>


                        {/* =================================================
                            PROFESSIONAL SUMMARY
                        ================================================== */}

                        <ResumeSection title="Professional Summary">

                          <p className="text-[10px] leading-5 text-slate-600">
                            {personalInfo.summary}
                          </p>

                        </ResumeSection>


                        {/* =================================================
                            EXPERIENCE
                        ================================================== */}

                        <ResumeSection title="Experience">

                          <div>

                            <div className="flex justify-between gap-4">

                              <div>

                                <h3 className="text-xs font-bold text-slate-800">
                                  Software Engineer Intern
                                </h3>

                                <p className="text-[10px] font-medium text-indigo-600">
                                  Stark Industries
                                </p>

                              </div>

                              <span className="text-[9px] text-slate-400">
                                May 2023 - Aug 2023
                              </span>

                            </div>


                            <ul className="mt-2 space-y-1 pl-3 text-[9px] leading-4 text-slate-600">

                              <li>
                                • Developed and maintained internal dashboard
                                features using React and TypeScript.
                              </li>

                              <li>
                                • Collaborated with backend engineers to
                                integrate RESTful APIs.
                              </li>

                              <li>
                                • Participated in Agile development and sprint
                                planning.
                              </li>

                            </ul>

                          </div>

                        </ResumeSection>


                        {/* =================================================
                            EDUCATION
                        ================================================== */}

                        <ResumeSection title="Education">

                          <div className="flex justify-between gap-4">

                            <div>

                              <h3 className="text-xs font-bold text-slate-800">
                                {education.degree}
                              </h3>

                              <p className="text-[10px] text-indigo-600">
                                {education.university}
                              </p>

                            </div>

                            <span className="text-[9px] text-slate-400">
                              {education.year}
                            </span>

                          </div>

                          <p className="mt-2 text-[9px] leading-4 text-slate-600">
                            {education.description}
                          </p>

                        </ResumeSection>


                        {/* =================================================
                            PROJECTS
                        ================================================== */}

                        <ResumeSection title="Projects">

                          <div className="space-y-3">

                            <div>

                              <h3 className="text-xs font-bold text-slate-800">
                                EduVault
                              </h3>

                              <p className="mt-1 text-[9px] leading-4 text-slate-600">
                                Digital credential platform for securely
                                managing certificates, projects, internships
                                and academic achievements.
                              </p>

                            </div>

                            <div>

                              <h3 className="text-xs font-bold text-slate-800">
                                Smart Campus App
                              </h3>

                              <p className="mt-1 text-[9px] leading-4 text-slate-600">
                                Cross-platform mobile application designed
                                to assist students with campus services.
                              </p>

                            </div>

                          </div>

                        </ResumeSection>


                        {/* =================================================
                            SKILLS
                        ================================================== */}

                        <ResumeSection title="Skills">

                          <div className="flex flex-wrap gap-2">

                            {skills.map((skill) => (

                              <span
                                key={skill}
                                className="rounded bg-indigo-50 px-2 py-1 text-[9px] font-semibold text-indigo-700"
                              >
                                {skill}
                              </span>

                            ))}

                          </div>

                        </ResumeSection>

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      SCORE + AI SUGGESTIONS
                  ================================================== */}

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[190px_1fr]">


                    {/* SCORE */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5">

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border-4
                            border-indigo-600
                            text-sm
                            font-bold
                            text-indigo-600
                          "
                        >
                          85
                        </div>

                        <div>

                          <p className="text-xs font-bold text-slate-900">
                            Resume Score
                          </p>

                          <p className="mt-1 text-[9px] text-slate-500">
                            Looking good! Mostly ATS friendly.
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* AI SUGGESTIONS */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5">

                      <div className="flex gap-3">

                        <Sparkles
                          size={16}
                          className="mt-0.5 shrink-0 text-indigo-600"
                        />

                        <div>

                          <p className="text-xs font-bold text-indigo-700">
                            AI Suggestions
                          </p>

                          <p className="mt-1 text-[10px] font-medium text-slate-500">
                            Consider adding
                          </p>

                          <p className="mt-1 text-xs font-bold text-slate-800">
                            System Architecture
                          </p>

                          <p className="mt-1 max-w-[500px] text-[10px] leading-4 text-slate-500">
                            Based on your recent project experience, adding
                            system architecture skills could strengthen your
                            resume and improve your technical profile.
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}


/* =========================================================
   RESUME SECTION COMPONENT
========================================================= */

function ResumeSection({ title, children }) {
  return (
    <section className="mt-6">

      <h2 className="mb-2 border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
        {title}
      </h2>

      {children}

    </section>
  );
}


export default ResumeBuilder;