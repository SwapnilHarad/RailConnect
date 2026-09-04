import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { div } from "framer-motion/client";
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    university: "",
    collegeName: "",
    prnNumber: "",
    rollNumber: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      console.log(response.data);

      setShowSuccess(true);

      setFormData({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        university: "",
        collegeName: "",
        prnNumber: "",
        rollNumber: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (


    <>

      {/* pop up of registered succesfully */}
      {showSuccess && (
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

            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-800">
              Registration Successful
            </h2>
                                    
            {/* Message */}
            <p className="mt-3 text-gray-600 leading-6">
              Your RailConnect student account has been created successfully.
            </p>

            {/* Button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-7 w-full rounded-2xl bg-blue-600 py-3.5 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue
            </button>

          </motion.div>

        </div>
      )}

      {/* pop up of duplicate or registeration error */}

      {errorMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-5">

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md rounded-[32px] border border-white/60 bg-white/45 backdrop-blur-2xl shadow-2xl p-8 text-center"
          >

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 border border-red-400/30">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white text-3xl shadow-lg">
                !
              </div>

            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Registration Failed
            </h2>

            <p className="mt-3 text-gray-600">
              {errorMessage}
            </p>

            <button  onClick={() => setErrorMessage("")}
        className="mt-7 w-full rounded-2xl bg-blue-600 py-3.5 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700"
            >
              Try Again
            </button>

          </motion.div>

        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-6">

          {/* Glass Card */}
          <div className="w-full max-w-6xl bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">

            <div className="grid lg:grid-cols-2">

              {/* Left Side */}
              <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-12">

                <div className="text-center text-white">

                  <FaUserGraduate className="text-8xl mx-auto mb-8" />

                  <h1 className="text-5xl font-bold mb-5">
                    RailConnect
                  </h1>

                  <p className="text-lg opacity-90 leading-8">

                    Apply for Railway Student Concession
                    digitally without visiting your college office.

                  </p>

                </div>

              </div>

              {/* Right Side */}

              <div className="p-10">

                <div className="text-center mb-10">

                  <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-5">

                    <FaUserGraduate size={35} />

                  </div>

                  <h2 className="text-4xl font-bold text-gray-800">

                    Student Registration

                  </h2>

                  <p className="text-gray-500 mt-3">

                    Create your account to continue

                  </p>

                </div>

                {/* FORM */}

                <form className="space-y-8" onSubmit={handleRegister}>

                  {/* Personal Information */}

                  <div>

                    <h3 className="text-blue-600 font-semibold mb-5 uppercase tracking-wide">

                      Personal Information

                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">

                      <input
                        type="text"
                        placeholder="Full Name"
                        className="glassInput"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />

                      <input
                        type="date"
                        className="glassInput"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          setFormData({ ...formData, dateOfBirth: e.target.value })
                        }
                      />

                      <select
                        className="glassInput"
                        name="gender"
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      >

                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>

                      </select>

                    </div>

                  </div>

                  {/* Academic */}

                  <div>

                    <h3 className="text-blue-600 font-semibold mb-5 uppercase tracking-wide">

                      Academic Details

                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">

                      <input
                        type="text"
                        placeholder="University"
                        className="glassInput"
                        name="university"
                        value={formData.university}
                        onChange={(e) =>
                          setFormData({ ...formData, university: e.target.value })
                        }
                      />

                      <input
                        type="text"
                        placeholder="College Name"
                        className="glassInput"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={(e) =>
                          setFormData({ ...formData, collegeName: e.target.value })
                        }
                      />

                      <input
                        type="text"
                        placeholder="PRN Number"
                        className="glassInput"
                        name="prnNumber"
                        value={formData.prnNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, prnNumber: e.target.value })
                        }
                      />

                      <input
                        type="text"
                        placeholder="Roll Number"
                        className="glassInput"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, rollNumber: e.target.value })
                        }
                      />

                    </div>

                  </div>

                  {/* Contact */}

                  <div>

                    <h3 className="text-blue-600 font-semibold mb-5 uppercase tracking-wide">

                      Contact & Security

                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">

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
                        type="text"
                        placeholder="Mobile Number"
                        className="glassInput"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, mobileNumber: e.target.value })
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

                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="glassInput"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                      />

                    </div>

                  </div>

                  {/* Buttons */}

                  <div className="flex justify-between items-center pt-5">

                    <Link
                      to="/login"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <FaArrowLeft />
                      Back to Login
                    </Link>

                    <button
                      className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                    >
                      Create Account
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </>
  );
}

export default Register;