import AppError from "../utils/apiError.js";

export const validateRole = (req, res, next) => {
  try {
    const { name, permissions } = req.body;

    if (!name) {
      return next(new AppError("Role name is required", 400));
    }

    if (permissions && !Array.isArray(permissions)) {
      return next(new AppError("Permissions must be an array", 400));
    }

    next();
  } catch (error) {
    next(error);
  }
};