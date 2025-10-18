import mongoose, { Schema } from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

// if model already exist use it else create new model  
const Food = mongoose.models.food || mongoose.model('Food', foodSchema);
export default Food;