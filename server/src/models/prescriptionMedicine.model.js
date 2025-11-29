import mongoose from "mongoose";

const prescriptionMedicineSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true
    },

    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      required: true,
      index: true
    },

    medicineName: {
      type: String,
      required: true,
      trim: true
    },

    dosage: {
      type: String,
      required: true,
      trim: true
    },

    frequency: {
      type: String,
      required: true,
      trim: true
    },

    duration: {
      type: String,
      trim: true
    },

    instructions: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("PrescriptionMedicine", prescriptionMedicineSchema);
