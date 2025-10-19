import User from "../../db/models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';


// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// get all users 
export const getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find({});
    return res.json({ success: true, users });
  } catch (error) {
    console.log(error);
  }
};



// register
export const register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    // check user exist
    let checkEmailExist = await User.findOne({ email });
    if (checkEmailExist) {
      return res.json({ success: false, message: 'email already used' });
    }
    // check email is valid
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'email not valid' });
    }
    // check password is valid
    if (password.length < 8) {
      return res.json({ success: false, message: 'enter a strong password' });
    }
    // hashing user Password
    const hashedPassword = await bcrypt.hash(password, process.env.BYCRIP_SALT_ROUNDS);
    // create new user 
    const newUser = await User.create({ name, email, password: hashedPassword });

    // create token 
    let token = await createToken(newUser._id);
    return res.json({ success: true, message: 'user created successfully', user: newUser, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "some thing went wrong", err: error.message });
  }
};




// login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check user email
    let checkEmailExist = await User.findOne({ email });
    if (!checkEmailExist) {
      return res.json({ success: false, message: 'user not found' });
    }
    // check user password
    let checkPassword = await bcrypt.compare(password, checkEmailExist.password);
    if (!checkPassword) {
      return res.json({ success: false, message: 'user email or password wrong' });
    }
    // generate user token
    let token = createToken(checkEmailExist._id, process.env.JWT_SECRET_KEY);

    return res.json({ success: true, message: 'user logged in successfully', token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "some thing went wrong", err: error.message });
  }
};
