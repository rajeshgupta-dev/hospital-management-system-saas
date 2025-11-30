import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function HospitalLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // Local State
  const [email, setEmail] = useState("admin@apollo.in");
  const [password, setPassword] = useState("admin123");
  const [hospitals, setHospitals] = useState([]);
  const [hospitalId, setHospitalId] = useState("");
  const [localError, setLocalError] = useState("");

  // ===============================
  // 🔹 Fetch Hospitals (Tenants)
  // ===============================
  useEffect(() => {
    axios.get("http://localhost:5000/tenants").then((res) => {
      if (res.data.tenants) setHospitals(res.data.tenants);
      else setHospitals(res.data);
    });
  }, []);


  // Redirect if login success

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on role
      const role = user.roles[0];
      switch (role) {
        case "tenant-admin":
          navigate("/admin");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "patient":
          navigate("/patient/dashboard");
          break;
        case "receptionist":
          navigate("/reception/dashboard");
          break;
        case "pharmacist":
          navigate("/pharmacy/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  // 🔹 Handle Login Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!hospitalId) {
      setLocalError("Please select a hospital.");
      return;
    }

    // Dispatch centralized login
    dispatch(loginUser({ email, password, hospitalId }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Illustration */}
      <motion.div
        className="hidden md:flex flex-1 bg-[#E6F2FF] items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://st3.depositphotos.com/34815820/36717/v/450/depositphotos_367178652-stock-illustration-medical-set-concept-icons-related.jpg"
          alt="Hospital Login Illustration"
          className="w-full h-full rounded-lg shadow-lg object-cover"
        />
      </motion.div>

      {/* Login Form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-8 bg-white"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#0A2342] mb-6">
            Admin / Hospital Login
          </h2>

          {(error || localError) && (
            <p className="text-red-600 font-semibold mb-4 text-center">
              {localError || error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Hospital Dropdown */}
            <select
              className="w-full p-3 border rounded-lg"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((h) => (
                <option key={h.tenantId} value={h.tenantId}>
                  {h.name}
                </option>
              ))}
            </select>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1E4A8E] text-white rounded-lg hover:bg-[#163a70] transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/admin-signup" className="text-[#1E4A8E] hover:underline">
              Register Hospital
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
