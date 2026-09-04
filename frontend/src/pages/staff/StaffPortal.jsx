import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  Clock3,
  CircleCheck,
  CircleX,
  UserCircle,
  LogOut,
  Search,
  Bell,
  GraduationCap,
  ArrowRight,
  Eye,
  Menu,
  X,
} from "lucide-react";

const StaffPortal = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =====================================================
  // FETCH APPLICATIONS
  // =====================================================

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("staffToken");

        if (!token) {
          navigate("/staff/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/staff/applications",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch applications"
          );
        }

        setApplications(data.applications || []);
      } catch (error) {
        console.error(
          "Staff Portal Applications Error:",
          error
        );

        setError(
          error.message ||
            "Unable to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  // =====================================================
  // STAFF DETAILS
  // =====================================================

  const staff = JSON.parse(
    localStorage.getItem("staff") || "null"
  );

  const staffName =
    staff?.fullName || "College Staff";

  const collegeName =
    staff?.collegeName || "College Staff";

  const staffId =
    staff?.staffId || "";

  const firstName =
    staffName.split(" ")[0] || "Staff";

  // =====================================================
  // APPLICATION COUNTS
  // =====================================================

  const totalApplications =
    applications.length;

  const pendingApplications =
    applications.filter(
      (application) =>
        application.status === "SUBMITTED" ||
        application.status ===
          "COLLEGE_VERIFICATION"
    ).length;

  const approvedApplications =
    applications.filter(
      (application) =>
        application.status ===
          "COLLEGE_APPROVED" ||
        application.status === "APPROVED"
    ).length;

  const rejectedApplications =
    applications.filter(
      (application) =>
        application.status ===
          "COLLEGE_REJECTED" ||
        application.status === "REJECTED"
    ).length;

  // =====================================================
  // SEARCH + RECENT APPLICATIONS
  // =====================================================

  const recentApplications = useMemo(() => {
    const sorted = [...applications].sort(
      (a, b) =>
        new Date(
          b.submittedAt || b.createdAt
        ) -
        new Date(
          a.submittedAt || a.createdAt
        )
    );

    if (!search.trim()) {
      return sorted.slice(0, 5);
    }

    const searchText =
      search.toLowerCase();

    return sorted
      .filter((application) => {
        const applicationNumber =
          application.applicationNumber ||
          "";

        const studentName =
          application.personalDetails
            ?.fullName || "";

        const rollNumber =
          application.personalDetails
            ?.rollNumber || "";

        const course =
          application.institutionDetails
            ?.course || "";

        const fromStation =
          application.journeyDetails
            ?.fromStation || "";

        const toStation =
          application.journeyDetails
            ?.toStation || "";

        return (
          applicationNumber
            .toLowerCase()
            .includes(searchText) ||
          studentName
            .toLowerCase()
            .includes(searchText) ||
          rollNumber
            .toLowerCase()
            .includes(searchText) ||
          course
            .toLowerCase()
            .includes(searchText) ||
          fromStation
            .toLowerCase()
            .includes(searchText) ||
          toStation
            .toLowerCase()
            .includes(searchText)
        );
      })
      .slice(0, 5);
  }, [applications, search]);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staff");

    navigate("/staff/login");
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavigation = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#f4efff]
        via-[#faf9ff]
        to-[#edf3ff]
        text-slate-800
      "
    >

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-slate-900/20
            backdrop-blur-[2px]
            z-40
            md:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          bottom-0
          w-[270px]
          md:left-5
          md:top-5
          md:bottom-5
          md:w-[210px]

          bg-white/85
          backdrop-blur-2xl

          border
          border-white

          shadow-[0_18px_45px_rgba(30,41,59,0.12)]

          z-50

          flex
          flex-col

          transition-transform
          duration-300
          ease-in-out

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* =====================================================
            MOBILE CLOSE BUTTON
        ====================================================== */}

        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            absolute
            top-5
            right-5
            md:hidden

            w-9
            h-9

            rounded-xl

            bg-slate-100/80
            text-slate-500

            flex
            items-center
            justify-center

            hover:bg-slate-200
            transition
          "
        >
          <X size={19} />
        </button>

        {/* =====================================================
            LOGO
        ====================================================== */}

        <div
          className="
            px-6
            pt-7
            pb-8
          "
        >

          <div className="flex items-center gap-3">

            <div className="text-blue-600">
              <GraduationCap
                size={23}
                strokeWidth={2.5}
              />
            </div>

            <div>

              <h1
                className="
                  text-[19px]
                  leading-none
                  font-bold
                  text-blue-600
                "
              >
                RailConnect
              </h1>

              <p
                className="
                  text-[8px]
                  tracking-[0.24em]
                  text-slate-500
                  mt-1
                "
              >
                COLLEGE STAFF
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}

        <div className="px-3">

          {/* Dashboard */}

          <button
            onClick={() =>
              handleNavigation(
                "/staff/portal"
              )
            }
            className="
              relative
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              bg-white/70
              text-blue-600
              font-semibold
              text-sm
              mb-1
            "
          >

            <span
              className="
                absolute
                left-0
                top-2
                bottom-2
                w-[3px]
                rounded-r-full
                bg-blue-600
              "
            />

            <LayoutDashboard size={18} />

            <span>
              Dashboard
            </span>

          </button>

          {/* Applications */}

          <button
            onClick={() =>
              handleNavigation(
                "/staff/applications"
              )
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-slate-500
              hover:text-slate-800
              hover:bg-white/60
              text-sm
              transition-all
            "
          >

            <FileText size={18} />

            <span>
              Applications
            </span>

          </button>

          {/* Pending */}

          <button
            onClick={() =>
              handleNavigation(
                "/staff/pending"
              )
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-slate-500
              hover:text-slate-800
              hover:bg-white/60
              text-sm
              transition-all
            "
          >

            <Clock3 size={18} />

            <span>
              Pending
            </span>

          </button>

          {/* Approved */}

          <button
            onClick={() =>
              handleNavigation(
                "/staff/approved"
              )
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-slate-500
              hover:text-slate-800
              hover:bg-white/60
              text-sm
              transition-all
            "
          >

            <CircleCheck size={18} />

            <span>
              Approved
            </span>

          </button>

          {/* Rejected */}

          <button
            onClick={() =>
              handleNavigation(
                "/staff/rejected"
              )
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-slate-500
              hover:text-slate-800
              hover:bg-white/60
              text-sm
              transition-all
            "
          >

            <CircleX size={18} />

            <span>
              Rejected
            </span>

          </button>

        </div>

        {/* =====================================================
            BOTTOM SIDEBAR
        ====================================================== */}

        <div
          className="
            mt-auto
            px-3
            pb-6
          "
        >

          {/* Profile */}

          <button
            onClick={() =>
              handleNavigation(
                "/staff/profile"
              )
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-slate-500
              hover:text-slate-800
              hover:bg-white/60
              text-sm
              transition-all
            "
          >

            <UserCircle size={18} />

            <span>
              Profile
            </span>

          </button>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-slate-500
              hover:text-red-500
              hover:bg-red-50/60
              text-sm
              transition-all
            "
          >

            <LogOut size={18} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          min-h-screen
          md:ml-[230px]
        "
      >

        {/* =====================================================
            TOP BAR
        ====================================================== */}

        <header
          className="
            min-h-[74px]
            px-4
            sm:px-6
            md:px-8

            py-3

            flex
            items-center
            justify-between
            gap-3

            bg-white/50
            backdrop-blur-xl

            border-b
            border-white/70

            sticky
            top-0
            z-30
          "
        >

          {/* =====================================================
              MOBILE MENU + SEARCH
          ====================================================== */}

          <div
            className="
              flex
              items-center
              gap-3
              flex-1
              min-w-0
            "
          >

            {/* Hamburger */}

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="
                md:hidden

                flex-shrink-0

                w-10
                h-10

                rounded-xl

                bg-white/75
                border
                border-white

                shadow-sm

                text-slate-600

                flex
                items-center
                justify-center

                hover:bg-white
                transition
              "
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            {/* Search */}

            <div
              className="
                relative
                w-full
                max-w-[425px]
              "
            >

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="
                  Search applications, students...
                "
                className="
                  w-full
                  h-10

                  pl-11
                  pr-4

                  rounded-full

                  bg-white/65
                  border
                  border-white

                  outline-none

                  text-sm
                  text-slate-700

                  placeholder:text-slate-400

                  focus:bg-white/90
                  focus:ring-2
                  focus:ring-blue-100

                  transition
                "
              />

            </div>

          </div>

          {/* =====================================================
              RIGHT HEADER
          ====================================================== */}

          <div
            className="
              flex
              items-center
              gap-3
              sm:gap-5
              flex-shrink-0
            "
          >

            {/* Notification */}

            <button
              className="
                relative
                text-slate-500
                hover:text-slate-800
                transition
              "
            >

              <Bell size={19} />

              <span
                className="
                  absolute
                  -top-1
                  -right-1

                  w-2
                  h-2

                  rounded-full

                  bg-red-500

                  border-2
                  border-white
                "
              />

            </button>

            {/* Staff Information */}

            <div
              className="
                flex
                items-center
                gap-2
                sm:gap-3
              "
            >

              <div
                className="
                  text-right
                  hidden
                  sm:block
                "
              >

                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                    max-w-[170px]
                    truncate
                  "
                >
                  {staffName}
                </p>

                <p
                  className="
                    text-[11px]
                    text-slate-400
                    max-w-[180px]
                    truncate
                  "
                >
                  {collegeName}
                </p>

              </div>

              {/* Avatar */}

              <div
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10

                  rounded-full

                  bg-gradient-to-br
                  from-blue-100
                  to-purple-100

                  border
                  border-white

                  shadow-sm

                  flex
                  items-center
                  justify-center

                  text-blue-600
                  font-semibold

                  flex-shrink-0
                "
              >
                {staffName
                  .charAt(0)
                  .toUpperCase()}
              </div>

            </div>

          </div>

        </header>

        {/* =====================================================
            DASHBOARD CONTENT
        ====================================================== */}

        <main
          className="
            px-4
            sm:px-6
            md:px-8

            py-6
            md:py-8
          "
        >

          {/* =====================================================
              WELCOME SECTION
          ====================================================== */}

          <div
            className="
              mb-7
              md:mb-9
            "
          >

            <h2
              className="
                text-[25px]
                sm:text-[27px]
                font-semibold
                text-slate-900

                leading-tight

                break-words
              "
            >
              Good Morning,{" "}
              <span>
                {staffName}
              </span>
            </h2>

            <p
              className="
                text-sm
                text-slate-500
                mt-2

                max-w-2xl
                leading-5
              "
            >
              Manage and review student
              railway concession applications.
              Here's your overview for today.
            </p>

            {/* Staff ID */}

            {staffId && (
              <p
                className="
                  text-xs
                  text-slate-400
                  mt-2
                "
              >
                Staff ID: {staffId}
              </p>
            )}

          </div>

          {/* =====================================================
              STATISTICS CARDS
          ====================================================== */}

          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4

              gap-4
              md:gap-5

              mb-8
              md:mb-10
            "
          >

            {/* =================================================
                TOTAL APPLICATIONS
            ================================================== */}

            <div
              className="
                bg-white/75
                backdrop-blur-xl

                border
                border-white

                rounded-[20px]

                p-5
                sm:p-6

                shadow-[0_12px_35px_rgba(30,41,59,0.07)]

                hover:-translate-y-1
                transition-all
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-blue-50
                    text-blue-600

                    flex
                    items-center
                    justify-center

                    flex-shrink-0
                  "
                >
                  <FileText size={20} />
                </div>

                <p
                  className="
                    text-sm
                    text-slate-500
                    leading-5
                  "
                >
                  Total
                  <br />
                  Applications
                </p>

              </div>

              <h3
                className="
                  text-[34px]
                  font-bold
                  text-slate-900
                  mt-5
                "
              >
                {totalApplications}
              </h3>

              <p
                className="
                  text-[9px]
                  tracking-widest
                  text-slate-400
                  mt-1
                "
              >
                THIS SEMESTER
              </p>

            </div>

            {/* =================================================
                PENDING
            ================================================== */}

            <div
              className="
                bg-white/75
                backdrop-blur-xl

                border
                border-white
                border-t-2
                border-t-amber-400

                rounded-[20px]

                p-5
                sm:p-6

                shadow-[0_12px_35px_rgba(30,41,59,0.07)]

                hover:-translate-y-1
                transition-all
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-amber-50
                    text-amber-500

                    flex
                    items-center
                    justify-center

                    flex-shrink-0
                  "
                >
                  <Clock3 size={20} />
                </div>

                <p
                  className="
                    text-sm
                    text-slate-500
                    leading-5
                  "
                >
                  Pending
                  <br />
                  Review
                </p>

              </div>

              <div
                className="
                  flex
                  items-end
                  gap-2
                  flex-wrap
                "
              >

                <h3
                  className="
                    text-[34px]
                    font-bold
                    text-slate-900
                    mt-5
                  "
                >
                  {pendingApplications}
                </h3>

                <span
                  className="
                    mb-2

                    px-2
                    py-1

                    rounded-full

                    bg-amber-50
                    text-amber-600

                    text-[8px]
                    font-semibold
                  "
                >
                  Requires Action
                </span>

              </div>

            </div>

            {/* =================================================
                APPROVED
            ================================================== */}

            <div
              className="
                bg-white/75
                backdrop-blur-xl

                border
                border-white

                rounded-[20px]

                p-5
                sm:p-6

                shadow-[0_12px_35px_rgba(30,41,59,0.07)]

                hover:-translate-y-1
                transition-all
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-emerald-50
                    text-emerald-500

                    flex
                    items-center
                    justify-center

                    flex-shrink-0
                  "
                >
                  <CircleCheck size={20} />
                </div>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Approved
                </p>

              </div>

              <h3
                className="
                  text-[34px]
                  font-bold
                  text-slate-900
                  mt-5
                "
              >
                {approvedApplications}
              </h3>

              <p
                className="
                  text-[9px]
                  tracking-widest
                  text-emerald-500
                  font-semibold
                  mt-1
                "
              >
                PROCESSED
              </p>

            </div>

            {/* =================================================
                REJECTED
            ================================================== */}

            <div
              className="
                bg-white/75
                backdrop-blur-xl

                border
                border-white

                rounded-[20px]

                p-5
                sm:p-6

                shadow-[0_12px_35px_rgba(30,41,59,0.07)]

                hover:-translate-y-1
                transition-all
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-red-50
                    text-red-500

                    flex
                    items-center
                    justify-center

                    flex-shrink-0
                  "
                >
                  <CircleX size={20} />
                </div>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Rejected
                </p>

              </div>

              <h3
                className="
                  text-[34px]
                  font-bold
                  text-slate-900
                  mt-5
                "
              >
                {rejectedApplications}
              </h3>

              <p
                className="
                  text-[9px]
                  tracking-widest
                  text-red-500
                  font-semibold
                  mt-1
                "
              >
                DECLINED
              </p>

            </div>

          </div>

          {/* =====================================================
              RECENT APPLICATIONS
          ====================================================== */}

          <div
            className="
              bg-white/75
              backdrop-blur-xl

              border
              border-white

              rounded-[22px]

              shadow-[0_15px_40px_rgba(30,41,59,0.07)]

              overflow-hidden
            "
          >

            {/* =================================================
                SECTION HEADER
            ================================================== */}

            <div
              className="
                px-5
                sm:px-6

                py-5

                flex
                items-center
                justify-between

                gap-4
              "
            >

              <div>

                <h3
                  className="
                    text-lg
                    font-semibold
                    text-slate-800
                  "
                >
                  Recent Applications
                </h3>

                <p
                  className="
                    text-xs
                    text-slate-400
                    mt-1
                  "
                >
                  Latest student concession
                  requests
                </p>

              </div>

              <button
                onClick={() =>
                  navigate(
                    "/staff/applications"
                  )
                }
                className="
                  flex
                  items-center
                  gap-1

                  text-sm
                  font-semibold
                  text-blue-600

                  hover:text-blue-700

                  transition

                  flex-shrink-0
                "
              >
                <span className="hidden sm:inline">
                  View All
                </span>

                <span className="sm:hidden">
                  All
                </span>

                <ArrowRight size={15} />

              </button>

            </div>

            {/* =================================================
                LOADING
            ================================================== */}

            {loading && (
              <div
                className="
                  py-14
                  text-center
                  text-sm
                  text-slate-400
                "
              >
                Loading applications...
              </div>
            )}

            {/* =================================================
                ERROR
            ================================================== */}

            {!loading && error && (
              <div
                className="
                  py-14
                  px-5
                  text-center
                  text-sm
                  text-red-400
                "
              >
                {error}
              </div>
            )}

            {/* =================================================
                EMPTY
            ================================================== */}

            {!loading &&
              !error &&
              recentApplications.length === 0 && (
                <div
                  className="
                    py-14
                    text-center
                  "
                >

                  <FileText
                    size={30}
                    className="
                      mx-auto
                      text-slate-300
                    "
                  />

                  <p
                    className="
                      mt-3
                      text-sm
                      text-slate-400
                    "
                  >
                    {search
                      ? "No applications match your search."
                      : "No applications received yet."}
                  </p>

                </div>
              )}

            {/* =================================================
                APPLICATION TABLE
            ================================================== */}

            {!loading &&
              !error &&
              recentApplications.length > 0 && (
                <div className="overflow-x-auto">

                  <div
                    className="
                      min-w-[850px]
                    "
                  >

                    {/* Table Header */}

                    <div
                      className="
                        grid
                        grid-cols-[1fr_1.25fr_1.2fr_1.5fr_1fr_0.7fr]

                        px-6
                        py-4

                        border-y
                        border-slate-100

                        text-[9px]
                        font-semibold
                        tracking-widest
                        text-slate-400
                      "
                    >

                      <span>
                        APP ID
                      </span>

                      <span>
                        STUDENT NAME
                      </span>

                      <span>
                        ROLL NO
                      </span>

                      <span>
                        ROUTE
                      </span>

                      <span>
                        DATE APPLIED
                      </span>

                      <span>
                        ACTION
                      </span>

                    </div>

                    {/* Applications */}

                    {recentApplications.map(
                      (application) => (
                        <div
                          key={
                            application._id ||
                            application.applicationNumber
                          }
                          className="
                            grid
                            grid-cols-[1fr_1.25fr_1.2fr_1.5fr_1fr_0.7fr]

                            items-center

                            px-6
                            py-5

                            border-b
                            border-slate-100

                            text-sm

                            hover:bg-white/40

                            transition
                          "
                        >

                          {/* Application ID */}

                          <span
                            className="
                              text-blue-600
                              font-semibold
                              text-xs
                            "
                          >
                            {application.applicationNumber ||
                              "-"}
                          </span>

                          {/* Student */}

                          <div>

                            <p
                              className="
                                text-slate-600
                                font-medium
                                truncate
                                max-w-[150px]
                              "
                            >
                              {application
                                .personalDetails
                                ?.fullName ||
                                "Unknown Student"}
                            </p>

                            <p
                              className="
                                text-[10px]
                                text-slate-400
                                mt-1
                              "
                            >
                              {application
                                .institutionDetails
                                ?.course ||
                                "-"}
                            </p>

                          </div>

                          {/* Roll Number */}

                          <span
                            className="
                              text-slate-500
                              text-xs
                            "
                          >
                            {application
                              .personalDetails
                              ?.rollNumber ||
                              "-"}
                          </span>

                          {/* Route */}

                          <span
                            className="
                              text-slate-600
                              text-xs
                            "
                          >
                            {application
                              .journeyDetails
                              ?.fromStation ||
                              "-"}
                            {" → "}
                            {application
                              .journeyDetails
                              ?.toStation ||
                              "-"}
                          </span>

                          {/* Date */}

                          <span
                            className="
                              text-slate-500
                              text-xs
                            "
                          >
                            {application.submittedAt
                              ? new Date(
                                  application.submittedAt
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "-"}
                          </span>

                          {/* View */}

                          <button
                            onClick={() =>
                              navigate(
                                `/staff/applications/${application.applicationNumber}`
                              )
                            }
                            className="
                              flex
                              items-center
                              gap-1

                              w-fit

                              px-3
                              py-2

                              rounded-lg

                              bg-blue-50
                              text-blue-600

                              text-xs
                              font-semibold

                              hover:bg-blue-100

                              transition
                            "
                          >

                            <Eye size={13} />

                            View

                          </button>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

            {/* =================================================
                SEARCH INFORMATION
            ================================================== */}

            {search && (
              <div
                className="
                  px-5
                  sm:px-6

                  py-4

                  text-xs
                  text-slate-400

                  border-t
                  border-slate-100
                "
              >
                Searching for:{" "}

                <span
                  className="
                    text-slate-600
                    font-medium
                  "
                >
                  {search}
                </span>

              </div>
            )}

          </div>

        </main>

      </div>

    </div>
  );
};

export default StaffPortal;