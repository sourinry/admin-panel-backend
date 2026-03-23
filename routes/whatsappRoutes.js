import express from "express";
const router = express.Router();

import * as whatsappController from "../controllers/whatsappController.js";
import { validateNumber } from "../middlewares/numberValidationMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

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


// ================= ADMIN =================

// Add number to ANY user
router.post(
  "/admin/:userId",
  authMiddleware,
  roleMiddleware("ADD_WHATSAPP"),
  validateNumber,
  whatsappController.adminAddNumber
);

// Get ANY user's numbers
router.get(
  "/admin/:userId",
  authMiddleware,
  roleMiddleware("VIEW_WHATSAPP"),
  whatsappController.adminGetNumbers
);

// Update ANY number by number id
router.put(
  "/admin/:id",
  authMiddleware,
  roleMiddleware("UPDATE_WHATSAPP"),
  validateNumber,
  whatsappController.adminUpdateNumber
);

// Delete ANY number by number id 
router.delete(
  "/admin/:id",
  authMiddleware,
  roleMiddleware("DELETE_WHATSAPP"),
  whatsappController.adminDeleteNumber
);

export default router;