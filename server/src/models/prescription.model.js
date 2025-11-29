import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const prescriptionSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    prescriptionId: {
      type: String,
      unique: true,
      default: function () {
        return `RX-${uuidv4()}`;
      },
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    medicines: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String },
        notes: { type: String },
      }
    ],

    notes: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["ISSUED", "UPDATED", "CANCELLED"],
      default: "ISSUED",
    },
  },

  { timestamps: true }
);

// Indexes
prescriptionSchema.index({ patient: 1 });
prescriptionSchema.index({ doctor: 1 });

export default mongoose.model("Prescription", prescriptionSchema);
