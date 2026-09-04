import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrain, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);


  /* =====================================================
     SCROLL FUNCTION
  ===================================================== */

  const scrollToSection = (sectionId) => {

    const section = document.getElementById(sectionId);

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }

    setMenuOpen(false);
  };


  /* =====================================================
     HOME
  ===================================================== */

  const handleHome = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setMenuOpen(false);
  };


  return (
    <>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav
        className="
          fixed
          top-0
          left-0
          w-full
          z-50
          bg-white/50
          backdrop-blur-xl
          border-b
          border-white/30
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            flex
            items-center
            justify-between
            px-6
            lg:px-10
            h-20
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/student"
            onClick={handleHome}
            className="
              flex
              items-center
              gap-3
            "
          >

            <FaTrain
              className="
                text-blue-600
                text-2xl
              "
            />

            <h1
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              RailConnect
            </h1>

          </Link>


          {/* =================================================
              DESKTOP MENU
          ================================================= */}

          <ul
            className="
              hidden
              lg:flex
              items-center
              gap-10
              text-gray-700
              font-medium
            "
          >

            {/* HOME */}

            <li>

              <button
                type="button"
                onClick={handleHome}
                className="
                  hover:text-blue-600
                  cursor-pointer
                  transition
                "
              >
                Home
              </button>

            </li>


            {/* FEATURES */}

            <li>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("features")
                }
                className="
                  hover:text-blue-600
                  cursor-pointer
                  transition
                "
              >
                Features
              </button>

            </li>


            {/* HOW IT WORKS */}

            <li>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("how-it-works")
                }
                className="
                  hover:text-blue-600
                  cursor-pointer
                  transition
                "
              >
                How It Works
              </button>

            </li>


            {/* FAQ */}

            <li>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("footer")
                }
                className="
                  hover:text-blue-600
                  cursor-pointer
                  transition
                "
              >
                FAQ
              </button>

            </li>

          </ul>


          {/* =================================================
              DESKTOP BUTTONS
          ================================================= */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-4
            "
          >

            {/* LOGIN */}

            <Link to="/login">

              <button
                type="button"
                className="
                  px-5
                  py-2
                  rounded-xl
                  border
                  border-blue-600
                  text-blue-600
                  hover:bg-blue-50
                  transition
                "
              >
                Login
              </button>

            </Link>


            {/* REGISTER */}

            <Link to="/register">

              <button
                type="button"
                className="
                  px-5
                  py-2
                  rounded-xl
                  bg-blue-600
                  text-white
                  hover:bg-blue-700
                  transition
                "
              >
                Register
              </button>

            </Link>

          </div>


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            className="
              lg:hidden
              text-2xl
              text-gray-700
            "
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >

            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}

          </button>

        </div>

      </nav>


      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed
              top-20
              left-0
              w-full
              bg-white/90
              backdrop-blur-2xl
              z-40
              shadow-xl
              lg:hidden
            "
          >

            <div
              className="
                flex
                flex-col
                p-6
                gap-5
              "
            >

              {/* HOME */}

              <button
                type="button"
                onClick={handleHome}
                className="
                  text-left
                  text-gray-700
                  hover:text-blue-600
                  transition
                "
              >
                Home
              </button>


              {/* FEATURES */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("features")
                }
                className="
                  text-left
                  text-gray-700
                  hover:text-blue-600
                  transition
                "
              >
                Features
              </button>


              {/* HOW IT WORKS */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("how-it-works")
                }
                className="
                  text-left
                  text-gray-700
                  hover:text-blue-600
                  transition
                "
              >
                How It Works
              </button>


              {/* FAQ */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("footer")
                }
                className="
                  text-left
                  text-gray-700
                  hover:text-blue-600
                  transition
                "
              >
                FAQ
              </button>


              {/* =================================================
                  LOGIN
              ================================================= */}

              <Link
                to="/login"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <button
                  type="button"
                  className="
                    w-full
                    border
                    border-blue-600
                    text-blue-600
                    rounded-xl
                    py-3
                    hover:bg-blue-50
                    transition
                  "
                >
                  Login
                </button>

              </Link>


              {/* =================================================
                  REGISTER
              ================================================= */}

              <Link
                to="/register"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <button
                  type="button"
                  className="
                    w-full
                    bg-blue-600
                    text-white
                    rounded-xl
                    py-3
                    hover:bg-blue-700
                    transition
                  "
                >
                  Register
                </button>

              </Link>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
}

export default Navbar;