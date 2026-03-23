import express from "express";
const router = express.Router();

import * as roleController from "../controllers/roleController.js";
import { validateRole } from "../middlewares/roleValidationMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

// Create Role only admin
router.post(
  "/",
  // authMiddleware,
  // roleMiddleware("CREATE_ROLE"),
  validateRole,
  roleController.create,
);

// Get All Roles only admin
router.get(
  "/",
  authMiddleware,
  roleMiddleware("VIEW_ROLES"),
  roleController.getAll,
);

// Get Role by ID only admin
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("VIEW_ROLES"),
  roleController.getOne,
);

// Update Role only admin
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("UPDATE_ROLE"),
  validateRole,
  roleController.update,
);

// Delete Role only admin
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("DELETE_ROLE"),
  roleController.remove,
);

//remove permission only admin
router.patch(
  "/:id/remove",
  authMiddleware,
  roleMiddleware("UPDATE_ROLE"),
  roleController.removePermission
);

export default router;
