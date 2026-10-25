import {
  Share2,
  Mail,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-[#e9edff]">

      {/* Main footer */}
      <div className="mx-auto w-full max-w-[1280px] px-5 py-12 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}
          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3525cd] text-sm font-bold text-white">
                E
              </div>

              <span className="text-lg font-semibold text-[#1b2235]">
                EduVault
              </span>

            </div>

            <p className="mt-4 max-w-[230px] text-xs leading-5 text-[#686a78]">
              Securing academic excellence and bridging the gap to
              professional success.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">

              <button
                type="button"
                aria-label="Share"
                className="flex h-8 w-8 items-center justify-center text-[#5d6170] transition hover:text-[#3525cd]"
              >
                <Share2 size={16} />
              </button>

              <button
                type="button"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center text-[#5d6170] transition hover:text-[#3525cd]"
              >
                <Mail size={16} />
              </button>

              <button
                type="button"
                aria-label="Website"
                className="flex h-8 w-8 items-center justify-center text-[#5d6170] transition hover:text-[#3525cd]"
              >
                <Globe size={16} />
              </button>

            </div>

          </div>

          {/* ================= PRODUCT ================= */}
          <div>

            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3d4252]">
              Product
            </h3>

            <ul className="mt-4 space-y-3">

              <li>
                <a
                  href="#features"
                  className="text-xs text-[#686a78] transition hover:text-[#3525cd]"
                >
                  Digital Locker
                </a>
              </li>

              <li>
                <a
                  href="#workflow"
                  className="text-xs text-[#686a78] transition hover:text-[#3525cd]"
                >
                  Alumni Network
                </a>
              </li>

              <li>
                <a
                  href="#trust"
                  className="text-xs text-[#686a78] transition hover:text-[#3525cd]"
                >
                  Verification
                </a>
              </li>

            </ul>

          </div>

          {/* ================= COMPANY ================= */}
          <div>

            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3d4252]">
              Company
            </h3>

            <ul className="mt-4 space-y-3">

              <li>
                <a
                  href="#about"
                  className="text-xs text-[#686a78] transition hover:text-[#3525cd]"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#careers"
                  className="text-xs text-[#686a78] transition hover:text-[#3525cd]"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#privacy"
                  className="text-xs text-[#686a78] transition hover:text-[#3525cd]"
                >
                  Privacy Policy
                </a>
              </li>

            </ul>

          </div>

          {/* ================= CONTACT ================= */}
          <div>

            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3d4252]">
              Contact
            </h3>

            <div className="mt-4 space-y-3">

              <div className="flex items-start gap-2">

                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0 text-[#686a78]"
                />

                <p className="text-xs leading-5 text-[#686a78]">
                  123 Academic Way,
                  <br />
                  Tech City
                </p>

              </div>

              <div className="flex items-center gap-2">

                <Phone
                  size={14}
                  className="shrink-0 text-[#686a78]"
                />

                <p className="text-xs text-[#686a78]">
                  +1 (555) EDU-VAULT
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-[#d7dcef]">

        <div className="mx-auto flex min-h-[58px] w-full max-w-[1280px] items-center justify-center px-5">

          <p className="text-[10px] text-[#686a78]">
            © 2024 EduVault. Built for the future of education.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;