import mongoose from "mongoose";

const whatsappSchema = new mongoose.Schema({
    number:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true});


//Index for faster queries
whatsappSchema.index({ user: 1 });

const Whatsapp = mongoose.model("Whatsapp", whatsappSchema);
export default Whatsapp;