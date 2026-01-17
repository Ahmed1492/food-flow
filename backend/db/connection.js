import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('DB Connected'));
    await mongoose.connect(`${process.env.MONGODB_URL}/food-flow`);
  } catch (error) {
    console.log(error.message);

  }
};