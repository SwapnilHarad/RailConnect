import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const StaffLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/staff/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store login information
      localStorage.setItem("staffToken", data.token);
      localStorage.setItem(
        "staff",
        JSON.stringify(data.staff)
      );

      // Go to Staff Portal
      navigate("/staff/portal");

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-purple-50
        via-white
        to-blue-50
        px-4
        sm:px-6
        py-8
        relative
      "
    >

      {/* =====================================================
          BACK TO LANDING PAGE
      ====================================================== */}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="
          absolute
          top-5
          left-5
          sm:top-7
          sm:left-7
          flex
          items-center
          gap-2
          px-3
          sm:px-4
          py-2
          rounded-xl
          bg-white/60
          backdrop-blur-xl
          border
          border-white/80
          text-slate-600
          text-xs
          sm:text-sm
          font-medium
          shadow-sm
          hover:bg-white/80
          hover:text-purple-600
          active:scale-95
          transition-all
        "
      >
        <ArrowLeft size={16} />

        <span>Back</span>
      </button>


      {/* =====================================================
          LOGIN CONTAINER
      ====================================================== */}

      <div className="w-full max-w-md">

        {/* Header */}

        <div className="text-center mb-7 sm:mb-8">

          <h1
            className="
              text-3xl
              sm:text-4xl
              font-bold
              text-slate-800
            "
          >
            Rail
            <span className="text-purple-600">
              Connect
            </span>
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-500">
            College Staff Portal
          </p>

        </div>


        {/* =====================================================
            LOGIN CARD
        ====================================================== */}

        <div
          className="
            bg-white/60
            backdrop-blur-2xl
            border
            border-white/80
            rounded-[26px]
            sm:rounded-[28px]
            p-5
            sm:p-8
            shadow-[0_20px_60px_rgba(30,41,59,0.10)]
          "
        >

          {/* Heading */}

          <div className="mb-6 sm:mb-7">

            <h2
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-slate-800
              "
            >
              Staff Login
            </h2>

            <p
              className="
                text-xs
                sm:text-sm
                text-slate-500
                mt-2
                leading-relaxed
              "
            >
              Sign in to manage student concession
              applications.
            </p>

          </div>


          {/* =====================================================
              FORM
          ====================================================== */}

          <form onSubmit={handleSubmit}>

            {/* Email */}

            <div className="mb-5">

              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                "
              >
                Staff Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your staff email"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white/70
                  border
                  border-slate-200
                  outline-none
                  focus:border-purple-400
                  focus:ring-2
                  focus:ring-purple-100
                  transition
                  text-sm
                "
              />

            </div>


            {/* Password */}

            <div className="mb-6">

              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                "
              >
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white/70
                  border
                  border-slate-200
                  outline-none
                  focus:border-purple-400
                  focus:ring-2
                  focus:ring-purple-100
                  transition
                  text-sm
                "
              />

            </div>


            {/* Error Message */}

            {message && (
              <div
                className="
                  mb-5
                  px-3
                  py-2.5
                  rounded-xl
                  bg-red-50
                  border
                  border-red-100
                  text-center
                  text-xs
                  sm:text-sm
                  text-red-500
                "
              >
                {message}
              </div>
            )}


            {/* =====================================================
                LOGIN BUTTON
            ====================================================== */}

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
                text-sm
                hover:bg-purple-700
                active:scale-[0.98]
                transition-all
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>


          {/* =====================================================
              REGISTRATION LINK
          ====================================================== */}

          <div className="text-center mt-6">

            <p className="text-xs sm:text-sm text-slate-500">
              Don't have a staff account?
            </p>

            <Link
              to="/StaffRegister"
              className="
                inline-block
                mt-2
                text-xs
                sm:text-sm
                font-semibold
                text-purple-600
                hover:text-purple-700
                transition
              "
            >
              Create Staff Account →
            </Link>

          </div>


          {/* Note */}

          <p
            className="
              text-center
              text-[10px]
              sm:text-xs
              text-slate-400
              mt-6
            "
          >
            Authorized college staff only
          </p>

        </div>

      </div>

    </div>
  );
};

export default StaffLogin;