import express from "express";
const router = express.Router();

import * as userController from "../controllers/userController.js";
import { validateRegister } from "../middlewares/userValidationMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

// Public
router.post("/register", validateRegister, userController.register);

//login
router.post('/login', userController.login);

// Private
router.get("/profile", authMiddleware, userController.profile);

// Only admin can view all users
router.get(
  "/",
  authMiddleware,
  roleMiddleware("VIEW_USERS"),
  userController.getUsers,
);

// User update (self OR admin)
router.put("/:id", authMiddleware, userController.update);

// Only admin can delete
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("DELETE_USER"),
  userController.remove,
);

export default router;
