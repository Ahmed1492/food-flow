import mongoose from "mongoose";


export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://ahmed:01148623288@cluster0.rhuzw8c.mongodb.net/food-flow').then((res) => console.log('DB Connected ')
  ).catch((err) => console.log(err)
  );

};