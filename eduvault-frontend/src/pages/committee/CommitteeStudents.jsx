import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Search,
  UserRound,
  CalendarDays,
  CheckCircle,
  X,
  LoaderCircle,
} from "lucide-react";
import CommitteeNavbar from "../../components/committee/CommitteeNavbar";

function CommitteeStudents() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [graduationDate, setGraduationDate] = useState("");

  const [graduating, setGraduating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // LOAD STUDENTS
  // =========================================================

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "/api/committee/students/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          navigate("/login");
          return;
        }

        if (response.status === 403) {
          navigate("/dashboard");
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Failed to load students. Status: ${response.status}`
          );
        }

        const data = await response.json();

        setStudents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Students loading error:", error);
        setError(error.message || "Failed to load students.");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [navigate]);

  // =========================================================
  // OPEN GRADUATION MODAL
  // =========================================================

  const openGraduateModal = (student) => {
    setSelectedStudent(student);
    setGraduationDate("");
    setError("");
    setSuccess("");
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeGraduateModal = () => {
    if (graduating) return;

    setSelectedStudent(null);
    setGraduationDate("");
  };

  // =========================================================
  // GRADUATE STUDENT
  // =========================================================

  const handleGraduate = async () => {
    if (!selectedStudent) return;

    if (!graduationDate) {
      setError("Please select the official graduation date.");
      return;
    }

    try {
      setGraduating(true);
      setError("");
      setSuccess("");

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `/api/committee/students/${selectedStudent.id}/graduate/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            graduation_date: graduationDate,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.detail ||
            "Failed to graduate the student."
        );
      }

      console.log("Graduation successful:", data);

      // Update the student in the list
      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          student.id === selectedStudent.id
            ? {
                ...student,
                role: "ALUMNI",
                graduation_status: "GRADUATED",
                graduation_date: graduationDate,
              }
            : student
        )
      );

      setSuccess(
        `${selectedStudent.first_name} ${selectedStudent.last_name} has been graduated successfully.`
      );

      setSelectedStudent(null);
      setGraduationDate("");
    } catch (error) {
      console.error("Graduation error:", error);
      setError(error.message || "Graduation failed.");
    } finally {
      setGraduating(false);
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.first_name || ""} ${student.last_name || ""}`.toLowerCase();

    const email = (student.email || "").toLowerCase();

    const searchValue = search.toLowerCase();

    return (
      fullName.includes(searchValue) ||
      email.includes(searchValue)
    );
  });

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7ff]">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <LoaderCircle
            size={18}
            className="animate-spin"
          />
          Loading students...
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f8f7ff] pb-16">
      <CommitteeNavbar />

      <main className="mx-auto w-full max-w-6xl p-5 sm:p-7 lg:p-10">

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <GraduationCap size={25} />
            </div>

            <div>

              <p className="text-sm font-medium text-indigo-600">
                Committee Portal
              </p>

              <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Students
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                View students and confirm their official graduation.
              </p>

            </div>

          </div>

        </div>


        {/* SUCCESS MESSAGE */}

        {success && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

            <CheckCircle
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <p className="text-sm font-medium text-emerald-700">
              {success}
            </p>

          </div>
        )}


        {/* ERROR MESSAGE */}

        {error && !selectedStudent && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">

            <p className="text-sm font-medium text-red-700">
              {error}
            </p>

          </div>
        )}


        {/* SEARCH */}

        <div className="mb-6">

          <div className="relative max-w-xl">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name or email..."
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                py-3
                pl-11
                pr-4
                text-sm
                text-slate-700
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            />

          </div>

        </div>


        {/* STUDENT LIST */}

        <div className="rounded-2xl border border-[#EEECFA] bg-white shadow-sm">

          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

            <h2 className="font-semibold text-slate-900">
              Student Records
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredStudents.length} student
              {filteredStudents.length !== 1 ? "s" : ""}
            </p>

          </div>


          {filteredStudents.length === 0 ? (

            <div className="px-6 py-12 text-center">

              <UserRound
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-medium text-slate-700">
                No students found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {filteredStudents.map((student) => {

                const fullName =
                  `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
                  "Student";

                const graduated =
                  student.role === "ALUMNI" ||
                  student.graduation_status === "GRADUATED";

                return (
                  <div
                    key={student.id}
                    className="
                      flex
                      flex-col
                      gap-4
                      px-5
                      py-5
                      transition
                      hover:bg-slate-50
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      sm:px-6
                    "
                  >

                    {/* STUDENT INFO */}

                    <div className="flex min-w-0 items-center gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <UserRound size={20} />
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="truncate font-semibold text-slate-900">
                            {fullName}
                          </h3>

                          <span
                            className={
                              graduated
                                ? "rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"
                                : "rounded-full bg-indigo-100 px-2.5 py-1 text-[11px] font-semibold text-indigo-700"
                            }
                          >
                            {graduated ? "ALUMNI" : "STUDENT"}
                          </span>

                        </div>

                        <p className="mt-1 truncate text-sm text-slate-500">
                          {student.email}
                        </p>

                      </div>

                    </div>


                    {/* ACTION */}

                    <div className="shrink-0">

                      {graduated ? (

                        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">

                          <CheckCircle size={18} />

                          Graduated

                        </div>

                      ) : (

                        <button
                          type="button"
                          onClick={() =>
                            openGraduateModal(student)
                          }
                          className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-indigo-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-indigo-700
                            sm:w-auto
                          "
                        >
                          <GraduationCap size={17} />

                          Graduate

                        </button>

                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>

      </main>


      {/* =====================================================
          GRADUATION MODAL
      ====================================================== */}

      {selectedStudent && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-900/40
            p-4
            backdrop-blur-sm
          "
        >

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between gap-4">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <GraduationCap size={21} />
                  </div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Confirm Graduation
                  </h2>

                </div>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Confirm the official graduation date for{" "}
                  <span className="font-semibold text-slate-700">
                    {selectedStudent.first_name}{" "}
                    {selectedStudent.last_name}
                  </span>
                  .
                </p>

              </div>

              <button
                type="button"
                onClick={closeGraduateModal}
                disabled={graduating}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>

            </div>


            {/* DATE */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Graduation Date
              </label>

              <div className="relative">

                <CalendarDays
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={graduationDate}
                  onChange={(e) =>
                    setGraduationDate(e.target.value)
                  }
                  disabled={graduating}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />

              </div>

            </div>


            {/* MODAL ERROR */}

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">

                <p className="text-sm font-medium text-red-700">
                  {error}
                </p>

              </div>
            )}


            {/* BUTTONS */}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={closeGraduateModal}
                disabled={graduating}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleGraduate}
                disabled={graduating || !graduationDate}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-indigo-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {graduating ? (
                  <>
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />

                    Graduating...
                  </>
                ) : (
                  <>
                    <GraduationCap size={17} />

                    Confirm Graduation
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default CommitteeStudents;