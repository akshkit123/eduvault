import {
  CloudUpload,
  Verified,
  FolderOpen,
  QrCode,
  Users,
} from "lucide-react";

const steps = [
  {
    number: "1",
    icon: CloudUpload,
    title: "Upload",
    description: "Upload certificates & records to your vault.",
  },
  {
    number: "2",
    icon: Verified,
    title: "Verify",
    description: "Get your academic records verified by authorized committees.",
  },
  {
    number: "3",
    icon: FolderOpen,
    title: "Showcase",
    description: "Catalog and showcase your verified projects & work history.",
  },
  {
    number: "4",
    icon: QrCode,
    title: "Share",
    description: "Share verified achievements using your QR profile.",
  },
  {
    number: "5",
    icon: Users,
    title: "Connect",
    description: "Connect with alumni and discover opportunities.",
  },
];

function Workflow() {
  return (
    <section
      id="workflow"
      className="w-full px-5 py-14 sm:px-8 lg:py-16"
    >
      <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[32px] bg-[#f0f2ff] p-8 md:p-12 lg:p-16">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

          <h2 className="text-3xl font-normal tracking-tight text-[#1b2235] md:text-4xl">
            How EduVault Works
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#686a78] sm:text-base">
            A seamless workflow from academic achievement to professional
            opportunity.
          </p>

        </div>

        {/* Workflow */}
        <div className="relative">

          {/* Connecting line - desktop */}
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-[2px] bg-[#d5d8e7] lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative z-10 flex flex-col items-center text-center"
                >

                  {/* Circle */}
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-white ${
                      index === 0
                        ? "border-2 border-[#3525cd]"
                        : "border-2 border-[#d9dce8]"
                    } shadow-sm`}
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className={
                        index === 0
                          ? "text-[#3525cd]"
                          : "text-[#686a78]"
                      }
                    />
                  </div>

                  {/* Step title */}
                  <h3 className="mt-4 text-sm font-bold text-[#1b2235]">
                    {step.number}. {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 max-w-[190px] text-xs leading-5 text-[#686a78] sm:text-sm">
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Workflow;