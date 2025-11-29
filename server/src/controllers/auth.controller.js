import User from "../models/user.model.js";
import Tenant from "../models/tenant.model.js";
import AuditLog from "../models/audit.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// -------------------- Generate Tokens --------------------
const generateTokens = (user) => {
  const payload = {
    userId: user._id,
    tenantId: user.tenantId,
    roles: user.roles
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  const refreshToken = jwt.sign(
    { userId: user._id, tenantId: user.tenantId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// -------------------- LOGIN --------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Finding user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    //verify tenant exist and  active or not
    const tenant = await Tenant.findOne({ tenantId: user.tenantId });

    if (!tenant || tenant.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Tenant is not active"
      });
    }

    //verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    //generate token
    const { accessToken, refreshToken } = generateTokens(user);

    //audit log
    await AuditLog.create({
      tenantId: user.tenantId,
      actor: user._id.toString(),
      action: "LOGIN",
      resourceType: "User",
      resourceId: user._id.toString(),
      meta: {
        email: user.email,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
      }
    });

    //seding response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        roles: user.roles,
        tenantId: user.tenantId
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

// -------------------- REFRESH TOKEN --------------------
export const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Refresh token missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error("Refresh error:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token"
    });
  }
};

// -------------------- LOGOUT --------------------
export const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};
