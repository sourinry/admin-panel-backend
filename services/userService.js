import * as userRepo from '../repository/userRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/apiError.js';


// Register User
export const registerUser = async (data) => {
  const { name, email, password, role } = data;

  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser({
    name,
    email,
    password: hashedPassword,
    role
  });

  return user;
};

// Login User
export const loginUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // check user exists
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  // generate token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};


// Get User By ID
export const getUserById = async (id) => {
  if (!id) throw new AppError("User ID is required", 400);

  const user = await userRepo.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

//get al user service
export const getAllUsers = async () => {
  const users = await userRepo.getAllUsersWithDetails();

  if (!users || users.length === 0) {
    return []; // empty return (not error)
  }

  return users;
};

// Update User
export const updateUser = async (id, data) => {
  if (!id) throw new AppError("User ID is required", 400);

  // email duplicate check
  if (data.email) {
    const existing = await userRepo.findByEmail(data.email);
    if (existing && existing._id.toString() !== id) {
      throw new AppError("Email already in use", 409);
    }
  }

  // password hash
  if (data.password) {
    if (data.password.length < 6) {
      throw new AppError("Password must be at least 6 characters", 400);
    }
    data.password = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await userRepo.updateUser(id, data);

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  return updatedUser;
};

// Delete User
export const deleteUser = async (id) => {
  if (!id) throw new AppError("User ID is required", 400);

  const deleted = await userRepo.deleteUser(id);

  if (!deleted) {
    throw new AppError("User not found", 404);
  }

  return deleted;
};