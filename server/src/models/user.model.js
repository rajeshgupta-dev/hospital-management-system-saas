import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  username: { type: String },
  phone: String,
  department: String,
  roles: [{ type: String }], // like hospital-admin, doctore, 
  permissions: [{ type: String }],
  password: { type: String, required: true },
  status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  emailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);