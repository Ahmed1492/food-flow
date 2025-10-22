import { Router } from "express";
import { getAllUsers, login, register, updateImage, userData } from "../controller/user.controller.js";
import multer from 'multer';
import authMiddleware from "../middleware/auth.js";
const router = Router();



// get all users 
router.get('/users', getAllUsers);

// register
router.post('/register', register);

// login
router.post('/login', login);

// -------------------------news -------------------------------

// image storage engine
const storage = multer.diskStorage({
  destination: "src/uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  }
});
const upload = multer({ storage });

// add profile image
router.post('/add-image', upload.single('image'), authMiddleware, updateImage);

// get user data {when is loggin}
router.get('/user-data', authMiddleware, userData)



export default router;