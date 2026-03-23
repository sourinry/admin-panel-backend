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



// ================= ADMIN =================

// Admin: Add number to ANY user
export const adminAddNumber = async (userId, number) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  if (!number) {
    throw new AppError("Number is required", 400);
  }

  // duplicate check (same user + same number)
  const existing = await whatsappRepo.findNumber(userId, number);
  if (existing) {
    throw new AppError("Number already exists for this user", 409);
  }

  return await whatsappRepo.createNumber({
    user: userId,
    number,
  });
};

// Admin: Get ANY user's numbers
export const adminGetNumbers = async (userId) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  return await whatsappRepo.getNumbersByUserId(userId);
};

// Admin: Update ANY number
export const adminUpdateNumber = async (id, number) => {
  if (!id) {
    throw new AppError("Number ID is required", 400);
  }

  if (!number) {
    throw new AppError("Number is required", 400);
  }

  const existing = await whatsappRepo.findById(id);
  if (!existing) {
    throw new AppError("Number not found", 404);
  }

  return await whatsappRepo.adminUpdateNumber(id, { number });
};

// Admin: Delete ANY number
export const adminDeleteNumber = async (id) => {
  if (!id) {
    throw new AppError("Number ID is required", 400);
  }

  const existing = await whatsappRepo.findById(id);
  if (!existing) {
    throw new AppError("Number not found", 404);
  }

  await whatsappRepo.adminDeleteNumber(id);

  return true;
};