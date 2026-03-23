import * as whatsappService from "../services/whatsappService.js";

// Add Number
export const addNumber = async (req, res, next) => {
  try {
    const { number } = req.body;

    const result = await whatsappService.addNumber(req.user.id, number);

    res.status(201).json({
      success: true,
      message: "WhatsApp number added successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Get Numbers
export const getNumbers = async (req, res, next) => {
  try {
    const result = await whatsappService.getNumbers(req.user.id);

    res.status(200).json({
      success: true,
      message: result.length ? "Numbers fetched" : "No numbers found",
      total: result.length,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//delete number (id- number id)
export const deleteNumber = async (req, res, next) => {
  try {
    const { id } = req.params;

    await whatsappService.deleteNumber(id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Number deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};


// ================= ADMIN =================

// Admin: Add number to ANY user
export const adminAddNumber = async (req, res, next) => {
  try {
    const { number } = req.body;
    const { userId } = req.params;

    const result = await whatsappService.adminAddNumber(userId, number);

    res.status(201).json({
      success: true,
      message: "Number added to user by admin",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Admin: Get ANY user's numbers
export const adminGetNumbers = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await whatsappService.adminGetNumbers(userId);

    res.status(200).json({
      success: true,
      message: result.length ? "Numbers fetched" : "No numbers found",
      total: result.length,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Admin: Update ANY number
export const adminUpdateNumber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { number } = req.body;

    const result = await whatsappService.adminUpdateNumber(id, number);

    res.status(200).json({
      success: true,
      message: "Number updated by admin",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Admin: Delete ANY number
export const adminDeleteNumber = async (req, res, next) => {
  try {
    const { id } = req.params;

    await whatsappService.adminDeleteNumber(id);

    res.status(200).json({
      success: true,
      message: "Number deleted by admin",
    });
  } catch (err) {
    next(err);
  }
};