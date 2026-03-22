import AppError from "../utils/apiError.js";

export const validateNumber = (req, res, next) => {
  try {
    const { number } = req.body;

    if (!number) {
      return next(new AppError("Number is required", 400));
    }

    if (!/^[0-9]{10,15}$/.test(number)) {
      return next(new AppError("Invalid number format", 400));
    }

    next();
  } catch (error) {
    next(error);
  }
};