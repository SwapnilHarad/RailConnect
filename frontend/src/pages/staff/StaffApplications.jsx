import React, { useEffect, useState } from "react";
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
  Eye,
  Filter,
  ChevronDown,
} from "lucide-react";

const StaffApplications = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Logged-in staff
  const staff = JSON.parse(localStorage.getItem("staff") || "null");

  const staffName = staff?.fullName || "College Staff";
  const collegeName = staff?.collegeName || "College Staff";
  const [applications, setApplications] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");



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
        `${import.meta.env.VITE_API_URL}/api/staff/applications`,
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
      console.error("Fetch Staff Applications Error:", error);

      setError(
        error.message || "Unable to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchApplications();
}, [navigate]);
  

  

  // Search + status filtering
 const formattedApplications = applications.map((application) => ({
  id: application.applicationNumber,

  studentName:
    application.personalDetails?.fullName || "Unknown Student",

  rollNo:
    application.personalDetails?.rollNumber || "N/A",

  course:
    application.institutionDetails?.course ||
    application.personalDetails?.branch ||
    "N/A",

  route: `${application.journeyDetails?.fromStation || "N/A"} → ${
    application.journeyDetails?.toStation || "N/A"
  }`,

  date: application.submittedAt
    ? new Date(application.submittedAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "N/A",

  status:
    application.status === "COLLEGE_APPROVED"
      ? "Approved"
      : application.status === "COLLEGE_REJECTED"
      ? "Rejected"
      : "Pending",
}));


const filteredApplications = formattedApplications.filter(
  (application) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      application.studentName
        .toLowerCase()
        .includes(searchValue) ||
      application.rollNo
        .toLowerCase()
        .includes(searchValue) ||
      application.id
        .toLowerCase()
        .includes(searchValue) ||
      application.route
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  }
);
  // Logout
  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staff");

    navigate("/staff/login");
  };

  // Status styling
  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-500 border border-red-100";
    }

    return "bg-amber-50 text-amber-600 border border-amber-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4efff] via-[#faf9ff] to-[#edf3ff] text-slate-800">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className="
          fixed
          left-5
          top-5
          bottom-5
          w-[210px]
          bg-white/80
          backdrop-blur-2xl
          border
          border-white
          shadow-[0_18px_45px_rgba(30,41,59,0.12)]
          z-40
          flex
          flex-col
        "
      >

        {/* Logo */}
        <div className="px-6 pt-7 pb-8">

          <div className="flex items-center gap-3">

            <div className="text-blue-600">
              <GraduationCap size={23} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-[19px] leading-none font-bold text-blue-600">
                RailConnect
              </h1>

              <p className="text-[8px] tracking-[0.24em] text-slate-500 mt-1">
                COLLEGE STAFF
              </p>
            </div>

          </div>

        </div>


        {/* Navigation */}
        <div className="px-3">

          {/* Dashboard */}
          <button
            onClick={() => navigate("/staff/portal")}
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
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>


          {/* Applications - ACTIVE */}
          <button
            onClick={() => navigate("/staff/applications")}
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
              transition-all
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

            <FileText size={18} />

            <span>Applications</span>

          </button>


          {/* Pending */}
          <button
            onClick={() => navigate("/staff/pending")}
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
            <span>Pending</span>
          </button>


          {/* Approved */}
          <button
            onClick={() => navigate("/staff/approved")}
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
            <span>Approved</span>
          </button>


          {/* Rejected */}
          <button
            onClick={() => navigate("/staff/rejected")}
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
            <span>Rejected</span>
          </button>

        </div>


        {/* Bottom Navigation */}
        <div className="mt-auto px-3 pb-6">

          {/* Profile */}
          <button
            onClick={() => navigate("/staff/profile")}
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
            <span>Profile</span>
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
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="ml-[230px] min-h-screen">


        {/* TOP HEADER */}
        <header
          className="
            h-[74px]
            px-8
            flex
            items-center
            justify-between
            bg-white/50
            backdrop-blur-xl
            border-b
            border-white/70
          "
        >

          {/* Search */}
          <div className="relative w-[425px]">

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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applications, students..."
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


          {/* Staff */}
          <div className="flex items-center gap-6">

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


            <div className="flex items-center gap-3">

              <div className="text-right hidden sm:block">

                <p className="text-sm font-semibold text-slate-700">
                  {staffName}
                </p>

                <p className="text-[11px] text-slate-400 max-w-[180px] truncate">
                  {collegeName}
                </p>

              </div>


              <div
                className="
                  w-10
                  h-10
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
                "
              >
                {staffName.charAt(0).toUpperCase()}
              </div>

            </div>

          </div>

        </header>


        {/* =====================================================
            APPLICATION PAGE
        ====================================================== */}

        <main className="px-8 py-8">


          {/* Page Heading */}
          <div className="mb-8">

            <div className="flex items-center justify-between">

              <div>

                <h1 className="text-[27px] font-semibold text-slate-900">
                  Applications
                </h1>

                <p className="text-sm text-slate-500 mt-1.5">
                  View and manage all student railway concession
                  applications.
                </p>

              </div>


              {/* Total */}
              <div
                className="
                  px-5
                  py-3
                  rounded-2xl
                  bg-white/65
                  backdrop-blur-xl
                  border
                  border-white
                  shadow-sm
                "
              >

                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Total Applications
                </p>

                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {applications.length}
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              FILTER BAR
          ================================================== */}

          <div
            className="
              mb-6
              p-4
              bg-white/70
              backdrop-blur-xl
              border
              border-white
              rounded-2xl
              shadow-[0_10px_30px_rgba(30,41,59,0.05)]
              flex
              items-center
              justify-between
              gap-4
            "
          >

            {/* Search */}
            <div className="relative flex-1">

              <Search
                size={17}
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student, roll number or application ID..."
                className="
                  w-full
                  h-11
                  pl-11
                  pr-4
                  rounded-xl
                  bg-white/70
                  border
                  border-slate-200
                  outline-none
                  text-sm
                  focus:border-blue-300
                  focus:ring-2
                  focus:ring-blue-100
                "
              />

            </div>


            {/* Status Filter */}
            <div className="relative">

              <Filter
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  pointer-events-none
                "
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
                  h-11
                  pl-9
                  pr-9
                  rounded-xl
                  bg-white/70
                  border
                  border-slate-200
                  outline-none
                  text-sm
                  text-slate-600
                  appearance-none
                  cursor-pointer
                  focus:border-blue-300
                  focus:ring-2
                  focus:ring-blue-100
                "
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <ChevronDown
                size={15}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  pointer-events-none
                "
              />

            </div>

          </div>


          {/* =================================================
              APPLICATION TABLE
          ================================================== */}

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

            {/* Table Heading */}
            <div
              className="
                px-6
                py-5
                border-b
                border-slate-100
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2 className="text-lg font-semibold text-slate-800">
                  All Applications
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Showing {filteredApplications.length} applications
                </p>

              </div>

            </div>


            {/* Table Header */}
            <div
              className="
                grid
                grid-cols-[1fr_1.3fr_1.15fr_1.55fr_1fr_0.9fr_0.7fr]
                px-6
                py-4
                bg-slate-50/40
                border-b
                border-slate-100
                text-[9px]
                font-semibold
                tracking-widest
                text-slate-400
              "
            >

              <span>APP ID</span>
              <span>STUDENT</span>
              <span>ROLL NO</span>
              <span>ROUTE</span>
              <span>DATE</span>
              <span>STATUS</span>
              <span>ACTION</span>

            </div>


           {/* Applications */}

{loading ? (

  // Loading State
  <div className="py-20 text-center">

    <div
      className="
        w-8
        h-8
        mx-auto
        border-2
        border-blue-200
        border-t-blue-600
        rounded-full
        animate-spin
      "
    />

    <p className="mt-4 text-sm text-slate-400">
      Loading applications...
    </p>

  </div>

) : error ? (

  // Error State
  <div className="py-20 text-center">

    <div
      className="
        w-14
        h-14
        mx-auto
        rounded-2xl
        bg-red-50
        flex
        items-center
        justify-center
        text-red-400
      "
    >
      <CircleX size={24} />
    </div>

    <h3 className="mt-4 text-lg font-semibold text-slate-700">
      Unable to load applications
    </h3>

    <p className="mt-1 text-sm text-red-400">
      {error}
    </p>

    <button
      onClick={() => window.location.reload()}
      className="
        mt-5
        px-5
        py-2.5
        rounded-xl
        bg-blue-600
        text-white
        text-sm
        font-semibold
        hover:bg-blue-700
        transition
      "
    >
      Try Again
    </button>

  </div>

) : filteredApplications.length > 0 ? (

  // Applications List
  filteredApplications.map((application) => (

    <div
      key={application.id}
      className="
        grid
        grid-cols-[1fr_1.3fr_1.15fr_1.55fr_1fr_0.9fr_0.7fr]
        items-center
        px-6
        py-5
        border-b
        border-slate-100
        text-sm
        hover:bg-white/50
        transition
      "
    >

      {/* Application ID */}
      <span className="text-blue-600 font-semibold text-xs">
        {application.id}
      </span>


      {/* Student */}
      <div>

        <p className="text-slate-700 font-medium">
          {application.studentName}
        </p>

        <p className="text-[10px] text-slate-400 mt-1">
          {application.course}
        </p>

      </div>


      {/* Roll Number */}
      <span className="text-slate-500 text-xs">
        {application.rollNo}
      </span>


      {/* Route */}
      <span className="text-slate-600 text-xs">
        {application.route}
      </span>


      {/* Date */}
      <span className="text-slate-500 text-xs">
        {application.date}
      </span>


      {/* Status */}
      <span
        className={`
          w-fit
          px-2.5
          py-1.5
          rounded-full
          text-[10px]
          font-semibold
          ${getStatusStyle(application.status)}
        `}
      >
        {application.status}
      </span>


      {/* Action */}
      <button
        onClick={() => {
          navigate(`/staff/applications/${application.id}`);
        }}
        className="
          w-fit
          flex
          items-center
          gap-1
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

  ))

) : (

  // Empty State
  <div className="py-20 text-center">

    <div
      className="
        w-14
        h-14
        mx-auto
        rounded-2xl
        bg-slate-100
        flex
        items-center
        justify-center
        text-slate-400
      "
    >
      <FileText size={24} />
    </div>

    <h3 className="mt-4 text-lg font-semibold text-slate-700">
      No applications found
    </h3>

    <p className="mt-1 text-sm text-slate-400">
      Try changing your search or filter.
    </p>

  </div>

)}

          </div>

        </main>

      </div>

    </div>
  );
};

export default StaffApplications;