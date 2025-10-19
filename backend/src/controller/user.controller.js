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
    const { name, email, password } = req.body;

    // validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid email address' });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'Email already in use' });
    }

    // validate password
    if (password.length < 8) {
      return res.json({ success: false, message: 'Password must be at least 8 characters' });
    }

    // hash password
    const saltRounds = parseInt(process.env.BYCRIP_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    // create token
    const token = createToken(newUser._id, process.env.JWT_SECRET_KEY);

    return res.json({
      success: true,
      message: 'User registered successfully',
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token
    });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Something went wrong', err: error.message });
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
