import {
  FaTrain,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0B1120] text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <FaTrain className="text-3xl text-blue-400" />

              <h2 className="text-3xl font-bold">

                RailConnect

              </h2>

            </div>

            <p className="text-gray-400 leading-8">

              A modern digital platform for students to apply
              for railway concessions online. Faster approvals,
              paperless process and secure verification.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              Quick Links

            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-white cursor-pointer">
                Home
              </li>

              <li className="hover:text-white cursor-pointer">
                Apply Concession
              </li>

              <li className="hover:text-white cursor-pointer">
                Track Status
              </li>

              <li className="hover:text-white cursor-pointer">
                Login
              </li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              Services

            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-white cursor-pointer">
                Student Portal
              </li>

              <li className="hover:text-white cursor-pointer">
                College Portal
              </li>

              <li className="hover:text-white cursor-pointer">
                Railway Officer
              </li>

              <li className="hover:text-white cursor-pointer">
                Help & Support
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              Contact

            </h3>

            <p className="text-gray-400">

              Mumbai, Maharashtra

            </p>

            <p className="text-gray-400 mt-3">

              support@railconnect.in

            </p>

            <div className="flex gap-5 mt-8">

              <FaFacebook className="cursor-pointer hover:text-blue-500 text-2xl" />

              <FaInstagram className="cursor-pointer hover:text-pink-500 text-2xl" />

              <FaLinkedin className="cursor-pointer hover:text-blue-400 text-2xl" />

              <FaGithub className="cursor-pointer hover:text-gray-300 text-2xl" />

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-14 pt-8 flex flex-col lg:flex-row justify-between items-center">

          <p className="text-gray-400 text-center">

            © 2026 RailConnect. All Rights Reserved.

          </p>

          <div className="flex gap-8 mt-5 lg:mt-0">

            <p className="text-gray-400 hover:text-white cursor-pointer">

              Privacy Policy

            </p>

            <p className="text-gray-400 hover:text-white cursor-pointer">

              Terms of Service

            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;