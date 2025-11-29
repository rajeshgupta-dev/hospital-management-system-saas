import mongoose from "mongoose";
import config from "../config/index.js";
import Role from "../models/role.model.js";

const roles = [
  { name: "SUPER_ADMIN", description: "Platform admin", permissions: ["*"] },
  { name: "HOSPITAL_ADMIN", description: "Hospital admin", permissions: ["PATIENT:CREATE", "PATIENT:READ", "USER:MANAGE", "PRESCRIPTION:READ"] },
  { name: "DOCTOR", description: "Doctor", permissions: ["PATIENT:READ", "PRESCRIPTION:CREATE", "PRESCRIPTION:READ"] },
  { name: "NURSE", description: "Nurse", permissions: ["PATIENT:READ"] },
  { name: "PHARMACIST", description: "Pharmacist", permissions: ["PRESCRIPTION:READ"] },
  { name: "RECEPTIONIST", description: "Receptionist", permissions: ["PATIENT:CREATE", "PATIENT:READ"] }
];

(async () => {
  try {
    await mongoose.connect(config.mongoUri);
    for (const r of roles) {
      const exists = await Role.findOne({ name: r.name });
      if (!exists) await Role.create(r);
    }
    console.log("Roles seeded");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
