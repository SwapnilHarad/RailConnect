import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaTrain,
  FaBell,
  FaMoon,
  FaSun,
  FaCircleXmark,
  FaPlus,
  FaRotate,
  FaHeadset,
  FaUser,
  FaEye,
  FaBullhorn,
  FaCircleCheck,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

import { motion } from "framer-motion";


function StudentDashboard() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [user, setUser] = useState({
    fullName: "Student",
    email: "",
  });


  /* =========================================================
     LOAD USER + THEME
  ========================================================= */

  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Unable to load user:", error);
      }
    }

    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      setDarkMode(true);
    }

  }, []);


  /* =========================================================
     DARK MODE
  ========================================================= */

  const toggleDarkMode = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem(
      "darkMode",
      newMode
    );
  };


  return (

    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-[#0b1220] text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-blue-50 text-gray-800"
      }`}
    >

      {/* =====================================================
          MAIN GLASS CONTAINER
      ====================================================== */}

      <div className="min-h-screen p-3 sm:p-5">

        <div
          className={`min-h-[calc(100vh-24px)] overflow-hidden rounded-[32px] border shadow-2xl backdrop-blur-3xl transition-all duration-500 ${
            darkMode
              ? "border-white/10 bg-white/[0.04] shadow-black/30"
              : "border-white/60 bg-white/30 shadow-blue-900/10"
          }`}
        >


          {/* =================================================
              NAVBAR
          ================================================== */}

          <header
            className={`sticky top-0 z-50 h-20 border-b px-4 sm:px-6 lg:px-8 flex items-center justify-between backdrop-blur-2xl ${
              darkMode
                ? "border-white/10 bg-[#0b1220]/80"
                : "border-white/50 bg-white/70"
            }`}
          >

            {/* LOGO */}

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-10
                  w-10
                  sm:h-11
                  sm:w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-600
                  text-white
                  shadow-lg
                "
              >
                <FaTrain size={18} />
              </div>


              <div>

                <h1
                  className="
                    text-lg
                    sm:text-xl
                    font-bold
                    text-blue-600
                  "
                >
                  RailConnect
                </h1>

                <p
                  className={`hidden sm:block text-xs ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Student Concession Portal
                </p>

              </div>

            </div>


            {/* =================================================
                DESKTOP NAVIGATION
            ================================================== */}

            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">

              {/* MY APPLICATIONS */}

              <Link
                to="/applications"
                className={`transition ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                My Applications
              </Link>


              {/* PROFILE */}

              <Link
                to="/profile"
                className={`transition ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Profile
              </Link>

            </nav>


            {/* =================================================
                RIGHT CONTROLS
            ================================================== */}

            <div className="flex items-center gap-2 sm:gap-3">

              {/* DARK MODE */}

              <button
                onClick={toggleDarkMode}
                className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? "border-white/10 bg-white/10 text-yellow-300"
                    : "border-white/60 bg-white/40 text-gray-700"
                }`}
                title="Toggle dark mode"
              >
                {darkMode ? (
                  <FaSun />
                ) : (
                  <FaMoon />
                )}
              </button>


              {/* NOTIFICATION */}

              <button
                className={`hidden sm:flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? "border-white/10 bg-white/10 text-gray-200"
                    : "border-white/60 bg-white/40 text-gray-700"
                }`}
              >
                <FaBell />
              </button>


              {/* AVATAR */}

              <div
              onClick={()=>navigate("/profile")}
                className="
                  flex
                  h-10
                  w-10
                  sm:h-11
                  sm:w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                "
              >
                {user.fullName
                  ?.charAt(0)
                  ?.toUpperCase() || "S"}
              </div>


              {/* MOBILE MENU BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setMobileMenu(!mobileMenu)
                }
                className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border ${
                  darkMode
                    ? "border-white/10 bg-white/10 text-white"
                    : "border-white/60 bg-white/50 text-gray-700"
                }`}
              >
                {mobileMenu ? (
                  <FaXmark size={18} />
                ) : (
                  <FaBars size={18} />
                )}
              </button>

            </div>

          </header>


          {/* =================================================
              MOBILE NAVIGATION
          ================================================== */}

          {mobileMenu && (

            <div
              className={`lg:hidden sticky top-20 z-40 border-b p-4 backdrop-blur-2xl ${
                darkMode
                  ? "border-white/10 bg-[#0b1220]/95"
                  : "border-white/50 bg-white/95"
              }`}
            >

              <div className="flex flex-col gap-2">

                <Link
                  to="/applications"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className={`w-full rounded-xl px-4 py-3 text-sm font-medium ${
                    darkMode
                      ? "text-gray-300 hover:bg-white/10"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  My Applications
                </Link>


                <Link
                  to="/profile"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className={`w-full rounded-xl px-4 py-3 text-sm font-medium ${
                    darkMode
                      ? "text-gray-300 hover:bg-white/10"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  Profile
                </Link>

              </div>

            </div>

          )}


          {/* =================================================
              BODY
          ================================================== */}

          <div className="flex">


            {/* =================================================
                SIDEBAR
            ================================================== */}

            <aside
              className={`hidden md:flex w-60 lg:w-64 flex-col border-r p-5 backdrop-blur-2xl ${
                darkMode
                  ? "border-white/10 bg-white/[0.02]"
                  : "border-white/50 bg-white/10"
              }`}
            >

              {/* Student Info */}

              <div className="px-3 pt-5 pb-8">

                <h2 className="text-xl font-bold">
                  {user.fullName}
                </h2>

                <p
                  className={`mt-1 text-sm ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Student
                </p>

                <div
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-blue-400/20
                    bg-blue-500/10
                    px-3
                    py-1
                    text-xs
                    text-blue-600
                  "
                >
                  <FaCircleCheck />
                  Verified Student
                </div>

              </div>


              {/* Sidebar Links */}

              <div className="space-y-2">

                <button
                  className="
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-blue-400/20
                    bg-blue-500/10
                    px-4
                    py-3.5
                    text-left
                    font-semibold
                    text-blue-600
                    backdrop-blur-xl
                  "
                >
                  <FaTrain />
                  Dashboard
                </button>


                <Link
                  to="/new-application"
                  className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                    darkMode
                      ? "border-white/10 bg-white/[0.03] text-gray-300 hover:bg-white/10"
                      : "border-white/50 bg-white/20 text-gray-600 hover:bg-white/50"
                  }`}
                >
                  <FaPlus />
                  New Application
                </Link>



              </div>

            </aside>


            {/* =================================================
                MAIN CONTENT
            ================================================== */}

            <main className="flex-1 p-4 sm:p-7 lg:p-9">


              {/* =================================================
                  WELCOME
              ================================================== */}

              <section className="mb-8">

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >

                  <h2
                    className="
                      text-3xl
                      sm:text-4xl
                      font-bold
                    "
                  >
                    Welcome back,{" "}
                    {user.fullName
                      ?.split(" ")[0] ||
                      "Student"}!
                  </h2>

                  <p
                    className={`mt-2 max-w-2xl ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    Your latest concession application
                    is being processed. You can track its
                    status below.
                  </p>

                </motion.div>

              </section>


             {/* =================================================
    APPLY NEW APPLICATION
================================================== */}

<section className="mb-6">

  <Link
    to="/new-application"
    className={`group block rounded-[26px] border p-5 sm:p-6 backdrop-blur-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 ${
      darkMode
        ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
        : "border-white/60 bg-white/35 hover:bg-white/55"
    }`}
  >

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

      {/* Left Side */}

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-blue-600
            text-white
            shadow-lg
            transition-transform
            duration-300
            group-hover:scale-105
          "
        >
          <FaPlus size={20} />
        </div>


        <div>

          <h3 className="text-xl font-bold">
            Apply New Application
          </h3>

          <p
            className={`mt-1 text-sm ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Apply for a new railway concession pass
            and submit your details online.
          </p>

        </div>

      </div>


      {/* Right Side */}

      <div
        className="
          inline-flex
          w-fit
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          transition-all
          group-hover:bg-blue-700
          sm:shrink-0
        "
      >
        <FaPlus size={12} />
        Start Application
      </div>

    </div>

  </Link>

</section>





              {/* =================================================
                  BOTTOM CARDS
              ================================================== */}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">


                {/* View Applications */}

                <Link
                  to="/applications"
                  className={`flex items-center gap-4 rounded-[26px] border p-5 backdrop-blur-2xl shadow-xl transition-all hover:-translate-y-1 ${
                    darkMode
                      ? "border-white/10 bg-white/[0.04]"
                      : "border-white/60 bg-white/35"
                  }`}
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-500/10
                      text-blue-600
                    "
                  >
                    <FaRotate />
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      View Applications
                    </h3>

                    <p
                      className={`text-sm ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Check application history
                    </p>

                  </div>

                </Link>


                {/* Update Profile */}

                <Link
                  to="/profile"
                  className={`flex items-center gap-4 rounded-[26px] border p-5 backdrop-blur-2xl shadow-xl transition-all hover:-translate-y-1 ${
                    darkMode
                      ? "border-white/10 bg-white/[0.04]"
                      : "border-white/60 bg-white/35"
                  }`}
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-500/10
                      text-blue-600
                    "
                  >
                    <FaUser />
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Update Profile
                    </h3>

                    <p
                      className={`text-sm ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Manage your student profile
                    </p>

                  </div>

                </Link>

              </div>


              {/* =================================================
                  ANNOUNCEMENTS
              ================================================== */}

              <div
                className={`mt-6 rounded-[26px] border p-5 sm:p-6 backdrop-blur-2xl shadow-xl ${
                  darkMode
                    ? "border-white/10 bg-white/[0.04]"
                    : "border-white/60 bg-white/35"
                }`}
              >

                <div className="flex items-center gap-3 mb-5">

                  <FaBullhorn className="text-yellow-500" />

                  <h3 className="font-bold">
                    Announcements
                  </h3>

                </div>


                <div className="grid md:grid-cols-2 gap-4">


                  {/* Notice 1 */}

                  <div
                    className={`rounded-2xl border p-4 ${
                      darkMode
                        ? "border-yellow-400/10 bg-yellow-400/5"
                        : "border-yellow-300/30 bg-yellow-200/20"
                    }`}
                  >

                    <p className="font-semibold text-yellow-700">
                      Diwali Holiday Notice
                    </p>

                    <p
                      className={`mt-2 text-sm ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      Processing times may be delayed
                      during regional holidays.
                    </p>

                  </div>


                  {/* Notice 2 */}

                  <div
                    className={`rounded-2xl border p-4 ${
                      darkMode
                        ? "border-blue-400/10 bg-blue-400/5"
                        : "border-blue-300/30 bg-blue-100/30"
                    }`}
                  >

                    <p className="font-semibold text-blue-600">
                      New ID Card Policy
                    </p>

                    <p
                      className={`mt-2 text-sm ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      Ensure your digital institute ID is
                      updated in the profile section.
                    </p>

                  </div>

                </div>

              </div>


              {/* =================================================
                  FOOTER
              ================================================== */}

              <div
                className={`mt-10 pb-4 text-center text-xs ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                RailConnect Student Concession Portal
              </div>

            </main>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   PROGRESS STEP
========================================================= */

function ProgressStep({
  active,
  current,
  label,
  darkMode,
}) {

  return (

    <div className="flex min-w-[70px] flex-col items-center">

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          active
            ? "border-blue-600 bg-blue-600 text-white"
            : darkMode
            ? "border-white/20 bg-white/5"
            : "border-gray-300 bg-white/40"
        }`}
      >

        {active && (
          <FaCircleCheck size={10} />
        )}

      </div>


      <p
        className={`mt-2 text-[10px] text-center font-medium ${
          current
            ? "text-blue-600"
            : darkMode
            ? "text-gray-500"
            : "text-gray-400"
        }`}
      >
        {label}
      </p>

    </div>

  );
}


/* =========================================================
   PROGRESS LINE
========================================================= */

function ProgressLine({
  active,
  darkMode,
}) {

  return (

    <div
      className={`h-[2px] flex-1 min-w-[20px] ${
        active
          ? "bg-blue-600"
          : darkMode
          ? "bg-white/10"
          : "bg-gray-300"
      }`}
    />

  );

}


export default StudentDashboard;