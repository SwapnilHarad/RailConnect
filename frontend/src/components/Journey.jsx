import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaFileUpload,
  FaUniversity,
  FaTrain,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Register",
    desc: "Create your RailConnect account",
  },
  {
    icon: <FaFileUpload />,
    title: "Apply",
    desc: "Fill concession application",
  },
  {
    icon: <FaUniversity />,
    title: "College Verification",
    desc: "College verifies your details",
  },
  {
    icon: <FaTrain />,
    title: "Railway Approval",
    desc: "Central Railway approves request",
  },
  {
    icon: <FaCheckCircle />,
    title: "Download Pass",
    desc: "Download your concession instantly",
  },
];

function Journey() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-24">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-20">

          <h2 className="text-5xl font-bold">

            Your Journey with{" "}
            <span className="text-blue-600">RailConnect</span>

          </h2>

          <p className="text-gray-500 mt-5 text-lg">

            Apply digitally in five simple steps.

          </p>

        </div>

        {/* Desktop */}

        <div className="hidden lg:flex justify-between relative">

          {/* Line */}

          <div className="absolute top-10 left-0 w-full h-1 bg-blue-200 rounded-full"></div>

          {steps.map((step, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, y: 30 }}

              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}

              viewport={{ once: true }}

              className="relative flex flex-col items-center text-center w-52"

            >

              <motion.div

                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                }}

                className="relative z-10 w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl shadow-xl"

              >

                {step.icon}

              </motion.div>

              <h3 className="font-bold text-xl mt-8">

                {step.title}

              </h3>

              <p className="text-gray-600 mt-3">

                {step.desc}

              </p>

            </motion.div>

          ))}

        </div>

        {/* Mobile */}

        <div className="lg:hidden flex flex-col gap-10">

          {steps.map((step, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, x: -40 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true }}

              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}

              className="flex gap-5"

            >

              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl">

                {step.icon}

              </div>

              <div>

                <h3 className="font-bold text-xl">

                  {step.title}

                </h3>

                <p className="text-gray-600 mt-2">

                  {step.desc}

                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Journey;