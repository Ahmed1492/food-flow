import mongoose, { Schema } from 'mongoose';
const userSchem = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cartData: {
    type: Object,
    default: {}
  },
  image: {
    type: String,
    required: false
  }
}, { minimize: false }
);

const User = mongoose.models.user || mongoose.model('User', userSchem);

export default User;