import mongoose from "mongoose";
import Whatsapp from "./whatsappModel.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true },
);

//Compare Password Method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


//Index for performance
userSchema.index({ email: 1 });

// CASCADE DELETE MIDDLEWARE
userSchema.pre("findOneAndDelete", async function () {
  const user = await this.model.findOne(this.getQuery());

  if (user) {
    await Whatsapp.deleteMany({ user: user._id });
  }
});


const User = mongoose.model("User", userSchema);
export default User;
