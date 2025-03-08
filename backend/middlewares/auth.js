export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res
    .status(401)
    .json({error: "You must be authenticated to access this resource"});
};
export const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .json({success: false, message: "Not Authenticated"});
    }
    if (role != req.user.role) {
      return res.status(403).json({success: false, message: "Access denied"});
    }
    next();
  };
};
