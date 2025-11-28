import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const tenantSchema = new mongoose.Schema({
  tenantId: {
    type: String, default: () => `tenant_${uuidv4()}`, unique: true
  },
  name: {
    type: String, required: true
  },
  domain: String,
  address: String,
  contact: String,
  adminEmail: {
    type: String, required: true
  },
  licenseNumber: {
    type: String, required: true, unique: true
  },
  status: {  // what is  current stauts of hospital
    type: String, enum: ["PENDING", "VERIFIED", "ACTIVE", "INACTIVE"], default: "PENDING"
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Tenant", tenantSchema);