import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    //  token verify
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    // fetching user from DB
    const user = await User.findById(payload.userId)
      .select("_id tenantId roles permissions emailVerified status");

    if (!user) {
      return res.status(401).json({ success: false, message: "User does not exist" });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({ success: false, message: `User is ${user.status}` });
    }

    // attching users info 
    req.user = {
      id: user._id,
      tenantId: user.tenantId,
      roles: user.roles,
      permissions: user.permissions,
      emailVerified: user.emailVerified,
      status: user.status
    };

    next();
  } catch (err) {
    console.error("Auth Middleware Error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
