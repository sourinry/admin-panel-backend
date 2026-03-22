import Whatsapp from '../models/whatsappModel.js';
import * as userService from '../services/userService.js';

// Register
export const register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);

    // remove password
    const { password, ...safeUser } = user._doc || user;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { user, token } = await userService.loginUser(req.body);

    // remove password
    const { password, ...safeUser } = user._doc || user;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);

    // Get whatsapp numbers separately
    const whatsappNumbers = await Whatsapp.find({
      user: req.user.id,
    }).select("number");

    // Safe user object
    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      success: true,
      message: "Profile fetched",
      profile: {
        ...userObj,
        whatsappNumbers,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get All Users
export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: users.length ? "Users found" : "No users found",
      total: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// Update User
export const update = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.body
    );

    const { password, ...safeUser } = updatedUser._doc || updatedUser;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
export const remove = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};