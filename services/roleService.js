import * as roleRepo from '../repository/roleRepository.js';
import AppError from '../utils/apiError.js';

// Create Role
export const createRole = async (data) => {
  const { name } = data;

  if (!name) {
    throw new AppError("Role name is required", 400);
  }

  const existing = await roleRepo.findByName(name);
  if (existing) {
    throw new AppError("Role already exists", 409);
  }

  return await roleRepo.createRole(data);
};

// Get All Roles
export const getRoles = async () => {
  return await roleRepo.getAllRoles();
};

// Get Role By ID
export const getRoleById = async (id) => {
  if (!id) {
    throw new AppError("Role ID is required", 400);
  }

  const role = await roleRepo.findById(id);

  if (!role) {
    throw new AppError("Role not found", 404);
  }

  return role;
};

// Update Role
export const updateRole = async (id, data) => {
  if (!id) {
    throw new AppError("Role ID is required", 400);
  }

  const existingRole = await roleRepo.findById(id);

  if (!existingRole) {
    throw new AppError("Role not found", 404);
  }

  // merge permissions
  if (data.permissions) {
    const mergedPermissions = [
      ...new Set([
        ...existingRole.permissions,
        ...data.permissions,
      ]),
    ];

    data.permissions = mergedPermissions;
  }

  const updated = await roleRepo.updateRole(id, data);

  return updated;
};

// Delete Role
export const deleteRole = async (id) => {
  if (!id) {
    throw new AppError("Role ID is required", 400);
  }

  const role = await roleRepo.findById(id);

  if (!role) {
    throw new AppError("Role not found", 404);
  }

  // protect admin role 
  if (role.name === "admin") {
    throw new AppError("Cannot delete admin role", 403);
  }

  return await roleRepo.deleteRole(id);
};

//remove primissions service
export const removePermission = async (id, permission) => {
  if (!id) {
    throw new AppError("Role ID is required", 400);
  }

  if (!permission) {
    throw new AppError("Permission is required", 400);
  }

  // check role exists
  const role = await roleRepo.findById(id);

  if (!role) {
    throw new AppError("Role not found", 404);
  }

  // check permission exists
  if (!role.permissions.includes(permission)) {
    throw new AppError("Permission not found in role", 400);
  }

  const updated = await roleRepo.removePermission(id, permission);

  return updated;
};