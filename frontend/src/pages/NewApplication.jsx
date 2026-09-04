import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaArrowLeft,
    FaArrowRight,
    FaCheck,
    FaUserGraduate,
    FaBuildingColumns,
    FaRoute,
    FaFile,
    FaClipboardCheck,
    FaUpload,
} from "react-icons/fa6";

function NewApplication() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
     const [showError, setShowError] = useState(false);
    const [submittedApplication, setSubmittedApplication] = useState(null);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        // Personal
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        mobileNumber: "",
        prnNumber: "",
        rollNumber: "",
        branch: "",
        division: "",
        academicYear: "",
        semester: "",

        // Institution
        university: "",
        collegeName: "",
        collegeCode: "",
        course: "",
        collegeAddress: "",

        // Journey
        fromStation: "",
        toStation: "",
        preferredRoute: "",
        ticketType: "",
        passDuration: "",
        travelClass: "",

        // Documents
        feeReceipt: null,
        collegeId: null,
        aadhaarCard: null,
        previousPass: null,
    });

    // Load existing student information
    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            const user = JSON.parse(savedUser);

            setFormData((prev) => ({
                ...prev,
                fullName: user.fullName || "",
                email: user.email || "",
                mobileNumber: user.mobileNumber || "",
                prnNumber: user.prnNumber || "",
                rollNumber: user.rollNumber || "",
                branch: user.branch || "",
                division: user.division || "",
                dateOfBirth: user.dateOfBirth || "",
                gender: user.gender || "",
            }));
        }
    }, []);

    // Update form fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const uploadDocument = async (file) => {
        if (!file) {
            return "";
        }

        const data = new FormData();

        data.append("document", file);

        const response = await axios.post(
            "http://localhost:5000/api/upload",
            data
        );

        return response.data.fileUrl;
    };

    // Handle document upload
    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (files && files[0]) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        }
    };

    // Next step
    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    // Previous step
    const previousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);

            const savedUser = localStorage.getItem("user");

            if (!savedUser) {
                setErrorMessage("Please login again.");
                setShowError(true);
                return;
            }


            const user = JSON.parse(savedUser);

            console.log("Uploading documents...");

            const feeReceiptUrl = await uploadDocument(formData.feeReceipt);

            const collegeIdUrl = await uploadDocument(formData.collegeId);

            const aadhaarCardUrl = await uploadDocument(formData.aadhaarCard);

            const previousPassUrl = await uploadDocument(formData.previousPass);

            const applicationData = {

                applicationNumber: `RC-${Date.now()}`,

                studentId: user.id,

                personalDetails: {
                    fullName: formData.fullName,
                    dateOfBirth: formData.dateOfBirth,
                    gender: formData.gender,
                    email: formData.email,
                    mobileNumber: formData.mobileNumber,
                    prnNumber: formData.prnNumber,
                    rollNumber: formData.rollNumber,
                    branch: formData.branch,
                    division: formData.division,
                    academicYear: formData.academicYear,
                    semester: formData.semester,
                },

                institutionDetails: {
                    university: formData.university,
                    collegeName: formData.collegeName,
                    collegeCode: formData.collegeCode,
                    course: formData.course,
                    collegeAddress: formData.collegeAddress,
                },

                journeyDetails: {
                    fromStation: formData.fromStation,
                    toStation: formData.toStation,
                    preferredRoute: formData.preferredRoute,
                    ticketType: formData.ticketType,
                    passDuration: formData.passDuration,
                    travelClass: formData.travelClass,
                },

                documents: {
                    feeReceipt: feeReceiptUrl,
                    collegeId: collegeIdUrl,
                    aadhaarCard: aadhaarCardUrl,
                    previousPass: previousPassUrl,
                },
            };

            const response = await axios.post(
                "http://localhost:5000/api/applications",
                applicationData
            );

            console.log("Application Response:", response.data);

            setSubmittedApplication(response.data.application);

            setShowSuccess(true);

        } catch (error) {
            console.error(
                "Application Submission Error:",
                error.response?.data || error.message
            );

            setErrorMessage(
                error.response?.data?.message ||
                "Something went wrong while submitting your application."
            );

            setShowError(true);
        } finally {

            setIsSubmitting(false);

        }
    };

    const steps = [
        {
            number: 1,
            title: "Personal",
            icon: <FaUserGraduate />,
        },
        {
            number: 2,
            title: "Institution",
            icon: <FaBuildingColumns />,
        },
        {
            number: 3,
            title: "Journey",
            icon: <FaRoute />,
        },
        {
            number: 4,
            title: "Documents",
            icon: <FaFile />,
        },
        {
            number: 5,
            title: "Review",
            icon: <FaClipboardCheck />,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6"
        >
            {/* ================= SUCCESS POPUP ================= */}

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-6"
                    >

                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 30 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                            className="w-full max-w-md rounded-[30px] border border-white/60 bg-white/50 backdrop-blur-2xl shadow-2xl p-8 text-center"
                        >

                            {/* Success Icon */}

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15 text-green-600 shadow-inner">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">

                                    <FaCheck size={24} />

                                </div>

                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-gray-800">
                                Application Submitted!
                            </h2>

                            <p className="mt-3 text-gray-600 leading-relaxed">
                                Your railway concession application has been
                                submitted successfully.
                            </p>

                            {/* Application ID */}

                            {submittedApplication?.applicationNumber && (
                                <div className="mt-6 rounded-2xl border border-white/70 bg-white/40 px-5 py-4">

                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Application ID
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-blue-600">
                                        {submittedApplication.applicationNumber}
                                    </p>

                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => {
                                    setShowSuccess(false);
                                    navigate("/studentDashboard");
                                }}
                                className="mt-7 w-full rounded-2xl bg-blue-600 py-3.5 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Continue
                            </button>

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* ================= ERROR POPUP ================= */}

            <AnimatePresence>
                {showError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-6"
                    >

                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 30 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                            className="w-full max-w-md rounded-[30px] border border-white/60 bg-white/50 backdrop-blur-2xl shadow-2xl p-8 text-center"
                        >

                            {/* Error Icon */}

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 text-red-600">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg text-2xl font-bold">
                                    ×
                                </div>

                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-gray-800">
                                Submission Failed
                            </h2>

                            <p className="mt-3 text-gray-600 leading-relaxed">
                                {errorMessage}
                            </p>

                            <button
                                type="button"
                                onClick={() => setShowError(false)}
                                className="mt-7 w-full rounded-2xl bg-blue-600 py-3.5 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Try Again
                            </button>

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
            <div className="w-full max-w-6xl">

                {/* Main Glass Card */}
                <div className="rounded-[32px] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="px-6 sm:px-10 pt-8">

                        <div className="text-center">

                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                                New Concession Application
                            </h1>

                            <p className="mt-2 text-gray-500">
                                Complete the following steps to submit your application.
                            </p>

                        </div>

                        {/* Stepper */}
                        <div className="mt-10 flex items-start justify-center w-full">

                            {steps.map((step, index) => {

                                const isCompleted = currentStep > step.number;
                                const isCurrent = currentStep === step.number;

                                return (
                                    <div
                                        key={step.number}
                                        className="flex items-start flex-1 max-w-[180px]"
                                    >

                                        {/* Step */}
                                        <div className="flex flex-col items-center min-w-[55px]">

                                            <motion.div
                                                animate={{
                                                    scale: isCurrent ? 1.08 : 1,
                                                }}
                                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${isCompleted || isCurrent
                                                        ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                                                        : "border-gray-300 bg-white/50 text-gray-400"
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <FaCheck size={14} />
                                                ) : (
                                                    step.icon
                                                )}
                                            </motion.div>

                                            <span
                                                className={`mt-2 text-[11px] sm:text-xs font-semibold text-center ${isCurrent || isCompleted
                                                        ? "text-blue-600"
                                                        : "text-gray-400"
                                                    }`}
                                            >
                                                {step.title}
                                            </span>

                                        </div>

                                        {/* Line */}
                                        {index < steps.length - 1 && (
                                            <div className="flex-1 px-1 sm:px-3 mt-5">

                                                <div
                                                    className={`h-[3px] rounded-full transition-all duration-500 ${currentStep > step.number
                                                            ? "bg-blue-600"
                                                            : "bg-gray-200/80"
                                                        }`}
                                                />

                                            </div>
                                        )}

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                    {/* Step Content */}
                    <div className="px-6 sm:px-10 py-10">

                        <AnimatePresence mode="wait">

                            {/* ================= STEP 1 ================= */}

                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.35 }}
                                >

                                    <StepHeading
                                        number="Step 1"
                                        title="Personal Details"
                                        description="Verify your personal and academic information."
                                    />

                                    <div className="grid md:grid-cols-2 gap-5 mt-8">

                                        <InputField
                                            label="Full Name"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                        />

                                        <InputField
                                            label="Date of Birth"
                                            name="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                        />

                                        <SelectField
                                            label="Gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            options={[
                                                "Male",
                                                "Female",
                                                "Other",
                                            ]}
                                        />

                                        <InputField
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                        />

                                        <InputField
                                            label="Mobile Number"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            placeholder="Enter mobile number"
                                        />

                                        <InputField
                                            label="PRN Number"
                                            name="prnNumber"
                                            value={formData.prnNumber}
                                            onChange={handleChange}
                                            placeholder="Enter PRN number"
                                        />

                                        <InputField
                                            label="Roll Number"
                                            name="rollNumber"
                                            value={formData.rollNumber}
                                            onChange={handleChange}
                                            placeholder="Enter roll number"
                                        />

                                        <SelectField
                                            label="Branch"
                                            name="branch"
                                            value={formData.branch}
                                            onChange={handleChange}
                                            options={[
                                                "CSE",
                                                "IT",
                                                "EXTC",
                                                "ENTC",
                                                "Mechanical",
                                                "Civil",
                                                "Electrical",
                                                "Other",
                                            ]}
                                        />

                                        <InputField
                                            label="Division"
                                            name="division"
                                            value={formData.division}
                                            onChange={handleChange}
                                            placeholder="e.g. A"
                                        />

                                        <SelectField
                                            label="Academic Year"
                                            name="academicYear"
                                            value={formData.academicYear}
                                            onChange={handleChange}
                                            options={[
                                                "2025-26",
                                                "2026-27",
                                                "2027-28",
                                            ]}
                                        />

                                        <SelectField
                                            label="Current Semester"
                                            name="semester"
                                            value={formData.semester}
                                            onChange={handleChange}
                                            options={[
                                                "Semester 1",
                                                "Semester 2",
                                                "Semester 3",
                                                "Semester 4",
                                                "Semester 5",
                                                "Semester 6",
                                                "Semester 7",
                                                "Semester 8",
                                            ]}
                                        />

                                    </div>

                                </motion.div>
                            )}

                            {/* ================= STEP 2 ================= */}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.35 }}
                                >

                                    <StepHeading
                                        number="Step 2"
                                        title="Institution Details"
                                        description="Provide the details of your college or institution."
                                    />

                                    <div className="grid md:grid-cols-2 gap-5 mt-8">

                                        <InputField
                                            label="University"
                                            name="university"
                                            value={formData.university}
                                            onChange={handleChange}
                                            placeholder="Enter university name"
                                        />

                                        <InputField
                                            label="College Name"
                                            name="collegeName"
                                            value={formData.collegeName}
                                            onChange={handleChange}
                                            placeholder="Enter college name"
                                        />

                                        <InputField
                                            label="College Code"
                                            name="collegeCode"
                                            value={formData.collegeCode}
                                            onChange={handleChange}
                                            placeholder="Enter college code"
                                        />

                                        <InputField
                                            label="Course / Degree"
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                            placeholder="e.g. B.E. / B.Tech"
                                        />

                                        <div className="md:col-span-2">

                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                College Address
                                            </label>

                                            <textarea
                                                name="collegeAddress"
                                                value={formData.collegeAddress}
                                                onChange={handleChange}
                                                placeholder="Enter college address"
                                                rows="4"
                                                className="w-full rounded-2xl border border-gray-300 bg-white/40 backdrop-blur-xl px-4 py-3 outline-none text-gray-700 placeholder-gray-400 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

                                        </div>

                                    </div>

                                </motion.div>
                            )}

                            {/* ================= STEP 3 ================= */}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.35 }}
                                >

                                    <StepHeading
                                        number="Step 3"
                                        title="Journey Details"
                                        description="Tell us about your regular railway journey."
                                    />

                                    <div className="grid md:grid-cols-2 gap-5 mt-8">

                                        <InputField
                                            label="From Station"
                                            name="fromStation"
                                            value={formData.fromStation}
                                            onChange={handleChange}
                                            placeholder="E.g. Dadar - Mumbai"
                                        />

                                        <InputField
                                            label="To Station"
                                            name="toStation"
                                            value={formData.toStation}
                                            onChange={handleChange}
                                            placeholder="E.g. Thane"
                                        />

                                        <div className="md:col-span-2">

                                            <InputField
                                                label="Preferred Route (Optional)"
                                                name="preferredRoute"
                                                value={formData.preferredRoute}
                                                onChange={handleChange}
                                                placeholder="Specify via station if any"
                                            />

                                        </div>

                                        <SelectField
                                            label="Ticket Type"
                                            name="ticketType"
                                            value={formData.ticketType}
                                            onChange={handleChange}
                                            options={[
                                                "Season Ticket",
                                                "Term Pass",
                                            ]}
                                        />

                                        <SelectField
                                            label="Pass Duration"
                                            name="passDuration"
                                            value={formData.passDuration}
                                            onChange={handleChange}
                                            options={[
                                                "Monthly",
                                                "Quarterly",
                                                "Half-Yearly",
                                                "Yearly",
                                            ]}
                                        />

                                        <SelectField
                                            label="Travel Class"
                                            name="travelClass"
                                            value={formData.travelClass}
                                            onChange={handleChange}
                                            options={[
                                                "Second Class",
                                                "First Class",
                                            ]}
                                        />

                                    </div>

                                </motion.div>
                            )}

                            {/* ================= STEP 4 ================= */}

                            {currentStep === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.35 }}
                                >

                                    <StepHeading
                                        number="Step 4"
                                        title="Documents"
                                        description="Upload the documents required for verification."
                                    />

                                    <div className="grid md:grid-cols-2 gap-5 mt-8">

                                        <FileUpload
                                            label="Latest Fee Receipt"
                                            name="feeReceipt"
                                            file={formData.feeReceipt}
                                            onChange={handleFileChange}
                                            required
                                        />

                                        <FileUpload
                                            label="College ID Card"
                                            name="collegeId"
                                            file={formData.collegeId}
                                            onChange={handleFileChange}
                                            required
                                        />

                                        <FileUpload
                                            label="Aadhaar Card"
                                            name="aadhaarCard"
                                            file={formData.aadhaarCard}
                                            onChange={handleFileChange}
                                        />

                                        <FileUpload
                                            label="Previous Railway Pass"
                                            name="previousPass"
                                            file={formData.previousPass}
                                            onChange={handleFileChange}
                                        />

                                    </div>

                                    <div className="mt-6 rounded-2xl border border-blue-200/50 bg-blue-50/40 p-4">

                                        <p className="text-sm text-blue-700">
                                            Accepted formats: PDF, JPG, JPEG and PNG.
                                            Maximum file size will be validated when we connect
                                            the backend upload system.
                                        </p>

                                    </div>

                                </motion.div>
                            )}

                            {/* ================= STEP 5 ================= */}

                            {currentStep === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.35 }}
                                >

                                    <StepHeading
                                        number="Step 5"
                                        title="Review Application"
                                        description="Review your information before submitting."
                                    />

                                    <div className="space-y-5 mt-8">

                                        <ReviewSection
                                            title="Personal Details"
                                            items={[
                                                ["Full Name", formData.fullName],
                                                ["Date of Birth", formData.dateOfBirth],
                                                ["Gender", formData.gender],
                                                ["Email", formData.email],
                                                ["Mobile", formData.mobileNumber],
                                                ["PRN", formData.prnNumber],
                                                ["Roll Number", formData.rollNumber],
                                                ["Branch", formData.branch],
                                                ["Division", formData.division],
                                                ["Academic Year", formData.academicYear],
                                                ["Semester", formData.semester],
                                            ]}
                                        />

                                        <ReviewSection
                                            title="Institution Details"
                                            items={[
                                                ["University", formData.university],
                                                ["College", formData.collegeName],
                                                ["College Code", formData.collegeCode],
                                                ["Course", formData.course],
                                                ["Address", formData.collegeAddress],
                                            ]}
                                        />

                                        <ReviewSection
                                            title="Journey Details"
                                            items={[
                                                ["From Station", formData.fromStation],
                                                ["To Station", formData.toStation],
                                                ["Preferred Route", formData.preferredRoute],
                                                ["Ticket Type", formData.ticketType],
                                                ["Pass Duration", formData.passDuration],
                                                ["Travel Class", formData.travelClass],
                                            ]}
                                        />

                                        <div className="rounded-2xl border border-white/70 bg-white/30 backdrop-blur-xl p-5">

                                            <h3 className="font-bold text-gray-800">
                                                Uploaded Documents
                                            </h3>

                                            <div className="grid sm:grid-cols-2 gap-3 mt-4">

                                                <DocumentStatus
                                                    label="Latest Fee Receipt"
                                                    file={formData.feeReceipt}
                                                />

                                                <DocumentStatus
                                                    label="College ID Card"
                                                    file={formData.collegeId}
                                                />

                                                <DocumentStatus
                                                    label="Aadhaar Card"
                                                    file={formData.aadhaarCard}
                                                />

                                                <DocumentStatus
                                                    label="Previous Railway Pass"
                                                    file={formData.previousPass}
                                                />

                                            </div>

                                        </div>

                                        <div className="rounded-2xl border border-yellow-300/40 bg-yellow-100/30 p-5">

                                            <p className="text-sm text-gray-700">
                                                Please make sure all information and uploaded
                                                documents are correct before submitting your
                                                application.
                                            </p>

                                        </div>

                                    </div>

                                </motion.div>
                            )}

                        </AnimatePresence>

                    </div>

                    {/* Footer Navigation */}
                    <div className="flex items-center justify-between border-t border-white/50 px-6 sm:px-10 py-6">

                        <button
                            type="button"
                            onClick={()=>navigate("/studentDashboard")}
                            
                            className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition-all 
                                     "cursor-not-allowed border-gray-200 text-gray-300"
                                    : "border-white/70 bg-white/40 text-blue-600 hover:bg-white/70"
                                }`}
                        >
                            <FaArrowLeft />
                            Back
                        </button>

                        {currentStep < 5 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Next Step
                                <FaArrowRight />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 ${isSubmitting
                                        ? "cursor-not-allowed bg-blue-400"
                                        : "bg-green-600 hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98]"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FaCheck />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        )}

                    </div>

                </div>

            </div>

        </motion.div>
    );
}

/* =========================================================
   STEP HEADING
========================================================= */

function StepHeading({ number, title, description }) {
    return (
        <div>

            <p className="text-sm font-semibold text-blue-600">
                {number}
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-800">
                {title}
            </h2>

            <p className="mt-2 text-gray-500">
                {description}
            </p>

        </div>
    );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
}) {
    return (
        <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-gray-300 bg-white/40 backdrop-blur-xl px-4 py-3.5 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

        </div>
    );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
    label,
    name,
    value,
    onChange,
    options,
}) {
    return (
        <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}

                className="w-full rounded-2xl border border-gray-300 bg-white/40 backdrop-blur-xl px-4 py-3.5 text-gray-700 outline-none transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"      >

                <option value="">
                    Select {label}
                </option>

                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}

            </select>

        </div>
    );
}

/* =========================================================
   FILE UPLOAD
========================================================= */

function FileUpload({
    label,
    name,
    file,
    onChange,
    required = false,
}) {
    return (
        <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-blue-300/70 bg-white/30 p-5 backdrop-blur-xl transition hover:bg-white/50">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                    <FaUpload />
                </div>

                <div className="min-w-0">

                    <p className="font-medium text-gray-700">
                        {file ? file.name : "Choose a file"}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        PDF, JPG, JPEG or PNG
                    </p>

                </div>

                <input
                    type="file"
                    name={name}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={onChange}
                    className="hidden"
                />

            </label>

        </div>
    );
}

/* =========================================================
   REVIEW SECTION
========================================================= */

function ReviewSection({ title, items }) {
    return (
        <div className="rounded-2xl border border-white/70 bg-white/30 backdrop-blur-xl p-5">

            <h3 className="font-bold text-gray-800">
                {title}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">

                {items.map(([label, value]) => (
                    <div key={label}>

                        <p className="text-xs text-gray-400">
                            {label}
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-700 break-words">
                            {value || "Not provided"}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}

/* =========================================================
   DOCUMENT STATUS
========================================================= */

function DocumentStatus({ label, file }) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-white/40 px-4 py-3">

            <span className="text-sm text-gray-700">
                {label}
            </span>

            {file ? (
                <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                    <FaCheck />
                    Uploaded
                </span>
            ) : (
                <span className="text-sm text-gray-400">
                    Not uploaded
                </span>
            )}

        </div>
    );
}

export default NewApplication;