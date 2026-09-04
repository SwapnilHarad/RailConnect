import { motion } from "framer-motion";
import { FaArrowRight, FaPlayCircle,  } from "react-icons/fa";
import heroImage from "../assets/hero-image.png";
import { useNavigate } from "react-router-dom";

function Hero() {


    const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md border border-gray-100 mb-8">

              <span className="w-2 h-2 rounded-full bg-blue-600"></span>

              <span className="text-sm font-semibold text-blue-600">

                RAILCONNECT PORTAL

              </span>

            </div>

            {/* Heading */}

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">

              Apply Railway

              <br />

              <span className="text-blue-600">

                Concession Online

              </span>

            </h1>

            {/* Description */}

            <p className="mt-8 text-gray-600 text-lg leading-8 max-w-xl">

              A modern digital platform for students to apply for railway
              concessions without visiting the college office. Secure,
              paperless and lightning fast.

            </p>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-5 mt-10">

              <motion.button

              onClick={()=>navigate("/register")}

                whileHover={{
                  scale: 1.05,
                  y: -3
                }}

                whileTap={{
                  scale: 0.95
                }}

                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3"

              >

                Start Application

                <FaArrowRight />

              </motion.button>

              <motion.button

                whileHover={{
                  scale: 1.05
                }}

                className="flex items-center justify-center gap-3 text-gray-700 font-semibold"

              >

                <FaPlayCircle className="text-2xl text-blue-600" />

                How it works

              </motion.button>

            </div>

            {/* Bottom */}

            <div className="flex items-center gap-5 mt-14">

              <div className="flex -space-x-4">

                <img
                  src="https://i.pravatar.cc/60?img=1"
                  className="w-12 h-12 rounded-full border-4 border-white"
                />

                <img
                  src="https://i.pravatar.cc/60?img=2"
                  className="w-12 h-12 rounded-full border-4 border-white"
                />

                <img
                  src="https://i.pravatar.cc/60?img=3"
                  className="w-12 h-12 rounded-full border-4 border-white"
                />

              </div>

              <div>

                <p className="font-bold text-blue-600">

                  50K+

                </p>

                <p className="text-gray-500 text-sm">

                  Students Verified This Month

                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div

            initial={{
              opacity: 0,
              x: 40
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 0.8
            }}

            className="relative"

          >

            {/* Main Card */}

            <motion.div

              animate={{
                y: [0, -8, 0]
              }}

              transition={{
                duration: 5,
                repeat: Infinity
              }}

              className="rounded-[40px] bg-white/50 backdrop-blur-3xl shadow-2xl border border-white/40 overflow-hidden"

            >

              <img

                src={heroImage}

                alt="RailConnect"

                className="w-full object-cover"

              />

            </motion.div>

            {/* Floating Card */}

            <motion.div

              animate={{
                y: [0, -10, 0]
              }}

              transition={{
                duration: 3,
                repeat: Infinity
              }}


            >

              
              
            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Hero;