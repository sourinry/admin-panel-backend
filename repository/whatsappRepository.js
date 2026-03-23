import Whatsapp from "../models/whatsappModel.js"

//======= users use ==========//
//add numbers 
export const createNumber = (data) => {
    return Whatsapp.create(data);
};

//get numbers
export const getUserNumber = (userId) => {
    return Whatsapp.find({user: userId});
};

// duplicate check
export const findNumber = (userId, number) => {
  return Whatsapp.findOne({
    user: userId,
    number: number
  });
};

//delete number based on owership
export const deleteNumber = (id, userId) => {
  return Whatsapp.findOneAndDelete({
    _id: id,
    user: userId, //ownership check
  });
}; 

// ================= ADMIN =================

// Get ANY user's numbers
export const getNumbersByUserId = (userId) => {
  return Whatsapp.find({ user: userId });
};

// Find number by ID (common use)
export const findById = (id) => {
  return Whatsapp.findById(id);
};

// Update ANY number (admin)
export const adminUpdateNumber = (id, data) => {
  return Whatsapp.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// Delete ANY number (admin)
export const adminDeleteNumber = (id) => {
  return Whatsapp.findByIdAndDelete(id);
};