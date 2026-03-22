import AppError from "../utils/apiError.js";

export const validateRegister = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return next(new AppError("Invalid email", 400));
    }

    if (password.length < 6) {
      return next(new AppError("Password must be at least 6 characters", 400));
    }

    next();
  } catch (error) {
    next(error);
  }
};