import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  patientId: { type: String, required: true, unique: true }, // here- tenantId-P-001
  name: { type: String, required: true },
  dob: Date,
  gender: String,
  bloodGroup: String,
  contact: String,
  address: String,
  emergencyContact: String,
  patientType: { type: String, enum: ["OPD", "IPD"], default: "OPD" },
  doctorAssigned: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photo: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Patient", patientSchema);