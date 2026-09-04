import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewApplications = () => {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                "http://localhost:5000/api/applications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setApplications(response.data.applications || []);

        } catch (error) {
            console.error(
                "Error fetching applications:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // Convert backend status into student-friendly status
    const getDisplayStatus = (status) => {
        switch (status) {
            case "SUBMITTED":
            case "COLLEGE_VERIFICATION":
                return "PENDING";

            case "COLLEGE_APPROVED":
                return "APPROVED";

            case "COLLEGE_REJECTED":
                return "REJECTED";

            case "RAILWAY_VERIFICATION":
                return "PENDING";

            case "APPROVED":
                return "APPROVED";

            case "REJECTED":
                return "REJECTED";

            default:
                return "PENDING";
        }
    };

    // Status badge styling
    const getStatusStyle = (status) => {
        const displayStatus = getDisplayStatus(status);

        switch (displayStatus) {
            case "APPROVED":
                return {
                    container:
                        "bg-green-100/80 border-green-200 text-green-700",
                    dot: "bg-green-500",
                };

            case "REJECTED":
                return {
                    container:
                        "bg-red-100/80 border-red-200 text-red-700",
                    dot: "bg-red-500",
                };

            default:
                return {
                    container:
                        "bg-yellow-100/80 border-yellow-200 text-yellow-700",
                    dot: "bg-yellow-500",
                };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-500 font-medium">
                    Loading applications...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-10 bg-gray-50">

            <div className="max-w-5xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/studentDashboard")}
                    className="
                        flex items-center gap-2
                        mb-6
                        px-4 py-2
                        rounded-2xl
                        bg-white/60
                        backdrop-blur-xl
                        border border-white/70
                        text-gray-700
                        font-medium
                        hover:bg-white/80
                        transition
                    "
                >
                    ← Back to Dashboard
                </button>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    View Applications
                </h1>

                <p className="mt-2 text-sm sm:text-base text-gray-500">
                    View your current and previous applications
                </p>

                {/* Applications */}
                <div className="mt-8 space-y-5">

                    {applications.length === 0 ? (

                        <div
                            className="
                                text-center
                                py-16
                                px-6
                                bg-white/70
                                backdrop-blur-xl
                                border border-white/60
                                rounded-3xl
                                shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                            "
                        >
                            <p className="text-gray-500">
                                No applications found.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/new-application")
                                }
                                className="
                                    mt-5
                                    px-5 py-3
                                    rounded-2xl
                                    bg-blue-600
                                    text-white
                                    font-semibold
                                    hover:bg-blue-700
                                    transition
                                "
                            >
                                Apply New Application
                            </button>
                        </div>

                    ) : (

                        applications.map((application) => {

                            const displayStatus =
                                getDisplayStatus(application.status);

                            const statusStyle =
                                getStatusStyle(application.status);

                            return (
                                <div
                                    key={application._id}
                                    className="
                                        bg-white/70
                                        backdrop-blur-xl
                                        border border-white/60
                                        rounded-3xl
                                        p-5 sm:p-6
                                        shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                            gap-5
                                        "
                                    >

                                        {/* Application Information */}
                                        <div className="min-w-0">

                                            <h2
                                                className="
                                                    text-lg sm:text-xl
                                                    font-semibold
                                                    text-gray-800
                                                "
                                            >
                                                Railway Concession
                                                Application
                                            </h2>

                                            <p
                                                className="
                                                    mt-3
                                                    text-sm
                                                    text-gray-500
                                                "
                                            >
                                                Application ID:
                                            </p>

                                            <p
                                                className="
                                                    font-semibold
                                                    text-gray-800
                                                    break-all
                                                "
                                            >
                                                {application.applicationNumber}
                                            </p>

                                            <p
                                                className="
                                                    mt-2
                                                    text-sm
                                                    text-gray-500
                                                "
                                            >
                                                Submitted on:{" "}
                                                {new Date(
                                                    application.submittedAt
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </p>

                                        </div>

                                        {/* Status */}
                                        <div
                                            className="
                                                flex
                                                flex-col
                                                sm:items-end
                                                gap-3
                                            "
                                        >

                                            <span
                                                className={`
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    w-fit
                                                    px-4 py-2
                                                    rounded-full
                                                    border
                                                    text-sm
                                                    font-semibold
                                                    ${statusStyle.container}
                                                `}
                                            >

                                                <span
                                                    className={`
                                                        w-2.5
                                                        h-2.5
                                                        rounded-full
                                                        ${statusStyle.dot}
                                                    `}
                                                />

                                                {displayStatus}

                                            </span>

                                            

                                        </div>

                                    </div>

                                </div>
                            );
                        })

                    )}

                </div>

            </div>

        </div>
    );
};

export default ViewApplications;