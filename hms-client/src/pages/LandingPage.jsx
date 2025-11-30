import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">

      {/* -------------------------------- NAVBAR -------------------------------- */}
      <header className="w-full bg-[#0A2342] px-10 py-5 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-white">Hospital Management System</h1>

        <nav className="hidden md:flex gap-6 text-white font-medium">
          <a href="#features" className="hover:text-blue-200 transition">Features</a>
          <a href="#solutions" className="hover:text-blue-200 transition">Solutions</a>
          <a href="#about" className="hover:text-blue-200 transition">About</a>
          <a href="#contact" className="hover:text-blue-200 transition">Contact</a>
        </nav>

        <div className="flex gap-3 ">
          <a
            href="/admin"
            className="px-4 py-2 bg-[#1E4A8E] hover:bg-[#163a70] text-white rounded-lg transition"
          >
            Dashboard
          </a>
        </div>
      </header>

      {/* -------------------------------- HERO SECTION -------------------------------- */}
      <section className="flex flex-col md:flex-row gap-10 items-center px-12 py-20 bg-[#E6F2FF]">
        {/* Text */}
        <motion.div
          className="flex-1"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold text-[#0A2342] leading-tight">
            A Smarter Way to Manage Your Hospital System
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Digitize your entire hospital workflow — from patient management, EMR,
            billing, pharmacy, HR, inventory, and analytics to mobile access.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            {/* User Login/Signup */}
            <Link to="/user-login"

              className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
            >
              User
            </Link>

            {/* Hospital/Admin Login/Signup */}
            <Link to="/admin-login"

              className="px-6 py-3 bg-[#1E4A8E] text-white rounded-lg text-lg hover:bg-[#163a70] transition"
            >
              Admin
            </Link>

            <a
              href="#features"
              className="px-6 py-3 border border-[#1E4A8E] text-[#1E4A8E] rounded-lg text-lg hover:bg-[#E6F2FF] transition"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://docpulse.com/wp-content/uploads/2024/02/slider-small-1.jpg"
            className="w-full rounded-xl shadow-xl"
            alt="Hospital Management"
          />
        </motion.div>
      </section>

      {/* -------------------------------- FEATURES -------------------------------- */}
      <section id="features" className="px-12 py-20">
        <h3 className="text-center text-4xl font-bold text-[#0A2342]">
          Powerful Features Built for Today's Hospitals
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          <FeatureCard title="Patient EMR" desc="Track full patient history, prescriptions, diagnostics." />
          <FeatureCard title="Appointments & Queue" desc="Smart scheduling system with automated notifications." />
          <FeatureCard title="Billing & Finance" desc="Seamless billing, invoices, payments & revenue tracking." />
          <FeatureCard title="Pharmacy & Inventory" desc="Track medicines, supplies, stock alerts, expiry & orders." />
          <FeatureCard title="Human Resources" desc="Staff profiles, attendance, payroll & duty management." />
          <FeatureCard title="Analytics Dashboard" desc="Real-time analytics for performance, revenue & operations." />
        </div>
      </section>

      {/* -------------------------------- SOLUTIONS MODULES -------------------------------- */}
      <section id="solutions" className="px-12 py-20 bg-[#F8FAFC]">
        <h3 className="text-center text-4xl font-bold text-[#0A2342]">
          Complete End-to-End Hospital Solutions
        </h3>

        <div className="grid md:grid-cols-3 gap-12 mt-16">
          <SolutionCard
            img="/module1.png"
            title="Clinical Management"
            desc="Doctors, nurses & clinical staff get easy access to patient files, notes, orders & medical histories."
          />

          <SolutionCard
            img="/module2.png"
            title="Operational Management"
            desc="Front office, reception, beds, admissions, discharge — handled smoothly with automation."
          />

          <SolutionCard
            img="/module3.png"
            title="Pharmacy & Lab Integration"
            desc="Integrated lab equipment data, pharmacy stock, barcode & NAAC standards support."
          />
        </div>
      </section>

      {/* -------------------------------- ABOUT SECTION -------------------------------- */}
      <section id="about" className="px-12 py-20">
        <h3 className="text-center text-4xl font-bold text-[#0A2342]">
          About Our System
        </h3>

        <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
          <img src="/about.png" className="rounded-xl shadow-lg" alt="About System" />

          <div>
            <h4 className="text-2xl font-semibold text-[#0A2342] mb-4">
              Designed for Modern Healthcare Institutions
            </h4>

            <p className="text-gray-600 text-lg">
              Our Hospital Management System streamlines hospital operations, reduces manual errors, enhances communication, and ensures world-class patient care.
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>✔ Paperless workflow</li>
              <li>✔ Supports multi-branch hospitals</li>
              <li>✔ Complete data security</li>
              <li>✔ Cloud or on-premise deployment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------------- WHY CHOOSE US -------------------------------- */}
      <section className="px-12 py-20 bg-[#E6F2FF]">
        <h3 className="text-center text-4xl font-bold text-[#0A2342]">
          Why Hospitals Choose Our System
        </h3>

        <div className="grid md:grid-cols-4 gap-10 mt-14">
          <WhyCard title="Secure & Reliable" desc="Advanced encryption & secure data protocols." />
          <WhyCard title="Fully Customizable" desc="Tailor workflows & modules as per your hospital needs." />
          <WhyCard title="24/7 Support" desc="Dedicated support team available anytime." />
          <WhyCard title="Scalable" desc="Works for clinics, medium hospitals & multi-branch chains." />
        </div>
      </section>

      {/* -------------------------------- CALL TO ACTION -------------------------------- */}
      <section id="contact" className="px-12 py-20 text-center">
        <h3 className="text-4xl font-bold text-[#0A2342]">
          Ready to Get Started?
        </h3>

        <p className="mt-4 text-gray-600 text-lg">
          Choose your portal below to begin your journey:
        </p>

        <motion.div
          className="mt-8 flex justify-center gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Link to="/user-login" className="px-8 py-4 bg-green-600 text-white text-xl rounded-lg hover:bg-green-700 transition">
            User
          </Link>
          <Link to="/hospital-login" className="px-8 py-4 bg-[#1E4A8E] text-white text-xl rounded-lg hover:bg-[#163a70] transition">
            Admin
          </Link>
        </motion.div>
      </section>

      {/* -------------------------------- FOOTER -------------------------------- */}
      <footer className="bg-[#0A2342] text-white py-8 text-center mt-10">
        <p>© {new Date().getFullYear()} Hospital Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

/* ------------------- COMPONENTS ------------------- */

function FeatureCard({ title, desc }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
      whileHover={{ scale: 1.05 }}
    >
      <h4 className="text-xl font-semibold text-[#0A2342]">{title}</h4>
      <p className="mt-2 text-gray-600">{desc}</p>
    </motion.div>
  );
}

function SolutionCard({ img, title, desc }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-5 hover:shadow-2xl transition"
      whileHover={{ scale: 1.05 }}
    >
      <img src={img} className="w-full rounded-md mb-5" />
      <h4 className="text-xl font-semibold text-[#0A2342]">{title}</h4>
      <p className="mt-2 text-gray-600">{desc}</p>
    </motion.div>
  );
}

function WhyCard({ title, desc }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
      whileHover={{ scale: 1.05 }}
    >
      <h4 className="text-xl font-bold text-[#0A2342]">{title}</h4>
      <p className="mt-2 text-gray-600">{desc}</p>
    </motion.div>
  );
}
