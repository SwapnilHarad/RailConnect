import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  UserRound,
  FolderOpen,
  Route as RouteIcon,
  FileText,
  History,
  CheckCircle2,
  X,
  MapPin,
} from "lucide-react";

const StaffApplicationReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // =====================================================
  // STATES
  // =====================================================

  const [verified, setVerified] = useState(false);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // =====================================================
  // FETCH APPLICATION
  // =====================================================

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("staffToken");

        if (!token) {
          navigate("/staff/login");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/staff/applications/${id}`,
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
            data.message || "Failed to fetch application"
          );
        }

        setApplication(data.application);
      } catch (error) {
        console.error("Fetch Application Error:", error);

        setError(
          error.message || "Unable to load application"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, navigate]);

  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    navigate("/staff/applications");
  };

  // =====================================================
  // UPDATE APPLICATION STATUS
  // =====================================================

  const updateApplicationStatus = async (status) => {
    if (!verified) {
      alert(
        "Please confirm that you have verified all details and documents."
      );
      return;
    }

    if (!application?.applicationNumber) {
      alert("Application number not found.");
      return;
    }

    try {
      setActionLoading(true);

      const token = localStorage.getItem("staffToken");

      if (!token) {
        navigate("/staff/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/staff/applications/${application.applicationNumber}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update application"
        );
      }

      setApplication(data.application);

      alert(
        status === "COLLEGE_APPROVED"
          ? "Application approved successfully."
          : "Application rejected successfully."
      );

      navigate("/staff/applications");
    } catch (error) {
      console.error(
        "Update Application Status Error:",
        error
      );

      alert(
        error.message || "Unable to update application"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // APPROVE
  // =====================================================

  const handleApprove = () => {
    updateApplicationStatus("COLLEGE_APPROVED");
  };

  // =====================================================
  // REJECT
  // =====================================================

  const handleReject = () => {
    updateApplicationStatus("COLLEGE_REJECTED");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4efff] via-[#faf9ff] to-[#edf3ff] px-5">
        <div className="text-center">
          <div
            className="
              w-9
              h-9
              mx-auto
              border-2
              border-blue-200
              border-t-blue-600
              rounded-full
              animate-spin
            "
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading application...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4efff] via-[#faf9ff] to-[#edf3ff] px-5">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold">
            Unable to load application
          </div>

          <p className="text-sm text-slate-400 mt-2">
            {error || "Application not found"}
          </p>

          <button
            onClick={handleBack}
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
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // STATUS
  // =====================================================

  const getStatusText = () => {
    if (application.status === "COLLEGE_APPROVED") {
      return "Approved";
    }

    if (application.status === "COLLEGE_REJECTED") {
      return "Rejected";
    }

    return "Pending Review";
  };

  // =====================================================
  // MAIN PAGE
  // =====================================================

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

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main
        className="
          w-full
          max-w-[1150px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-5
          sm:py-7
          lg:py-8
          pb-36
        "
      >

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          onClick={handleBack}
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
          "
        >
          <ArrowLeft size={16} />

          <span>Back to Applications</span>
        </button>

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-start
            sm:justify-between
            gap-4
            mb-6
            sm:mb-8
          "
        >

          <div className="min-w-0">

            <h1
              className="
                text-xl
                sm:text-2xl
                lg:text-[27px]
                font-semibold
                text-slate-900
                break-words
              "
            >
              Review Application #
              {application.applicationNumber}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Submitted on{" "}

              {application.submittedAt
                ? new Date(
                    application.submittedAt
                  ).toLocaleDateString("en-IN")
                : "-"}

              {" "}at{" "}

              {application.submittedAt
                ? new Date(
                    application.submittedAt
                  ).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </p>

          </div>

          {/* Status */}

          <div
            className="
              self-start
              flex
              items-center
              gap-2
              px-3
              sm:px-4
              py-2
              rounded-full
              bg-purple-100/80
              text-purple-700
              text-[10px]
              sm:text-xs
              font-semibold
              whitespace-nowrap
            "
          >
            <History size={13} />

            {getStatusText()}
          </div>

        </div>

        {/* =================================================
            RESPONSIVE LAYOUT

            Mobile:
            1 column

            Desktop:
            Left + Right
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[minmax(0,1fr)_300px]
            gap-5
            lg:gap-6
          "
        >

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-5">

            {/* =================================================
                STUDENT PROFILE
            ================================================= */}

            <div
              className="
                bg-white/75
                backdrop-blur-xl
                border
                border-white
                rounded-2xl
                p-4
                sm:p-6
                lg:p-7
                shadow-[0_12px_35px_rgba(30,41,59,0.06)]
              "
            >

              {/* Heading */}

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <UserRound size={18} />
                </div>

                <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                  Student Profile
                </h2>

              </div>

              {/* Student Header */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  sm:gap-4
                  mb-6
                "
              >

                {/* Avatar */}

                <div
                  className="
                    w-12
                    h-12
                    sm:w-14
                    sm:h-14
                    rounded-full
                    bg-gradient-to-br
                    from-blue-100
                    to-purple-100
                    border
                    border-white
                    flex
                    items-center
                    justify-center
                    text-blue-600
                    text-lg
                    sm:text-xl
                    font-bold
                    shrink-0
                  "
                >
                  {application.personalDetails?.fullName
                    ?.charAt(0)
                    ?.toUpperCase() || "S"}
                </div>

                <div className="min-w-0">

                  <h3
                    className="
                      text-base
                      sm:text-lg
                      font-semibold
                      text-slate-800
                      break-words
                    "
                  >
                    {application.personalDetails?.fullName ||
                      "Unknown Student"}
                  </h3>

                  <p
                    className="
                      text-xs
                      sm:text-sm
                      text-slate-500
                      mt-0.5
                      break-words
                    "
                  >
                    {application.personalDetails?.academicYear ||
                      "-"}

                    {", "}

                    {application.institutionDetails?.course ||
                      "-"}
                  </p>

                </div>

              </div>

              {/* Student Information */}

              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-x-4
                  sm:gap-x-6
                  lg:gap-x-8
                  gap-y-5
                  sm:gap-y-6
                "
              >

                <InfoItem
                  label="PRN NUMBER"
                  value={
                    application.personalDetails?.prnNumber ||
                    "-"
                  }
                />

                <InfoItem
                  label="DATE OF BIRTH"
                  value={
                    application.personalDetails?.dateOfBirth ||
                    "-"
                  }
                />

                <InfoItem
                  label="ROLL NUMBER"
                  value={
                    application.personalDetails?.rollNumber ||
                    "-"
                  }
                />

                <InfoItem
                  label="EMAIL ADDRESS"
                  value={
                    application.personalDetails?.email ||
                    "-"
                  }
                />

                <InfoItem
                  label="PHONE NUMBER"
                  value={
                    application.personalDetails?.mobileNumber ||
                    "-"
                  }
                />

                <InfoItem
                  label="BRANCH"
                  value={
                    application.personalDetails?.branch ||
                    "-"
                  }
                />

              </div>

            </div>

            {/* =================================================
                CONCESSION ROUTE
            ================================================= */}

            <div
              className="
                bg-white/75
                backdrop-blur-xl
                border
                border-white
                rounded-2xl
                p-4
                sm:p-6
                lg:p-7
                shadow-[0_12px_35px_rgba(30,41,59,0.06)]
              "
            >

              {/* Heading */}

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <RouteIcon size={18} />
                </div>

                <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                  Concession Route
                </h2>

              </div>

              {/* Route Card */}

              <div
                className="
                  rounded-xl
                  border
                  border-slate-100
                  bg-white/60
                  p-4
                  sm:p-6
                "
              >

                <div className="relative">

                  {/* Vertical Line */}

                  <div
                    className="
                      absolute
                      left-[13px]
                      top-[25px]
                      bottom-[25px]
                      w-px
                      bg-slate-200
                    "
                  />

                  {/* Source */}

                  <div
                    className="
                      relative
                      flex
                      items-start
                      gap-4
                    "
                  >

                    <div
                      className="
                        w-7
                        h-7
                        rounded-full
                        bg-blue-50
                        border
                        border-blue-100
                        text-blue-600
                        flex
                        items-center
                        justify-center
                        z-10
                        shrink-0
                      "
                    >
                      <MapPin size={14} />
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          text-[8px]
                          sm:text-[9px]
                          font-semibold
                          tracking-widest
                          text-slate-400
                        "
                      >
                        SOURCE STATION
                      </p>

                      <p
                        className="
                          text-sm
                          sm:text-base
                          font-semibold
                          text-slate-800
                          mt-1
                          break-words
                        "
                      >
                        {application.journeyDetails?.fromStation ||
                          "-"}
                      </p>

                    </div>

                  </div>

                  {/* Destination */}

                  <div
                    className="
                      relative
                      flex
                      items-start
                      gap-4
                      mt-7
                    "
                  >

                    <div
                      className="
                        w-7
                        h-7
                        rounded-full
                        bg-slate-100
                        border
                        border-slate-200
                        text-slate-500
                        flex
                        items-center
                        justify-center
                        z-10
                        shrink-0
                      "
                    >
                      <MapPin size={14} />
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          text-[8px]
                          sm:text-[9px]
                          font-semibold
                          tracking-widest
                          text-slate-400
                        "
                      >
                        DESTINATION STATION
                      </p>

                      <p
                        className="
                          text-sm
                          sm:text-base
                          font-semibold
                          text-slate-800
                          mt-1
                          break-words
                        "
                      >
                        {application.journeyDetails?.toStation ||
                          "-"}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              DOCUMENTS
          ================================================= */}

          <div
            className="
              bg-white/75
              backdrop-blur-xl
              border
              border-white
              rounded-2xl
              p-4
              sm:p-6
              shadow-[0_12px_35px_rgba(30,41,59,0.06)]
              h-fit
            "
          >

            {/* Heading */}

            <div className="flex items-center gap-3 mb-5">

              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <FolderOpen size={19} />
              </div>

              <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                Documents
              </h2>

            </div>

            {/* Documents */}

            <div className="grid grid-cols-1 gap-3">

              <DocumentItem
                title="Fee Receipt"
                file={application.documents?.feeReceipt}
                color="blue"
              />

              <DocumentItem
                title="College ID"
                file={application.documents?.collegeId}
                color="purple"
              />

              <DocumentItem
                title="Aadhaar Card"
                file={application.documents?.aadhaarCard}
                color="emerald"
              />

              <DocumentItem
                title="Previous Railway Pass"
                file={application.documents?.previousPass}
                color="orange"
              />

            </div>

          </div>

        </div>

      </main>

      {/* =====================================================
          BOTTOM ACTION BAR
      ====================================================== */}

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          bg-white/95
          backdrop-blur-2xl
          border-t
          border-slate-200
          shadow-[0_-10px_30px_rgba(30,41,59,0.08)]
          z-50
        "
      >

        <div
          className="
            max-w-[1150px]
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-3
            sm:py-4
          "
        >

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
            "
          >

            {/* Verification */}

            <label
              className="
                flex
                items-start
                gap-2.5
                cursor-pointer
                text-[10px]
                sm:text-xs
                lg:text-sm
                text-slate-600
                leading-relaxed
              "
            >

              <input
                type="checkbox"
                checked={verified}
                onChange={(e) =>
                  setVerified(e.target.checked)
                }
                className="
                  w-[17px]
                  h-[17px]
                  mt-0.5
                  accent-blue-600
                  cursor-pointer
                  shrink-0
                "
              />

              <span>
                I have thoroughly verified all details and
                attached documents.
              </span>

            </label>

            {/* Buttons */}

            <div
              className="
                flex
                items-center
                gap-2
                w-full
                sm:w-auto
              "
            >

              {/* Reject */}

              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  px-3
                  sm:px-5
                  lg:px-7
                  py-2.5
                  sm:py-3
                  rounded-xl
                  bg-red-50
                  border
                  border-red-100
                  text-red-500
                  font-semibold
                  text-[10px]
                  sm:text-xs
                  lg:text-sm
                  hover:bg-red-100
                  active:scale-[0.98]
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  flex-1
                  sm:flex-none
                "
              >
                <X size={15} />

                <span>
                  {actionLoading
                    ? "Processing..."
                    : "Reject Application"}
                </span>
              </button>

              {/* Approve */}

              <button
                onClick={handleApprove}
                disabled={actionLoading}
                className="
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  px-3
                  sm:px-5
                  lg:px-7
                  py-2.5
                  sm:py-3
                  rounded-xl
                  bg-blue-600
                  text-white
                  font-semibold
                  text-[10px]
                  sm:text-xs
                  lg:text-sm
                  shadow-[0_8px_20px_rgba(37,99,235,0.25)]
                  hover:bg-blue-700
                  active:scale-[0.98]
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  flex-1
                  sm:flex-none
                "
              >
                <CheckCircle2 size={15} />

                <span>
                  {actionLoading
                    ? "Processing..."
                    : "Approve Application"}
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

// =============================================================
// INFORMATION COMPONENT
// =============================================================

const InfoItem = ({ label, value }) => {
  return (
    <div className="min-w-0">

      <p
        className="
          text-[8px]
          sm:text-[9px]
          font-semibold
          tracking-widest
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          text-xs
          sm:text-sm
          text-slate-700
          mt-1
          break-words
          overflow-wrap-anywhere
        "
      >
        {value}
      </p>

    </div>
  );
};

// =============================================================
// DOCUMENT COMPONENT
// =============================================================

const DocumentItem = ({
  title,
  file,
  color,
}) => {

  const colorClasses = {

    blue: {
      icon: "bg-blue-50 text-blue-600",
      button:
        "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },

    purple: {
      icon: "bg-purple-50 text-purple-600",
      button:
        "bg-purple-50 text-purple-600 hover:bg-purple-100",
    },

    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      button:
        "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
    },

    orange: {
      icon: "bg-orange-50 text-orange-600",
      button:
        "bg-orange-50 text-orange-600 hover:bg-orange-100",
    },

  };

  const styles =
    colorClasses[color] ||
    colorClasses.blue;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
        p-3
        sm:p-4
        rounded-xl
        sm:rounded-2xl
        bg-white/60
        border
        border-slate-100
        min-w-0
      "
    >

      {/* File information */}

      <div
        className="
          flex
          items-center
          gap-2.5
          sm:gap-3
          min-w-0
        "
      >

        <div
          className={`
            w-9
            h-9
            sm:w-10
            sm:h-10
            rounded-xl
            flex
            items-center
            justify-center
            shrink-0
            ${styles.icon}
          `}
        >
          <FileText size={17} />
        </div>

        <div className="min-w-0">

          <p
            className="
              text-xs
              sm:text-sm
              font-semibold
              text-slate-700
              truncate
            "
          >
            {title}
          </p>

          <p
            className="
              text-[9px]
              sm:text-[11px]
              text-slate-400
              mt-0.5
            "
          >
            {file ? "Uploaded" : "Not uploaded"}
          </p>

        </div>

      </div>

      {/* View button */}

      {file && (
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            px-2.5
            sm:px-3
            py-1.5
            sm:py-2
            rounded-lg
            text-[9px]
            sm:text-xs
            font-semibold
            transition
            shrink-0
            ${styles.button}
          `}
        >
          View
        </a>
      )}

    </div>
  );
};

export default StaffApplicationReview;