import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`mongoDB connected`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
