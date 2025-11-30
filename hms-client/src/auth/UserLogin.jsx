import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("priya.rao@apollo.in");
  const [password, setPassword] = useState("doctor123");
  const [hospital, setHospital] = useState("");
  const [hospitals, setHospitals] = useState([]);

  // Fetch hospitals on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/tenants")
      .then((res) => {
        const tenants = res.data.tenants || res.data;
        setHospitals(tenants);
        if (tenants.length > 0) setHospital(tenants[0].tenantId);
      })
      .catch((err) => console.log("Failed to fetch hospitals", err));
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hospital) return alert("Please select a hospital");
    dispatch(loginUser({ email, password, hospitalId: hospital }));
  };

  // Redirect after login based on role
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const redirectRoutes = {
      doctor: "/doctor",
      patient: "/patient",
      receptionist: "/reception",
      pharmacist: "/pharmacy",
      "tenant-admin": "/admin",
    };

    const userRole = user.roles[0];
    const route = redirectRoutes[userRole];
    if (route) navigate(route);
  }, [isAuthenticated, user, navigate]);

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
          src="https://www.shutterstock.com/image-vector/doctor-man-point-good-deal-600nw-2540966017.jpg"
          alt="Login"
          className="w-full h-full object-cover rounded-lg shadow-lg"
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
          <h2 className="text-3xl font-bold text-[#0A2342] mb-6">User Login</h2>

          {error && (
            <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Hospital select */}
            <select
              className="w-full p-3 border rounded-lg"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((h) => (
                <option key={h.tenantId} value={h.tenantId}>
                  {h.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
