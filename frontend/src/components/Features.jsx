import { motion } from "framer-motion";
import { FaBolt, FaFileAlt, FaShieldAlt } from "react-icons/fa";

const cards = [
  {
    icon: <FaBolt />,
    title: "Lightning Fast",
    desc: "Apply for your railway concession in just a few minutes.",
  },
  {
    icon: <FaFileAlt />,
    title: "100% Paperless",
    desc: "No need to visit your college office. Everything is digital.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Bank-Level Security",
    desc: "Your personal information is encrypted and protected.",
  },
];

function Features() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-16">

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">

            Why Choose
            <span className="text-blue-600"> RailConnect?</span>

          </h2>

          <p className="text-gray-600 mt-5 text-lg">

            A modern, secure and paperless student concession platform.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cards.map((card, index) => (

            <motion.div
              key={index}

              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}

              animate={{
                y: [0, -8, 0],
              }}

              whileHover={{
                y: -12,
                scale: 1.04,
                rotate: 1,
              }}

              className="bg-white/50 backdrop-blur-2xl rounded-3xl border border-white shadow-xl p-8 cursor-pointer"

            >

              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-8">

                {card.icon}

              </div>

              <h3 className="text-2xl font-bold mb-4">

                {card.title}

              </h3>

              <p className="text-gray-600 leading-8">

                {card.desc}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;