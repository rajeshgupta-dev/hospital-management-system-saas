import axios from "axios";

// Base URL for your backend / json-server
const BASE_URL = "http://localhost:5000";

const api = {
  // --------------------------
  // Hospitals (Tenants)
  // --------------------------
  getHospitals: async () => {
    const response = await axios.get(`${BASE_URL}/tenants`);
    return response.data;
  },

  getHospitalById: async (tenantId) => {
    const response = await axios.get(`${BASE_URL}/tenants`, {
      params: { tenantId },
    });
    return response.data[0];
  },

  createHospital: async (hospitalData) => {
    const response = await axios.post(`${BASE_URL}/tenants`, hospitalData);
    return response.data;
  },

  // --------------------------
  // Users
  // --------------------------
  getUsers: async (filters = {}) => {
    const response = await axios.get(`${BASE_URL}/users`, { params: filters });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  },

  // Login function for centralized auth
  loginUser: async ({ email, password, role, hospitalId }) => {
    const users = await api.getUsers({ tenantId: hospitalId });

    const user = users.find(
      (u) => u.email === email && u.password === password && u.roles.includes(role)
    );

    if (!user) throw new Error("Invalid email/password or role");

    // store in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  // --------------------------
  // Patients
  // --------------------------
  getPatients: async (filters = {}) => {
    const response = await axios.get(`${BASE_URL}/patients`, { params: filters });
    return response.data;
  },

  getPatientById: async (id) => {
    const response = await axios.get(`${BASE_URL}/patients/${id}`);
    return response.data;
  },

  createPatient: async (patientData) => {
    const response = await axios.post(`${BASE_URL}/patients`, patientData);
    return response.data;
  },

  // --------------------------
  // Prescriptions
  // --------------------------
  getPrescriptions: async (filters = {}) => {
    const response = await axios.get(`${BASE_URL}/prescriptions`, { params: filters });
    return response.data;
  },

  getPrescriptionById: async (id) => {
    const response = await axios.get(`${BASE_URL}/prescriptions/${id}`);
    return response.data;
  },

  createPrescription: async (prescriptionData) => {
    const response = await axios.post(`${BASE_URL}/prescriptions`, prescriptionData);
    return response.data;
  },
};

export default api;
