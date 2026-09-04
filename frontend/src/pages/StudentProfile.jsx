import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  /* =====================================================
     LOAD STUDENT
  ===================================================== */

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Unable to load student:", error);
      }
    }

    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  /* =====================================================
     VALUE HELPER
  ===================================================== */

  const getValue = (value) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return "Not provided";
    }

    return value;
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("studentToken");

    navigate("/");
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">

        <div className="text-center">

          <div className="w-10 h-10 mx-auto rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>

          <p className="mt-4 text-sm text-gray-500">
            Loading profile...
          </p>

        </div>

      </div>
    );
  }

  /* =====================================================
     INITIAL
  ===================================================== */

  const initial =
    user.fullName?.charAt(0)?.toUpperCase() || "S";

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-[#0b1220] text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-blue-50 text-gray-800"
      }`}
    >

      <div className="min-h-screen p-3 sm:p-5">

        <div
          className={`min-h-[calc(100vh-24px)] rounded-[30px] border overflow-hidden backdrop-blur-3xl shadow-2xl ${
            darkMode
              ? "bg-white/[0.04] border-white/10"
              : "bg-white/40 border-white/70"
          }`}
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <header
            className={`h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b ${
              darkMode
                ? "border-white/10"
                : "border-white/60"
            }`}
          >

            <button
              type="button"
              onClick={() =>
                navigate("/studentDashboard")
              }
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >

              <span className="text-lg">
                ←
              </span>

              <span className="hidden sm:inline">
                Back to Dashboard
              </span>

              <span className="sm:hidden">
                Back
              </span>

            </button>


            <div className="text-center">

              <h1 className="text-lg sm:text-xl font-bold">
                Student Profile
              </h1>

              <p className="hidden sm:block text-xs text-gray-500 mt-1">
                Your registered information
              </p>

            </div>


            <div className="w-16 sm:w-32"></div>

          </header>


          {/* =================================================
              MAIN
          ================================================= */}

          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">


            {/* =================================================
                PROFILE HEADER
            ================================================= */}

            <section
              className={`rounded-[28px] border p-5 sm:p-7 shadow-xl ${
                darkMode
                  ? "bg-white/[0.04] border-white/10"
                  : "bg-white/50 border-white/70"
              }`}
            >

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                {/* Avatar */}

                <div
                  className="
                    w-20
                    h-20
                    sm:w-24
                    sm:h-24
                    rounded-full
                    bg-gradient-to-br
                    from-blue-500
                    to-indigo-600
                    text-white
                    flex
                    items-center
                    justify-center
                    text-3xl
                    font-bold
                    shadow-lg
                  "
                >
                  {initial}
                </div>


                {/* Student Details */}

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl sm:text-3xl font-bold">
                      {getValue(user.fullName)}
                    </h2>

                    <span
                      className="
                        flex
                        items-center
                        gap-1.5
                        px-3
                        py-1
                        rounded-full
                        bg-green-500/10
                        border
                        border-green-500/20
                        text-green-600
                        text-xs
                        font-semibold
                      "
                    >
                      ✓ Active
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Student Account
                  </p>

                  <p className="mt-1 text-sm text-gray-600 break-all">
                    {getValue(user.email)}
                  </p>

                </div>

              </div>

            </section>


            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <section
              className={`mt-6 rounded-[28px] border p-5 sm:p-7 shadow-xl ${
                darkMode
                  ? "bg-white/[0.04] border-white/10"
                  : "bg-white/50 border-white/70"
              }`}
            >

              <div className="flex items-center gap-3 mb-6">

                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-blue-500/10
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    text-xl
                  "
                >
                  👤
                </div>

                <div>

                  <h3 className="text-lg sm:text-xl font-bold">
                    Personal Information
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500">
                    Your personal details
                  </p>

                </div>

              </div>


              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-4
                "
              >

                <ProfileItem
                  icon="👤"
                  label="Full Name"
                  value={user.fullName}
                />

                <ProfileItem
                  icon="✉"
                  label="Email Address"
                  value={user.email}
                />

                <ProfileItem
                  icon="☎"
                  label="Mobile Number"
                  value={
                    user.mobileNumber ||
                    user.phone ||
                    user.phoneNumber
                  }
                />

                <ProfileItem
                  icon="📅"
                  label="Date of Birth"
                  value={
                    user.dateOfBirth ||
                    user.dob
                  }
                />

                <ProfileItem
                  icon="🪪"
                  label="PRN Number"
                  value={
                    user.prnNumber ||
                    user.prn
                  }
                />

                <ProfileItem
                  icon="👤"
                  label="Gender"
                  value={user.gender}
                />

              </div>

            </section>


            {/* =================================================
                ACADEMIC INFORMATION
            ================================================= */}

            <section
              className={`mt-6 rounded-[28px] border p-5 sm:p-7 shadow-xl ${
                darkMode
                  ? "bg-white/[0.04] border-white/10"
                  : "bg-white/50 border-white/70"
              }`}
            >

              <div className="flex items-center gap-3 mb-6">

                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-indigo-500/10
                    text-indigo-600
                    flex
                    items-center
                    justify-center
                    text-xl
                  "
                >
                  🎓
                </div>

                <div>

                  <h3 className="text-lg sm:text-xl font-bold">
                    Academic Information
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500">
                    Your college and academic details
                  </p>

                </div>

              </div>


              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-4
                "
              >

                <ProfileItem
                  icon="🎓"
                  label="University"
                  value={user.university}
                />

                <ProfileItem
                  icon="🏫"
                  label="College Name"
                  value={user.collegeName}
                />

                <ProfileItem
                  icon="🪪"
                  label="Roll Number"
                  value={
                    user.rollNumber ||
                    user.rollNo
                  }
                />

                <ProfileItem
                  icon="📚"
                  label="Course / Branch"
                  value={
                    user.course ||
                    user.branch
                  }
                />

                <ProfileItem
                  icon="🎓"
                  label="Academic Year"
                  value={user.academicYear}
                />

                <ProfileItem
                  icon="📖"
                  label="Semester"
                  value={user.semester}
                />

              </div>

            </section>


            {/* =================================================
                ACCOUNT STATUS
            ================================================= */}

            <section
              className={`mt-6 rounded-[28px] border p-5 sm:p-7 shadow-xl ${
                darkMode
                  ? "bg-white/[0.04] border-white/10"
                  : "bg-white/50 border-white/70"
              }`}
            >

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-green-500/10
                    text-green-600
                    flex
                    items-center
                    justify-center
                    text-xl
                  "
                >
                  ✓
                </div>

                <div>

                  <h3 className="text-lg sm:text-xl font-bold">
                    Account Status
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500">
                    Current account status
                  </p>

                </div>

              </div>


              <div
                className="
                  rounded-2xl
                  border
                  border-green-500/20
                  bg-green-500/5
                  p-4
                  sm:p-5
                "
              >

                <div className="flex items-start gap-3">

                  <span className="mt-0.5 text-green-500 text-lg">
                    ✓
                  </span>

                  <div>

                    <p className="font-semibold text-green-600">
                      Account Active
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Your RailConnect student account
                      is active.
                    </p>

                  </div>

                </div>

              </div>

            </section>


            {/* =================================================
                LOGOUT BUTTON
            ================================================= */}

            <div className="mt-8 flex justify-center">

              <button
                type="button"
                onClick={handleLogout}
                className="
                  w-full
                  sm:w-auto
                  min-w-[180px]
                  px-8
                  py-3.5
                  rounded-2xl
                  bg-red-500
                  text-white
                  font-semibold
                  shadow-lg
                  shadow-red-500/20
                  hover:bg-red-600
                  active:scale-[0.98]
                  transition-all
                "
              >
                Logout
              </button>

            </div>


            {/* =================================================
                FOOTER NOTE
            ================================================= */}

            <p className="text-center text-xs text-gray-400 mt-6 pb-3">
              Your profile information is based on
              your registered student account.
            </p>

          </main>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   PROFILE ITEM
========================================================= */

function ProfileItem({
  icon,
  label,
  value,
}) {

  const displayValue =
    value !== undefined &&
    value !== null &&
    value !== ""
      ? value
      : "Not provided";


  return (

    <div
      className="
        rounded-2xl
        border
        border-white/60
        bg-white/30
        p-4
        transition
        hover:bg-white/50
      "
    >

      <div className="flex items-center gap-2">

        <span className="text-base">
          {icon}
        </span>

        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </p>

      </div>


      <p
        className={`mt-2 text-sm font-semibold break-words ${
          displayValue === "Not provided"
            ? "text-gray-400"
            : "text-gray-700"
        }`}
      >
        {displayValue}
      </p>

    </div>

  );
}


export default StudentProfile;