import Tenant from "../models/tenant.model.js";
import User from "../models/user.model.js";
import { sendMail } from "../utils/mailer.js";
import { v4 as uuidv4 } from "uuid";


export const registerTenant = async (req, res, next) => {
  try {
    const { name, address, contact, adminEmail, licenseNumber, domain } = req.body;

    // Checking if licenseNumber already exists?
    const existing = await Tenant.findOne({ licenseNumber });
    if (existing) return res.status(400).json({ message: "License already exists" });

    // Create Tenant
    const tenant = await Tenant.create({
      name,
      address,
      contact,
      adminEmail,
      licenseNumber,
      domain,
      status: "PENDING"
    });

    // Generate temprary password
    const tempPassword = uuidv4().slice(0, 8) + "Aa1!";

    // Create hospital admin user
    const adminUser = await User.create({
      tenantId: tenant.tenantId,
      firstName: "Hospital",
      lastName: "Admin",
      email: adminEmail,
      username: `admin@${tenant.domain || tenant.tenantId}`,
      roles: ["HOSPITAL_ADMIN"],
      permissions: [],
      password: tempPassword,
      emailVerified: false
    });

    // Sending verification email to Mail 
    const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email?user=${adminUser._id}`;
    await sendMail({
      to: adminEmail,
      subject: "Verify your Hospital Admin email",
      html: `<p>Welcome. Verify email: <a href="${verificationLink}">${verificationLink}</a></p>
             <p>Temporary password: ${tempPassword}</p>`
    });

    return res.status(201).json({
      message: "Tenant created. Please check email for verification",
      tenantId: tenant.tenantId
    });
  } catch (err) {
    next(err);
  }
};
