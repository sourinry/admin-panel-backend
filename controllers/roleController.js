import * as roleService from "../services/roleService.js";

// Create Role
export const create = async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body);

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Roles
export const getAll = async (req, res, next) => {
  try {
    const roles = await roleService.getRoles();

    res.status(200).json({
      success: true,
      message: roles.length ? "Roles fetched" : "No roles found",
      total: roles.length,
      data: roles,
    });
  } catch (err) {
    next(err);
  }
};

// Get One Role
export const getOne = async (req, res, next) => {
  try {
    const role = await roleService.getRoleById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Role fetched",
      data: role,
    });
  } catch (err) {
    next(err);
  }
};

// Update Role
export const update = async (req, res, next) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Role
export const remove = async (req, res, next) => {
  try {
    await roleService.deleteRole(req.params.id);

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

//remove permissions controller
export const removePermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { permission } = req.body;

    const updatedRole = await roleService.removePermission(id, permission);

    res.status(200).json({
      success: true,
      message: "Permission removed successfully",
      role: updatedRole,
    });
  } catch (error) {
    next(error);
  }
};