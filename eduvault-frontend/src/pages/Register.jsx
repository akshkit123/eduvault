import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  User,
  Mail,
  Phone,
  Building2,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/authApi";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("Student");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


 const handleRegister = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  // Check passwords
  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  const roleMap = {
    "Student": "STUDENT",
    "Alumni": "ALUMNI",
    "Committee": "COMMITTEE",
    "Placement Team": "PLACEMENT",
  };

  const registerData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    mobile_number: mobileNumber,
    college: college,
    department: department,
    role: roleMap[role] || "STUDENT",
    password: password,
    confirm_password: confirmPassword,
  };

  try {
    const data = await registerUser(registerData);

    console.log("Registration response:", data);

    setSuccess("Account created successfully!");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);

  } catch (error) {
    console.error("Registration error:", error);

    setError(
      error.message || "Something went wrong."
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e]">

      {/* =====================================================
          TOP BAR
      ====================================================== */}

      <header className="flex h-[70px] items-center justify-between px-8 sm:px-10 lg:px-12">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-2">

          <img
            src="/images/eduvault-logo.png"
            alt="EduVault"
            className="h-9 w-9 object-contain"
          />

          <span className="text-xl font-semibold text-[#3525cd]">
            EduVault
          </span>

        </Link>


        {/* Back */}

        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-medium text-[#55586a] transition hover:text-[#3525cd] sm:text-sm"
        >
          <ArrowLeft size={14} />
          Back to Site
        </Link>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto grid min-h-[calc(100vh-70px)] w-full max-w-[1200px] grid-cols-1 lg:grid-cols-[54%_46%]">


        {/* =================================================
            LEFT — FORM
        ================================================== */}

        <section className="flex items-start justify-center px-8 pb-10 pt-10 sm:px-12 lg:px-12 xl:px-16">

          <div className="w-full max-w-[400px]">


            {/* Heading */}

            <div className="mb-7">

              <h1 className="text-[34px] font-semibold leading-[1.05] tracking-tight text-[#10162a]">
                Create Your
                <br />
                EduVault Account
              </h1>

              <p className="mt-4 max-w-[390px] text-[14px] leading-5 text-[#686a78]">
                Start building your permanent academic and
                <br />
                professional identity.
              </p>

            </div>


            {/* =================================================
                FORM
            ================================================== */}

            <form onSubmit={handleRegister} className="space-y-3.5">


              {/* =================================================
                  FIRST NAME + LAST NAME
              ================================================== */}

              <div className="grid grid-cols-2 gap-4">

                <Input
                  icon={User}
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <Input
                  icon={User}
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

              </div>


              {/* =================================================
                  EMAIL + MOBILE NUMBER
              ================================================== */}

              <div className="grid grid-cols-2 gap-4">

                <Input
                  icon={Mail}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  icon={Phone}
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />

              </div>


              {/* =================================================
                  COLLEGE + DEPARTMENT
              ================================================== */}

              <div className="grid grid-cols-2 gap-4">

                <Input
                  icon={Building2}
                  placeholder="College Name"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />


                <div className="relative">

                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="h-10 w-full appearance-none rounded-md border border-transparent bg-[#e9edff] px-3 text-[13px] text-[#62677b] outline-none focus:border-[#4b35e8] focus:bg-white"
                  >

                    <option value="" disabled>
                      Department
                    </option>

                    <option>
                      Computer Science
                    </option>

                    <option>
                      Information Technology
                    </option>

                    <option>
                      Data Science
                    </option>

                    <option>
                      Management
                    </option>

                    <option>
                      Other
                    </option>

                  </select>


                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#62677b]"
                  />

                </div>

              </div>


              {/* =================================================
                  SELECT ROLE
              ================================================== */}

              <div className="pt-1">

                <p className="mb-2 text-[11px] font-medium text-[#404456]">
                  Select Role
                </p>


                <div className="grid grid-cols-2 gap-2">

                  {[
                    "Student",
                    "Alumni",
                    "Committee",
                    "Placement Team",
                  ].map((item) => (

                    <button
                      key={item}
                      type="button"
                      onClick={() => setRole(item)}
                      className={`h-10 rounded-md text-[13px] font-medium transition ${role === item
                        ? "bg-[#4b35e8] text-white shadow-[0_4px_10px_rgba(75,53,232,0.18)]"
                        : "bg-[#e9edff] text-[#62677b] hover:bg-[#dfe5ff]"
                        }`}
                    >
                      {item}
                    </button>

                  ))}

                </div>

              </div>


              {/* =================================================
                  PASSWORD + CONFIRM PASSWORD
              ================================================== */}

              <div className="grid grid-cols-2 gap-4">

                <PasswordInput
                  placeholder="Password"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />


                <PasswordInput
                  placeholder="Confirm Password"
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

              </div>


              {/* =================================================
                  TERMS
              ================================================== */}

              <label className="flex cursor-pointer items-center gap-2 pt-1 text-[11px] text-[#77798a]">

                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-[#4b35e8]"
                />

                <span>
                  I agree to the{" "}

                  <a
                    href="#"
                    className="font-semibold text-[#4b35e8] hover:underline"
                  >
                    Terms and Conditions
                  </a>

                </span>

              </label>


              {/* =================================================
                  CREATE ACCOUNT
              ================================================== */}

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-[12px] text-green-600">
                  {success}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#3525cd] text-[13px] font-semibold text-white shadow-[0_5px_12px_rgba(53,37,205,0.2)] transition hover:bg-[#2f21b9]"
              >

                {loading ? "Creating Account..." : "Create Account"}

                {!loading && <ArrowRight size={15} />}

              </button>

            </form>


            {/* =================================================
                LOGIN
            ================================================== */}

            <p className="mt-6 text-center text-[12px] text-[#77798a]">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#3525cd] hover:underline"
              >
                Login here
              </Link>

            </p>

          </div>

        </section>


        {/* =================================================
            RIGHT — STITCH STYLE ILLUSTRATION
        ================================================== */}

        <section className="relative hidden min-h-full overflow-hidden bg-[#eeeaff] lg:flex lg:items-center lg:justify-center">


          {/* Background */}

          <div className="absolute inset-0 bg-gradient-to-br from-[#f0efff] via-[#e9e5ff] to-[#ddd5ff]" />


          {/* Soft glow */}

          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9a9ff]/20 blur-3xl" />


          {/* =================================================
              ILLUSTRATION FRAME
          ================================================== */}

          <div className="relative z-10 flex h-[390px] w-[390px] items-center justify-center rounded-[28px] bg-white/45 p-4 shadow-[0_25px_70px_rgba(74,54,190,0.12)] backdrop-blur-sm sm:h-[430px] sm:w-[430px] xl:h-[470px] xl:w-[470px]">


            {/* Main Image */}

            <img
              src="/images/register-illustration.png"
              alt="EduVault academic identity"
              className="h-full w-full rounded-[20px] object-contain"
            />


            {/* =================================================
                SECURE VAULT
            ================================================== */}

            <div className="absolute left-[25px] top-[7%] flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-2 shadow-[0_8px_25px_rgba(65,45,180,0.15)] backdrop-blur-md">

              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeeaff] text-[#4b35e8]">

                <ShieldCheck size={15} />

              </div>


              <span className="text-[12px] font-semibold text-[#343750]">
                Secure Vault
              </span>

            </div>


            {/* =================================================
                CAREER READY
            ================================================== */}

            <div className="absolute bottom-[6%] right-[30px] flex items-center gap-2 rounded-full bg-[#3525cd] px-4 py-2 shadow-[0_8px_25px_rgba(53,37,205,0.28)]">

              <span className="text-[12px] font-semibold text-white">
                Career Ready
              </span>

              <span className="text-sm">
                🚀
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}


/* ============================================================
   REUSABLE INPUT
============================================================ */

function Input({
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div className="relative">

      <Icon
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d91a3]"
      />


      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-transparent bg-[#e9edff] pl-9 pr-3 text-[13px] text-[#303447] outline-none placeholder:text-[#62677b] focus:border-[#4b35e8] focus:bg-white"
      />

    </div>
  );
}


/* ============================================================
   PASSWORD INPUT
============================================================ */

function PasswordInput({
  placeholder,
  showPassword,
  setShowPassword,
  value,
  onChange,
}) {
  return (
    <div className="relative">

      <LockKeyhole
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d91a3]"
      />


      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-transparent bg-[#e9edff] pl-9 pr-9 text-[13px] text-[#303447] outline-none placeholder:text-[#62677b] focus:border-[#4b35e8] focus:bg-white"
      />


      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8d91a3] hover:text-[#4b35e8]"
      >

        {showPassword ? (
          <EyeOff size={15} />
        ) : (
          <Eye size={15} />
        )}

      </button>

    </div>
  );
}


export default Register;