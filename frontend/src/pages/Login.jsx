import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserGraduate } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";

function Login() {
   
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setLoginSuccess(true);

    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (

    <>
      {/* error msg */}

      {errorMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-5">

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-md rounded-[32px] border border-white/60 bg-white/45 backdrop-blur-2xl shadow-2xl p-8 text-center"
          >

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 border border-red-400/30">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white text-3xl shadow-lg">
                !
              </div>

            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Login Failed
            </h2>

            <p className="mt-3 text-gray-600">
              {errorMessage}
            </p>

            <button
              onClick={() => setErrorMessage("")}
              className="mt-7 w-full rounded-2xl bg-blue-600 py-3.5 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              Try Again
            </button>

          </motion.div>

        </div>
      )}

      {/* login succes  */}

      {loginSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-5">

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-md rounded-[32px] border border-white/60 bg-white/45 backdrop-blur-2xl shadow-2xl p-8 text-center"
          >

            {/* Success Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15 border border-green-400/30">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white text-3xl shadow-lg">
                ✓
              </div>

            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Login Successful
            </h2>

            <p className="mt-3 text-gray-600 leading-6">
              Welcome back! You have successfully logged in to RailConnect.
            </p>

            <button
              onClick={() =>{
                 setLoginSuccess(false);
                  navigate("/studentDashboard");
              }
                 
                
              }
              className="mt-7 w-full rounded-2xl bg-blue-600 py-3.5 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue
            </button>

          </motion.div>

        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-6"
      >
        <div className="w-full max-w-5xl bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* Left Side */}

            <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-12">

              <div className="text-center text-white">

                <FaUserGraduate className="text-8xl mx-auto mb-8" />

                <h1 className="text-5xl font-bold mb-5">

                  Welcome Back

                </h1>

                <p className="text-lg opacity-90">

                  Login to continue your Railway Concession application.

                </p>

              </div>

            </div>

            {/* Right Side */}

            <div className="p-10">

              <div className="text-center mb-10">

                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-5">

                  <FaUserGraduate size={35} />

                </div>

                <h2 className="text-4xl font-bold text-gray-800">

                  Student Login

                </h2>

                <p className="text-gray-500 mt-3">

                  Sign in to your account

                </p>

              </div>

              <form className="space-y-6" onSubmit={handleLogin}>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="glassInput"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="glassInput"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                <div className="flex justify-end">

                  <Link
                    to="#"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Forgot Password?
                  </Link>

                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-lg"
                >
                  Login
                </motion.button>

                <div className="text-center">

                  <p className="text-gray-600">

                    Don't have an account?

                    <Link
                      to="/register"
                      className="text-blue-600 ml-2 font-semibold"
                    >
                      Register
                    </Link>

                  </p>

                </div>

                <div className="pt-4">

                  <Link
                    to="/"
                    className="flex items-center gap-2 text-blue-600"
                  >
                    <FaArrowLeft />

                    Back to Home

                  </Link>

                </div>

              </form>

            </div>

          </div>

        </div>
      </motion.div>
    </>
  );

}

export default Login;