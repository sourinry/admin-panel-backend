import User from '../models/userModel.js';

//create an user
export const createUser = async(data)=>{
    return User.create(data);
};

export const getAllUsersWithDetails = async () => {
  return User.aggregate([
    // Join Whatsapp
    {
      $lookup: {
        from: "whatsapps",
        localField: "_id",
        foreignField: "user",
        as: "whatsappNumbers",
      },
    },

    // Join Role
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "role",
      },
    },

    // Convert role array → object
    {
      $unwind: {
        path: "$role",
        preserveNullAndEmptyArrays: true,
      },
    },

    // Remove sensitive fields
    {
      $project: {
        password: 0,
        "whatsappNumbers.user": 0,
      },
    },
  ]);
};

//find by email
export const findByEmail = async(email)=>{
    return User.findOne({email});
};

//find by id 
export const findById = async(id)=>{
    return User.findById(id)
    .populate("role", "name permissions")
};

//update user
export const updateUser = async(id,data)=>{
    return User.findByIdAndUpdate(id,data,{new : true});
};

//delete user
export const deleteUser = async(id)=>{
    return User.findByIdAndDelete(id);
};