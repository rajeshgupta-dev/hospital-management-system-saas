
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// --------------------- LOGIN USER ---------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, hospitalId }, { rejectWithValue }) => {
    try {
   
      const tenantsRes = await axios.get("http://localhost:5000/tenants");
      const tenants = tenantsRes.data.tenants || tenantsRes.data;

      // Fetch users
      const usersRes = await axios.get("http://localhost:5000/users");
      const users = usersRes.data.users || usersRes.data;

      // Check if admin login
      if (hospitalId) {
        const admin = tenants.find(
          (t) =>
            t.tenantId === hospitalId &&
            t.adminEmail === email &&
            t.password === password
        );
        if (admin) {
          return {
            id: admin.tenantId,
            name: admin.name,
            email: admin.adminEmail,
            roles: ["tenant-admin"],
            hospitalId: admin.tenantId,
          };
        }
      }

      // Check normal user login
      const user = users.find(
        (u) =>
          u.email === email &&
          u.password === password &&
          u.tenantId === hospitalId
      );
      if (user) {
        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          roles: user.roles,
          tenantId: user.tenantId,
        };
      }

      return rejectWithValue("Invalid email, password, or hospital.");
    } catch (err) {
      return rejectWithValue("Login failed. Try again.");
    }
  }
);

// --------------------- FETCH ALL USERS ---------------------
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

// --------------------- FETCH DOCTOR DATA ---------------------
export const fetchDoctorData = createAsyncThunk(
  "auth/fetchDoctorData",
  async (doctorId, { rejectWithValue }) => {
    try {
      const patientsRes = await axios.get(
        `http://localhost:5000/patients?doctorId=${doctorId}`
      );
      const appointmentsRes = await axios.get(
        `http://localhost:5000/appointments?doctorId=${doctorId}`
      );
      const prescriptionsRes = await axios.get(
        `http://localhost:5000/prescriptions?doctorId=${doctorId}`
      );
      const profileRes = await axios.get(
        `http://localhost:5000/users/${doctorId}`
      );

      return {
        patients: patientsRes.data || [],
        appointments: appointmentsRes.data || [],
        prescriptions: prescriptionsRes.data || [],
        profile: profileRes.data || null,
      };
    } catch (err) {
      return rejectWithValue("Failed to fetch doctor data");
    }
  }
);

// --------------------- AUTH SLICE ---------------------
const initialState = {
  user: JSON.parse(localStorage.getItem("authUser")) || null,
  isAuthenticated: !!localStorage.getItem("authUser"),
  allUsers: [],
  doctorData: { patients: [], appointments: [], prescriptions: [], profile: null },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.allUsers = [];
      state.doctorData = { patients: [], appointments: [], prescriptions: [], profile: null };
      state.error = null;
      localStorage.removeItem("authUser");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------- LOGIN ----------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("authUser");
      })

      // ---------- FETCH ALL USERS ----------
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- FETCH DOCTOR DATA ----------
      .addCase(fetchDoctorData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorData.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorData = action.payload;
      })
      .addCase(fetchDoctorData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
