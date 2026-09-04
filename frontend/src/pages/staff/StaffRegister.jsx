import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    staffId: "",
    collegeName: "",
    collegeCode: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
         `${import.meta.env.VITE_API_URL}/api/staff/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Staff registered successfully! login to access portal");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        staffId: "",
        collegeName: "",
        collegeCode: "",
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-6 py-10 relative">

      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/staff/login")}
        className="
          absolute
          top-6
          left-6
          flex
          items-center
          gap-2
          px-4
          py-2.5
          rounded-xl
          bg-white/60
          backdrop-blur-xl
          border border-white/80
          text-slate-600
          font-medium
          shadow-[0_8px_25px_rgba(30,41,59,0.08)]
          hover:bg-white/80
          hover:text-purple-600
          active:scale-[0.97]
          transition-all
        "
      >
        <span className="text-lg">←</span>
        <span>Back to Login</span>
      </button>

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Rail<span className="text-purple-600">Connect</span>
          </h1>

          <p className="mt-2 text-slate-500">
            College Staff Portal
          </p>

        </div>

        {/* Registration Card */}
        <div
          className="
            bg-white/60
            backdrop-blur-2xl
            border border-white/80
            rounded-[28px]
            p-8
            shadow-[0_20px_60px_rgba(30,41,59,0.10)]
          "
        >

          <div className="mb-7">

            <h2 className="text-2xl font-bold text-slate-800">
              Staff Registration
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Create an account for your college staff portal.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="mb-4">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white/70
                  border border-slate-200
                  outline-none
                  focus:border-purple-400
                  focus:ring-2
                  focus:ring-purple-100
                  transition
                "
              />

            </div>

            {/* Staff ID */}
            <div className="mb-4">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Staff ID
              </label>

              <input
                type="text"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                placeholder="Enter staff ID"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white/70
                  border border-slate-200
                  outline-none
                  focus:border-purple-400
                  focus:ring-2
                  focus:ring-purple-100
                  transition
                "
              />

            </div>

            {/* Email */}
            <div className="mb-4">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Staff Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter staff email"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white/70
                  border border-slate-200
                  outline-none
                  focus:border-purple-400
                  focus:ring-2
                  focus:ring-purple-100
                  transition
                "
              />

            </div>

            {/* College Name */}
            <div className="mb-4">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                College Name
              </label>

              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Enter college name"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white/70
                  border border-slate-200
                  outline-none
                  focus:border-purple-400
                  focus:ring-2
                  focus:ring-purple-100
                  transition
                "
              />

            </div>

            {/* College Code */}
            <div className="mb-4">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                College Code
              </label>

              <input
                type="text"
                name="collegeCode"
                value={formData.collegeCode}
                onChange={handleChange}
                placeholder="Enter college code"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white/70
                  border border-slate-200
                  outline-none
                  focus:border-purple-400
                  focus:ring-2
                  focus:ring-purple-100
                  transition
                "
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white/70
                  border border-slate-200
                  outline-none
                  focus:border-purple-400
                  focus:ring-2
                  focus:ring-purple-100
                  transition
                "
              />

            </div>

            {/* Message */}
            {message && (
              <div className="mb-5 text-center text-sm text-purple-600">
                {message}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-3.5
                rounded-xl
                bg-purple-600
                text-white
                font-semibold
                hover:bg-purple-700
                active:scale-[0.98]
                transition-all
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Creating Account..." : "Create Staff Account"}
            </button>

          </form>

          {/* Note */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Authorized college staff only
          </p>

        </div>

      </div>

    </div>
  );
};

export default StaffRegister;