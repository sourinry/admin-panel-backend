import express from "express";
const router = express.Router();

import * as whatsappController from "../controllers/whatsappController.js";
import { validateNumber } from "../middlewares/numberValidationMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Add number (only authenticated user)
router.post(
  "/",
  authMiddleware,
  validateNumber,
  whatsappController.addNumber
);

// Get own numbers
router.get(
  "/",
  authMiddleware,
  whatsappController.getNumbers
);

// Delete number
router.delete(
  "/:id",
  authMiddleware,
  whatsappController.deleteNumber
);

export default router;