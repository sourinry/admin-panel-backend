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
