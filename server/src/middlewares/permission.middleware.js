
export const checkPermission = (permission) => {
  return (req, res, next) => {
    const perms = req.user?.permissions || [];

    // allow access, if permission
    if (perms.includes(permission)) return next();

    // block 
    return res.status(403).json({
      success: false,
      message: `Access denied. Missing permission: ${permission}`
    });
  };
};
