export const tenantMiddleware = (req, res, next) => {
  // Check if user info exists and tenantId is present
  if (!req.user || !req.user.tenantId) {
    return res.status(403).json({ message: "Tenant context missing" });
  }
  req.tenantId = req.user.tenantId;
  next();
};
