import User from "../../db/models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { v2 as cloudinary } from "cloudinary";


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




export const updateImage = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "food-flow/users" },
        (err, result) => (err ? reject(err) : resolve(result))
      ).end(req.file.buffer);
    });

    // Delete old image if exists
    if (user.public_id) {
      await cloudinary.uploader.destroy(user.public_id);
    }

    user.image = uploadResult.secure_url;
    user.public_id = uploadResult.public_id;
    await user.save();

    return res.json({ success: true, message: "Image updated successfully", image: uploadResult.secure_url });
  } catch (err) {
    console.error("Update image error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const removeImage = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.image) return res.status(404).json({ success: false, message: "No image found" });

    if (user.public_id) {
      await cloudinary.uploader.destroy(user.public_id);
    }

    user.image = null;
    user.public_id = null;
    await user.save();

    return res.json({ success: true, message: "Profile image removed successfully" });
  } catch (err) {
    console.error("Remove image error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};



// get user data 
export const userData = async (req, res, next) => {
  try {
    let userId = req.userId;
    const user = await User.findById(userId);
    return res.json({ success: true, user });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });

  }
};