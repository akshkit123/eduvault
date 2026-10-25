import { useState } from "react";

import {
  Award,
  TrendingUp,
  ShieldCheck,
  Filter,
  Share2,
  Eye,
  FileBadge,
  ChevronDown,
  CheckCircle2,
  Star,
  Brain,
  Cloud,
  Users,
  Code2,
  Trophy,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

function Achievements() {
  const [showAll, setShowAll] = useState(false);

  const achievements = [
    {
      id: 1,
      title: "Global Hackathon Winner",
      organization: "Tech Innovations Summit 2024",
      description:
        "Awarded 1st place among 500+ competing teams for developing an AI-driven accessibility tool. Demonstrated exceptional problem-solving, rapid prototyping, and full-stack development skills under intense pressure.",
      tags: [
        "AI Development",
        "Leadership",
        "Full-Stack",
      ],
      date: "May 2024",
      type: "certificate",
      icon: Trophy,
    },
    {
      id: 2,
      title: "Dean's List - Highest Honors",
      organization: "College of Engineering & Computer Science",
      description:
        "Maintained a 4.0 GPA across all advanced engineering and computational mathematics courses for three consecutive semesters. Recognized for academic excellence and peer mentorship.",
      tags: [
        "Academic Excellence",
        "Computational Math",
        "Mentorship",
      ],
      date: "Jan 2024",
      type: "letter",
      icon: Award,
    },
    {
      id: 3,
      title: "Outstanding Technical Achievement",
      organization: "Annual Technology Excellence Awards",
      description:
        "Recognized for outstanding contribution to software development and innovative technology solutions.",
      tags: [
        "Software Engineering",
        "Innovation",
        "Problem Solving",
      ],
      date: "Nov 2023",
      type: "certificate",
      icon: Star,
    },
  ];

  const visibleAchievements = showAll
    ? achievements
    : achievements.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f8f8ff] text-[#15182b]">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />


      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <div className="lg:ml-[280px]">

        {/* =================================================
            TOPBAR
        ================================================== */}

        <Topbar />


        {/* =================================================
            PAGE CONTENT
        ================================================== */}

        <main className="px-4 py-6 sm:px-6 lg:px-7">

          <div className="mx-auto max-w-[1250px]">

            {/* =================================================
                STATISTICS
            ================================================== */}

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* Total Honors */}

              <StatCard
                icon={<Trophy size={18} />}
                title="Total Honors"
                value="14"
                subtitle="+2 this semester"
                positive
              />


              {/* Global Rank */}

              <StatCard
                icon={<TrendingUp size={18} />}
                title="Global Rank"
                value="Top 5%"
                subtitle="Among engineering peers"
              />


              {/* Badges Earned */}

              <StatCard
                icon={<ShieldCheck size={18} />}
                title="Badges Earned"
                value="28"
                subtitle="3 specialized tracks"
              />


              {/* Verified */}

              <div
                className="
                  rounded-xl
                  border
                  border-indigo-100
                  bg-gradient-to-br
                  from-white
                  to-indigo-50
                  p-5
                  shadow-[0_4px_18px_rgba(50,40,150,0.04)]
                "
              >

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <ShieldCheck size={17} />
                  </div>

                  <p className="text-xs font-medium text-slate-500">
                    Verified
                  </p>

                </div>


                <p className="mt-3 text-xl font-bold text-slate-900">
                  12
                </p>

                <p className="mt-1 text-xs font-medium text-indigo-600">
                  100% authenticity score
                </p>

              </div>

            </section>


            {/* =================================================
                MAIN GRID
            ================================================== */}

            <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">


              {/* =================================================
                  LEFT COLUMN
              ================================================== */}

              <div>

                {/* =================================================
                    HALL OF FAME HEADER
                ================================================== */}

                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                  <div>

                    <h1 className="text-2xl font-bold tracking-tight text-[#11152a] sm:text-3xl">
                      Hall of Fame
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                      Your verified academic and professional achievements.
                    </p>

                  </div>


                  <button
                    type="button"
                    className="
                      flex
                      w-fit
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-indigo-600
                      bg-white
                      px-4
                      py-2.5
                      text-xs
                      font-semibold
                      text-indigo-600
                      transition
                      hover:bg-indigo-50
                    "
                  >
                    <Filter size={14} />
                    Filter
                  </button>

                </div>


                {/* =================================================
                    ACHIEVEMENTS
                ================================================== */}

                <div className="space-y-4">

                  {visibleAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                    />
                  ))}

                </div>


                {/* =================================================
                    LOAD MORE
                ================================================== */}

                <div className="mt-7 flex justify-center">

                  <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-xs
                      font-semibold
                      text-indigo-600
                      transition
                      hover:text-indigo-800
                    "
                  >

                    {showAll
                      ? "Show Less"
                      : "Load More Achievements"}

                    <ChevronDown
                      size={14}
                      className={showAll ? "rotate-180" : ""}
                    />

                  </button>

                </div>

              </div>


              {/* =================================================
                  RIGHT COLUMN
              ================================================== */}

              <div className="space-y-6">


                {/* =================================================
                    SKILLS SPOTLIGHT
                ================================================== */}

                <section
                  className="
                    rounded-xl
                    border
                    border-indigo-100
                    bg-white
                    p-5
                    shadow-[0_5px_22px_rgba(50,40,150,0.05)]
                  "
                >

                  <h2 className="text-sm font-semibold text-slate-900">
                    Skills Spotlight
                  </h2>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Competency growth based on verified honors.
                  </p>


                  <div className="mt-5 space-y-4">

                    <SkillProgress
                      name="Problem Solving"
                      percentage={92}
                    />

                    <SkillProgress
                      name="Teamwork"
                      percentage={88}
                    />

                    <SkillProgress
                      name="Leadership"
                      percentage={75}
                    />

                    <SkillProgress
                      name="System Architecture"
                      percentage={60}
                    />

                  </div>


                  <div className="mt-6 border-t border-slate-100 pt-4">

                    <button
                      type="button"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      View Detailed Analysis →
                    </button>

                  </div>

                </section>


                {/* =================================================
                    RECENT BADGES
                ================================================== */}

                <section
                  className="
                    rounded-xl
                    border
                    border-indigo-100
                    bg-white
                    p-5
                    shadow-[0_5px_22px_rgba(50,40,150,0.05)]
                  "
                >

                  <h2 className="text-sm font-semibold text-slate-900">
                    Recent Badges
                  </h2>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Newly earned digital credentials.
                  </p>


                  <div className="mt-5 grid grid-cols-3 gap-3">

                    <BadgeItem
                      icon={<ShieldCheck size={30} />}
                      title="Cyber Security"
                    />

                    <BadgeItem
                      icon={<Brain size={30} />}
                      title="Innovation Thinker"
                    />

                    <BadgeItem
                      icon={<Cloud size={30} />}
                      title="Cloud Architect"
                    />

                    <BadgeItem
                      icon={<Users size={30} />}
                      title="Agile Leader"
                    />

                  </div>

                </section>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  title,
  value,
  subtitle,
  positive,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-indigo-100
        bg-white
        p-5
        shadow-[0_4px_18px_rgba(50,40,150,0.04)]
      "
    >

      <div className="flex items-center gap-2">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <p className="text-xs font-medium text-slate-500">
          {title}
        </p>

      </div>


      <p className="mt-3 text-xl font-bold text-slate-900">
        {value}
      </p>

      <p
        className={`mt-1 text-[10px] font-medium ${
          positive
            ? "text-indigo-600"
            : "text-slate-500"
        }`}
      >
        {subtitle}
      </p>

    </div>
  );
}


/* =========================================================
   ACHIEVEMENT CARD
========================================================= */

function AchievementCard({ achievement }) {
  const Icon = achievement.icon;

  return (
    <article
      className="
        overflow-hidden
        rounded-xl
        border
        border-indigo-100
        bg-white
        shadow-[0_4px_18px_rgba(50,40,150,0.04)]
        transition
        hover:-translate-y-[1px]
        hover:shadow-[0_8px_25px_rgba(50,40,150,0.08)]
      "
    >

      <div className="p-5">

        {/* =================================================
            TOP
        ================================================== */}

        <div className="flex gap-4">

          {/* Icon */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-indigo-50
              text-indigo-600
            "
          >
            <Icon size={22} strokeWidth={1.7} />
          </div>


          {/* Content */}

          <div className="min-w-0 flex-1">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

              <div>

                <h3 className="text-sm font-semibold text-slate-900">
                  {achievement.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {achievement.organization}
                </p>

              </div>


              {/* Verified */}

              <span
                className="
                  flex
                  w-fit
                  shrink-0
                  items-center
                  gap-1
                  rounded-full
                  bg-green-100
                  px-2.5
                  py-1
                  text-[9px]
                  font-semibold
                  text-green-700
                "
              >
                <CheckCircle2 size={11} />
                Verified Credential
              </span>

            </div>


            {/* Description */}

            <p className="mt-3 max-w-[700px] text-xs leading-5 text-slate-500">
              {achievement.description}
            </p>


            {/* Tags */}

            <div className="mt-3 flex flex-wrap gap-2">

              {achievement.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    bg-indigo-50
                    px-2.5
                    py-1
                    text-[9px]
                    font-medium
                    text-indigo-600
                  "
                >
                  {tag}
                </span>
              ))}

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          FOOTER
      ================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-t
          border-slate-100
          px-5
          py-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="
              flex
              items-center
              gap-1.5
              rounded-lg
              bg-indigo-600
              px-3
              py-2
              text-[10px]
              font-semibold
              text-white
              shadow-sm
              shadow-indigo-200
              transition
              hover:bg-indigo-700
            "
          >

            {achievement.type === "certificate" ? (
              <>
                <FileBadge size={13} />
                View Certificate
              </>
            ) : (
              <>
                <Eye size={13} />
                View Letter
              </>
            )}

          </button>


          <button
            type="button"
            className="
              flex
              items-center
              gap-1.5
              px-2
              py-2
              text-[10px]
              font-medium
              text-slate-500
              transition
              hover:text-indigo-600
            "
          >
            <Share2 size={13} />
            Share
          </button>

        </div>


        <span className="text-[10px] text-slate-400">
          Issued: {achievement.date}
        </span>

      </div>

    </article>
  );
}


/* =========================================================
   SKILL PROGRESS
========================================================= */

function SkillProgress({ name, percentage }) {
  return (
    <div>

      <div className="mb-1.5 flex items-center justify-between">

        <span className="text-[10px] font-medium text-slate-700">
          {name}
        </span>

        <span className="text-[10px] font-medium text-indigo-600">
          {percentage}%
        </span>

      </div>


      <div className="h-1.5 overflow-hidden rounded-full bg-indigo-50">

        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}


/* =========================================================
   BADGE ITEM
========================================================= */

function BadgeItem({ icon, title }) {
  return (
    <div className="text-center">

      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-lg
          border
          border-slate-100
          bg-gradient-to-br
          from-indigo-50
          to-slate-50
          text-indigo-500
          shadow-sm
        "
      >
        {icon}
      </div>

      <p className="mt-2 text-[9px] font-medium leading-3 text-slate-700">
        {title}
      </p>

    </div>
  );
}

export default Achievements;