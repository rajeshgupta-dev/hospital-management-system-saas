import Prescription from "../models/prescription.model.js";
import PrescriptionMedicine from "../models/prescriptionMedicine.model.js";
import AuditLog from "../models/audit.model.js";

//  CREATE PRESCRIPTION 
export const createPrescription = async (req, res, next) => {
  try {
    const tenantId = req.tenantId;
    const { patientId, medicines = [], notes } = req.body;

    if (!patientId) {
      return res.status(400).json({ success: false, message: "Patient ID is required" });
    }

    // generate prescriptionId per tenant
    const count = await Prescription.countDocuments({ tenantId });
    const prescriptionId = `${tenantId}-RX-${(count + 1).toString().padStart(5, "0")}`;

    // create prescription
    const prescription = await Prescription.create({
      tenantId,
      prescriptionId,
      patient: patientId,
      doctor: req.user.id,
      notes
    });

    // insert medicines
    if (medicines.length > 0) {
      const medDocs = medicines.map(m => ({
        tenantId,
        prescription: prescription._id,
        medicineName: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        duration: m.duration,
        instructions: m.instructions
      }));

      await PrescriptionMedicine.insertMany(medDocs);
    }

    //audit log
    await AuditLog.create({
      tenantId,
      actor: req.user.id,
      action: "CREATE",
      resourceType: "Prescription",
      resourceId: prescription._id.toString(),
      meta: {
        type: "PRESCRIPTION_CREATE",
        prescriptionId,
        patientId,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
      }
    });

    // sending response
    return res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      prescriptionId,
      prescriptionDbId: prescription._id
    });
  } catch (err) {
    next(err);
  }
};
