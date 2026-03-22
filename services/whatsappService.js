import * as whatsappRepo from '../repository/whatsappRepository.js'
import AppError from '../utils/apiError.js';


// Add WhatsApp Number service
export const addNumber = async (userId, number) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  // duplicate check (same user + same number) service
  const existing = await whatsappRepo.findNumber(userId, number);
  if (existing) {
    throw new AppError("Number already added", 409);
  }

  return await whatsappRepo.createNumber({
    user: userId,
    number
  });
};


// Get User Numbers service
export const getNumbers = async (userId) => {

  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  const numbers = await whatsappRepo.getUserNumber(userId);

  return numbers; // empty array valid hai
};

//delete number service
export const deleteNumber = async (id, userId) => {
  if (!id) {
    throw new AppError("Number ID is required", 400);
  }

  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  const deleted = await whatsappRepo.deleteNumber(id, userId);

  if (!deleted) {
    throw new AppError("Number not found or not authorized", 404);
  }

  return deleted;
};