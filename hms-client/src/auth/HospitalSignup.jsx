import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice"; // same API
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HospitalSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/admin");
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Signup API would go here, for now using loginUser mock
    dispatch(loginUser({ email, password, role: "admin" }));
  };

  return (
    <div className="flex min-h-screen">
      <motion.div
        className="hidden md:flex flex-1 bg-[#E6F2FF] items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://st3.depositphotos.com/34815820/36717/v/450/depositphotos_367178652-stock-illustration-medical-set-concept-icons-related.jpg"
          alt="Hospital Signup Illustration"
          className="w-full h-full rounded-lg shadow-lg object-cover"
        />
      </motion.div>

      <motion.div
        className="flex-1 flex items-center justify-center p-8 bg-white"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#0A2342] mb-6">Hospital Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Hospital Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4A8E]"
              required
            />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4A8E]"
              required
            />
            <input
              type="text"
              placeholder="License Number"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4A8E]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4A8E]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1E4A8E] text-white font-semibold rounded-lg hover:bg-[#163a70] transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/admin-login" className="text-[#1E4A8E] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
