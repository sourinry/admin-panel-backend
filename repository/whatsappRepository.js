import Whatsapp from "../models/whatsappModel.js"

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