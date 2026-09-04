import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Search,
  Eye,
  FileText,
} from "lucide-react";

const StaffApproved = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("staffToken");

        if (!token) {
          navigate("/staff/login");
          return;
        }

        const response = await fetch(
           `${import.meta.env.VITE_API_URL}/api/staff/applications`,
          {
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
        console.error("Approved Applications Error:", error);
        setError(
          error.message || "Unable to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  // =====================================================
  // APPROVED APPLICATIONS
  // =====================================================

  const approvedApplications = applications.filter(
    (application) =>
      application.status === "COLLEGE_APPROVED" ||
      application.status === "APPROVED"
  );

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredApplications = approvedApplications.filter(
    (application) => {
      const searchText = search.toLowerCase().trim();

      return (
        application.applicationNumber
          ?.toLowerCase()
          .includes(searchText) ||
        application.personalDetails?.fullName
          ?.toLowerCase()
          .includes(searchText) ||
        application.personalDetails?.rollNumber
          ?.toLowerCase()
          .includes(searchText) ||
        application.institutionDetails?.course
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f4efff] via-[#faf9ff] to-[#edf3ff] text-slate-800">

      <main
        className="
          w-full
          max-w-[1400px]
          mx-auto
          px-3
          sm:px-5
          md:px-6
          lg:px-8
          py-4
          sm:py-6
          lg:py-8
        "
      >

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <button
          onClick={() => navigate("/staff/portal")}
          className="
            flex
            items-center
            gap-2
            text-xs
            sm:text-sm
            text-slate-600
            hover:text-slate-900
            transition
            mb-5
            sm:mb-7
          "
        >
          <ArrowLeft size={17} />
          <span>Back to Dashboard</span>
        </button>


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-5 sm:mb-7">

          <div className="flex items-start sm:items-center gap-3">

            <div
              className="
                w-10
                h-10
                sm:w-11
                sm:h-11
                shrink-0
                rounded-2xl
                bg-emerald-50
                text-emerald-600
                flex
                items-center
                justify-center
              "
            >
              <CheckCircle2
                size={20}
                className="sm:w-[21px] sm:h-[21px]"
              />
            </div>

            <div className="min-w-0">

              <h1
                className="
                  text-xl
                  sm:text-2xl
                  lg:text-3xl
                  font-bold
                  text-slate-900
                  leading-tight
                "
              >
                Approved Applications
              </h1>

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-slate-500
                  mt-1
                  leading-relaxed
                "
              >
                Applications approved by the college staff.
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div
          className="
            bg-white/75
            backdrop-blur-xl
            border
            border-white
            rounded-2xl
            p-3
            sm:p-4
            mb-5
            shadow-[0_12px_35px_rgba(30,41,59,0.06)]
          "
        >

          <div className="relative w-full sm:max-w-xl">

            <Search
              size={17}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search application, student or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl
                bg-white/70
                border
                border-slate-200
                outline-none
                text-xs
                sm:text-sm
                text-slate-700
                placeholder:text-slate-400
                focus:border-emerald-400
                focus:ring-2
                focus:ring-emerald-100
                transition
              "
            />

          </div>

        </div>


        {/* =====================================================
            APPLICATION CONTAINER
        ===================================================== */}

        <div
          className="
            bg-white/75
            backdrop-blur-xl
            border
            border-white
            rounded-2xl
            shadow-[0_15px_40px_rgba(30,41,59,0.07)]
            overflow-hidden
            w-full
          "
        >

          {/* =====================================================
              DESKTOP TABLE HEADER
          ===================================================== */}

          <div
            className="
              hidden
              md:grid
              grid-cols-[1fr_1.5fr_1fr_1.6fr_0.9fr_0.8fr]
              items-center
              gap-3
              px-5
              lg:px-6
              py-4
              border-b
              border-slate-100
              text-[10px]
              font-semibold
              tracking-wider
              text-slate-400
            "
          >
            <span>APPLICATION</span>
            <span>STUDENT</span>
            <span>ROLL NUMBER</span>
            <span>ROUTE</span>
            <span>DATE</span>
            <span>ACTION</span>
          </div>


          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (

            <div className="py-16 sm:py-20 text-center">

              <div
                className="
                  w-8
                  h-8
                  mx-auto
                  border-2
                  border-slate-200
                  border-t-emerald-500
                  rounded-full
                  animate-spin
                "
              />

              <p className="mt-4 text-xs sm:text-sm text-slate-400">
                Loading approved applications...
              </p>

            </div>


          ) : error ? (

            /* =====================================================
               ERROR
            ===================================================== */

            <div className="py-16 px-5 text-center">

              <XCircleIcon />

              <h3 className="mt-4 text-sm sm:text-base font-semibold text-red-500">
                Unable to load applications
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                {error}
              </p>

            </div>


          ) : filteredApplications.length === 0 ? (

            /* =====================================================
               EMPTY STATE
            ===================================================== */

            <div className="py-16 sm:py-20 px-5 text-center">

              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  rounded-2xl
                  bg-emerald-50
                  text-emerald-400
                  flex
                  items-center
                  justify-center
                "
              >
                <FileText size={25} />
              </div>

              <h3
                className="
                  mt-4
                  text-sm
                  sm:text-base
                  font-semibold
                  text-slate-700
                "
              >
                No approved applications
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Approved applications will appear here.
              </p>

            </div>


          ) : (

            /* =====================================================
               APPLICATION LIST
            ===================================================== */

            filteredApplications.map((application) => (

              <div
                key={application._id}
                className="
                  border-b
                  border-slate-100
                  last:border-b-0
                  hover:bg-white/50
                  transition
                "
              >

                {/* =================================================
                    DESKTOP ROW
                ================================================= */}

                <div
                  className="
                    hidden
                    md:grid
                    grid-cols-[1fr_1.5fr_1fr_1.6fr_0.9fr_0.8fr]
                    items-center
                    gap-3
                    px-5
                    lg:px-6
                    py-5
                    text-sm
                  "
                >

                  {/* Application */}

                  <div className="min-w-0">

                    <span
                      className="
                        text-blue-600
                        font-semibold
                        text-xs
                        break-all
                      "
                    >
                      {application.applicationNumber || "-"}
                    </span>

                  </div>


                  {/* Student */}

                  <div className="min-w-0">

                    <p
                      className="
                        text-slate-700
                        font-medium
                        truncate
                      "
                    >
                      {application.personalDetails?.fullName || "-"}
                    </p>

                    <p
                      className="
                        text-[10px]
                        text-slate-400
                        mt-1
                        truncate
                      "
                    >
                      {application.institutionDetails?.course || "-"}
                    </p>

                  </div>


                  {/* Roll Number */}

                  <span className="text-slate-500 text-xs truncate">
                    {application.personalDetails?.rollNumber || "-"}
                  </span>


                  {/* Route */}

                  <span
                    className="
                      text-slate-600
                      text-xs
                      truncate
                    "
                    title={`${application.journeyDetails?.fromStation || "-"} → ${application.journeyDetails?.toStation || "-"}`}
                  >
                    {application.journeyDetails?.fromStation || "-"}
                    {" → "}
                    {application.journeyDetails?.toStation || "-"}
                  </span>


                  {/* Date */}

                  <span className="text-slate-500 text-xs">
                    {formatDate(
                      application.updatedAt ||
                      application.submittedAt
                    )}
                  </span>


                  {/* Action */}

                  <button
                    onClick={() =>
                      navigate(
                        `/staff/applications/${application.applicationNumber}`
                      )
                    }
                    className="
                      w-fit
                      flex
                      items-center
                      justify-center
                      gap-1
                      px-3
                      py-2
                      rounded-lg
                      bg-blue-50
                      text-blue-600
                      text-xs
                      font-semibold
                      hover:bg-blue-100
                      active:scale-[0.98]
                      transition
                    "
                  >
                    <Eye size={13} />
                    View
                  </button>

                </div>


                {/* =================================================
                    MOBILE CARD
                ================================================= */}

                <div className="md:hidden p-4 sm:p-5">

                  {/* Top */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p
                        className="
                          text-[11px]
                          sm:text-xs
                          font-bold
                          text-blue-600
                          break-all
                        "
                      >
                        {application.applicationNumber || "-"}
                      </p>

                      <h3
                        className="
                          mt-1
                          text-sm
                          sm:text-base
                          font-semibold
                          text-slate-800
                          break-words
                        "
                      >
                        {application.personalDetails?.fullName || "-"}
                      </h3>

                      <p
                        className="
                          text-[11px]
                          sm:text-xs
                          text-slate-400
                          mt-1
                        "
                      >
                        Roll No:{" "}
                        {application.personalDetails?.rollNumber || "-"}
                      </p>

                    </div>


                    {/* Status */}

                    <span
                      className="
                        shrink-0
                        px-2.5
                        py-1
                        rounded-full
                        bg-emerald-50
                        text-emerald-600
                        text-[9px]
                        sm:text-[10px]
                        font-semibold
                      "
                    >
                      Approved
                    </span>

                  </div>


                  {/* Details */}

                  <div
                    className="
                      mt-4
                      pt-4
                      border-t
                      border-slate-100
                      space-y-2.5
                      text-xs
                      sm:text-sm
                    "
                  >

                    <div className="flex gap-2">

                      <span className="font-medium text-slate-700 shrink-0">
                        Course:
                      </span>

                      <span className="text-slate-500 break-words">
                        {application.institutionDetails?.course || "-"}
                      </span>

                    </div>


                    <div className="flex gap-2">

                      <span className="font-medium text-slate-700 shrink-0">
                        Route:
                      </span>

                      <span className="text-slate-500 break-words">
                        {application.journeyDetails?.fromStation || "-"}
                        {" → "}
                        {application.journeyDetails?.toStation || "-"}
                      </span>

                    </div>


                    <div className="flex gap-2">

                      <span className="font-medium text-slate-700 shrink-0">
                        Approved:
                      </span>

                      <span className="text-slate-500">
                        {formatDate(
                          application.updatedAt ||
                          application.submittedAt
                        )}
                      </span>

                    </div>

                  </div>


                  {/* View Button */}

                  <button
                    onClick={() =>
                      navigate(
                        `/staff/applications/${application.applicationNumber}`
                      )
                    }
                    className="
                      mt-4
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      text-xs
                      sm:text-sm
                      font-semibold
                      hover:bg-blue-100
                      active:scale-[0.98]
                      transition
                    "
                  >
                    <Eye size={15} />
                    View Application
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </main>

    </div>
  );
};


// =====================================================
// ERROR ICON
// =====================================================

const XCircleIcon = () => {
  return (
    <div
      className="
        w-14
        h-14
        mx-auto
        rounded-2xl
        bg-red-50
        text-red-400
        flex
        items-center
        justify-center
      "
    >
      <span className="text-2xl font-bold">×</span>
    </div>
  );
};

export default StaffApproved;