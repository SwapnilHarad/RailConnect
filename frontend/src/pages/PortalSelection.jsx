import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";
import backgroundVideo from "../assets/portal-background.mp4";

const PortalSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Animated Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />


      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-5xl">

          {/* Header */}
          <div className="text-center mb-12">

            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Rail<span className="text-blue-300">Connect</span>
            </h1>

            <p className="mt-3 text-white/80 text-lg">
              Railway Student Concession System
            </p>

          </div>


          {/* Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


            {/* Student Portal */}
            <button
              onClick={() => navigate("/student")}
              className="
                group
                text-left
                rounded-[28px]
                border border-white/30
                bg-white/15
                backdrop-blur-2xl
                p-8
                shadow-2xl
                hover:-translate-y-2
                hover:bg-white/20
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
                transition-all
                duration-300
              "
            >

              <div className="flex items-center justify-between">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-blue-500/20
                  border border-white/20
                  backdrop-blur-xl
                  flex items-center justify-center
                ">
                  <GraduationCap
                    size={32}
                    className="text-blue-200"
                  />
                </div>

                <ArrowRight
                  size={25}
                  className="
                    text-white/60
                    group-hover:text-white
                    group-hover:translate-x-2
                    transition-all
                  "
                />

              </div>


              <div className="mt-8">

                <p className="text-sm font-semibold tracking-wide text-blue-200">
                  STUDENT PORTAL
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  Student
                </h3>

                <p className="mt-4 text-white/70 leading-relaxed">
                  Apply for railway concessions, upload your documents,
                  and track your application status online.
                </p>

              </div>


              <div className="
                mt-8
                flex items-center gap-2
                font-semibold
                text-blue-200
              ">
                Enter Student Portal

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>

            </button>


            {/* Staff Portal */}
            <button
              onClick={() => navigate("/staff/login")}
              className="
                group
                text-left
                rounded-[28px]
                border border-white/30
                bg-white/15
                backdrop-blur-2xl
                p-8
                shadow-2xl
                hover:-translate-y-2
                hover:bg-white/20
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
                transition-all
                duration-300
              "
            >

              <div className="flex items-center justify-between">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-purple-500/20
                  border border-white/20
                  backdrop-blur-xl
                  flex items-center justify-center
                ">
                  <Building2
                    size={32}
                    className="text-purple-200"
                  />
                </div>

                <ArrowRight
                  size={25}
                  className="
                    text-white/60
                    group-hover:text-white
                    group-hover:translate-x-2
                    transition-all
                  "
                />

              </div>


              <div className="mt-8">

                <p className="text-sm font-semibold tracking-wide text-purple-200">
                  COLLEGE STAFF PORTAL
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  College Staff
                </h3>

                <p className="mt-4 text-white/70 leading-relaxed">
                  Review student applications, verify documents,
                  and manage railway concession requests.
                </p>

              </div>


              <div className="
                mt-8
                flex items-center gap-2
                font-semibold
                text-purple-200
              ">
                Enter Staff Portal

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>

            </button>

          </div>


          {/* Footer */}
          <p className="text-center text-sm text-white/50 mt-12">
            Secure • Simple • Digital
          </p>

        </div>

      </div>

    </div>
  );
};

export default PortalSelection;