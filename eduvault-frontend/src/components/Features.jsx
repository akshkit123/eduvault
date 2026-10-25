import {
  Archive,
  BadgeCheck,
  FolderOpen,
  BriefcaseBusiness,
  Users,
  QrCode,
} from "lucide-react";

const features = [
  {
    icon: Archive,
    title: "Digital Locker",
    description:
      "Securely store all your academic documents, certificates, and achievements in one centralized, encrypted vault.",
    color: "bg-[#e4e0ff]",
    iconColor: "text-[#4030d8]",
    circle: "bg-[#f1efff]",
  },
  {
    icon: BadgeCheck,
    title: "Instant Verification",
    description:
      "Blockchain-backed verification ensures your credentials are tamper-proof and instantly verifiable by employers.",
    color: "bg-[#eadcff]",
    iconColor: "text-[#7435db]",
    circle: "bg-[#f5efff]",
  },
  {
    icon: FolderOpen,
    title: "Project Showcase",
    description:
      "Catalog your verified academic coursework, repositories, hackathon builds, and research lab projects.",
    color: "bg-[#e5e5e5]",
    iconColor: "text-[#454545]",
    circle: "bg-[#f4f4f4]",
  },
  {
    icon: BriefcaseBusiness,
    title: "Internship Tracking",
    description:
      "Log internship experiences, request mentor evaluations, and build a verifiable work history timeline.",
    color: "bg-[#e4e0ff]",
    iconColor: "text-[#4030d8]",
    circle: "bg-[#f1efff]",
  },
  {
    icon: Users,
    title: "Alumni Network",
    description:
      "Connect with verified alumni from your institution for mentorship, referrals, and career guidance.",
    color: "bg-[#eadcff]",
    iconColor: "text-[#7435db]",
    circle: "bg-[#f5efff]",
  },
  {
    icon: QrCode,
    title: "QR Code Portfolios",
    description:
      "Share your entire verified academic profile with a single dynamic QR code on your resume or business card.",
    color: "bg-[#e4e7ff]",
    iconColor: "text-[#4030d8]",
    circle: "bg-[#f1f3ff]",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="w-full bg-[#faf8ff] px-5 pb-20 pt-14 sm:px-8 lg:pb-24 lg:pt-14"
    >
      <div className="mx-auto w-full max-w-[1280px]">

        {/* ================= HEADING ================= */}
        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-[30px] font-normal leading-[1.15] tracking-tight text-[#1b2235] sm:text-[36px]">
            Everything you need to build a verifiable
            <br className="hidden sm:block" />
            future.
          </h2>

          <p className="mx-auto mt-5 max-w-[650px] text-[14px] leading-[1.5] text-[#686a78] sm:text-[15px]">
            A comprehensive suite of tools designed for students,
            institutions, and recruiters to streamline the
            academic-to-professional journey.
          </p>

        </div>

        {/* ================= FEATURE GRID ================= */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="relative h-[205px] overflow-hidden rounded-[14px] border border-[#e3e2eb] bg-white px-7 py-7"
              >

                {/* Decorative circle */}
                <div
                  className={`absolute -right-12 -top-12 h-40 w-40 rounded-full ${feature.circle}`}
                />

                {/* Icon */}
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-[9px] ${feature.color} ${feature.iconColor}`}
                >
                  <Icon
                    size={20}
                    strokeWidth={1.9}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-5">

                  <h3 className="text-[14px] font-medium leading-5 text-[#1d2437]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-[290px] text-[14px] leading-[1.45] text-[#686a78]">
                    {feature.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;