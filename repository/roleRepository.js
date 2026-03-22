import Role from '../models/roleModel.js';

// Create Role repo
export const createRole = (data) => {
  return Role.create(data);
};

// Find by name repo
export const findByName = (name) => {
  return Role.findOne({ name }).lean();
};

// Find by id repo
export const findById = (id) => {
  return Role.findById(id).lean();
};

// Get all roles repo
export const getAllRoles = () => {
  return Role.find().lean();
};

// Update role repo
export const updateRole = (id, data) => {
  return Role.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true, 
  });
};

// Delete role repo
export const deleteRole = (id) => {
  return Role.findByIdAndDelete(id);
};

//remove permissions
export const removePermission = (id, permission) => {
  return Role.findByIdAndUpdate(
    id,
    {
      $pull: { permissions: permission }, 
    },
    {
      new: true,
    }
  );
};