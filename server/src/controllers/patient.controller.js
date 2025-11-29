import Patient from "../models/patient.model.js";
import AuditLog from "../models/audit.model.js";

// CREATE PATIENT 
export const createPatient = async (req, res, next) => {
  try {
    const tenantId = req.tenantId;

    // id per tenant: tenantId-P-00001
    const count = await Patient.countDocuments({ tenantId });
    const patientId = `${tenantId}-P-${String(count + 1).padStart(5, "0")}`;

    const data = {
      tenantId,
      patientId,
      ...req.body
    };

    const patient = await Patient.create(data);

    // this is audit gog
    await AuditLog.create({
      tenantId,
      actor: req.user.id,
      action: "CREATE",
      resourceType: "Patient",
      resourceId: patient._id.toString(),
      meta: {
        type: "PATIENT_CREATE",
        patientId,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
      }
    });

    return res.status(201).json({
      success: true,
      message: "Patient created successfully",
      patient
    });
  } catch (err) {
    next(err);
  }
};

// LIST PATIENTS WITH SEARCH + PAGINATION 
export const listPatients = async (req, res, next) => {
  try {
    const tenantId = req.tenantId;
    let { page = 1, limit = 20, q } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = { tenantId };

    // search  for filter
    if (q) {
      query.$or = [
        { name: new RegExp(q, "i") },
        { patientId: new RegExp(q, "i") },
        { contact: new RegExp(q, "i") }
      ];
    }

    const patients = await Patient.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Patient.countDocuments(query);

    return res.status(200).json({
      success: true,
      patients,
      total,
      page,
      limit
    });
  } catch (err) {
    next(err);
  }
};
