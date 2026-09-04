import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock3,
  Search,
  Eye,
  FileText,
} from "lucide-react";

const StaffPending = () => {
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
        console.error(error);
        setError(
          error.message || "Unable to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  const pendingApplications = applications.filter(
    (application) =>
      application.status === "SUBMITTED" ||
      application.status === "COLLEGE_VERIFICATION"
  );

  const filteredApplications = pendingApplications.filter(
    (application) => {
      const searchText = search.toLowerCase();

      return (
        application.applicationNumber
          ?.toLowerCase()
          .includes(searchText) ||
        application.personalDetails?.fullName
          ?.toLowerCase()
          .includes(searchText) ||
        application.personalDetails?.rollNumber
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4efff] via-[#faf9ff] to-[#edf3ff] text-slate-800">

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Back Button */}

        <button
          onClick={() => navigate("/staff")}
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-600
            hover:text-slate-900
            transition
            mb-6
          "
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>


        {/* Header */}

        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-amber-50
                text-amber-500
                flex
                items-center
                justify-center
              "
            >
              <Clock3 size={21} />
            </div>

            <div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Pending Applications
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Applications waiting for college review.
              </p>

            </div>

          </div>

        </div>


        {/* Search */}

        <div
          className="
            bg-white/75
            backdrop-blur-xl
            border
            border-white
            rounded-2xl
            p-4
            mb-5
            shadow-[0_12px_35px_rgba(30,41,59,0.06)]
          "
        >

          <div className="relative w-full sm:max-w-md">

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
              placeholder="Search application or student..."
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
                text-sm
                focus:border-amber-400
                focus:ring-2
                focus:ring-amber-100
              "
            />

          </div>

        </div>


        {/* Applications */}

        <div
          className="
            bg-white/75
            backdrop-blur-xl
            border
            border-white
            rounded-2xl
            shadow-[0_15px_40px_rgba(30,41,59,0.07)]
            overflow-hidden
          "
        >

          {/* Desktop Header */}

          <div
            className="
              hidden
              md:grid
              grid-cols-[1fr_1.4fr_1fr_1.5fr_1fr_0.7fr]
              px-6
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


          {loading ? (

            <div className="py-16 text-center text-sm text-slate-400">
              Loading applications...
            </div>

          ) : error ? (

            <div className="py-16 text-center text-sm text-red-400">
              {error}
            </div>

          ) : filteredApplications.length === 0 ? (

            <div className="py-16 px-6 text-center">

              <FileText
                size={30}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-700">
                No pending applications
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                New applications will appear here.
              </p>

            </div>

          ) : (

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

                {/* Desktop */}

                <div
                  className="
                    hidden
                    md:grid
                    grid-cols-[1fr_1.4fr_1fr_1.5fr_1fr_0.7fr]
                    items-center
                    px-6
                    py-5
                    text-sm
                  "
                >

                  <span className="text-blue-600 font-semibold text-xs">
                    {application.applicationNumber}
                  </span>

                  <div>
                    <p className="font-medium text-slate-700">
                      {application.personalDetails?.fullName || "-"}
                    </p>

                    <p className="text-[10px] text-slate-400 mt-1">
                      {application.institutionDetails?.course || "-"}
                    </p>
                  </div>

                  <span className="text-xs text-slate-500">
                    {application.personalDetails?.rollNumber || "-"}
                  </span>

                  <span className="text-xs text-slate-600">
                    {application.journeyDetails?.fromStation || "-"}
                    {" → "}
                    {application.journeyDetails?.toStation || "-"}
                  </span>

                  <span className="text-xs text-slate-500">
                    {application.submittedAt
                      ? new Date(
                          application.submittedAt
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </span>

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
                    "
                  >
                    <Eye size={13} />
                    View
                  </button>

                </div>


                {/* Mobile Card */}

                <div className="md:hidden p-4">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <p className="text-xs font-bold text-blue-600">
                        {application.applicationNumber}
                      </p>

                      <h3 className="mt-1 font-semibold text-slate-800">
                        {application.personalDetails?.fullName || "-"}
                      </h3>

                      <p className="text-xs text-slate-400 mt-1">
                        Roll No:{" "}
                        {application.personalDetails?.rollNumber || "-"}
                      </p>

                    </div>

                    <span
                      className="
                        shrink-0
                        px-2.5
                        py-1
                        rounded-full
                        bg-amber-50
                        text-amber-600
                        text-[10px]
                        font-semibold
                      "
                    >
                      Pending
                    </span>

                  </div>


                  <div className="mt-4 space-y-2 text-xs">

                    <p className="text-slate-500">
                      <span className="font-medium text-slate-700">
                        Route:
                      </span>{" "}
                      {application.journeyDetails?.fromStation || "-"}
                      {" → "}
                      {application.journeyDetails?.toStation || "-"}
                    </p>

                    <p className="text-slate-500">
                      <span className="font-medium text-slate-700">
                        Submitted:
                      </span>{" "}
                      {application.submittedAt
                        ? new Date(
                            application.submittedAt
                          ).toLocaleDateString("en-IN")
                        : "-"}
                    </p>

                  </div>


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
                      py-2.5
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      text-xs
                      font-semibold
                    "
                  >
                    <Eye size={14} />
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

export default StaffPending;