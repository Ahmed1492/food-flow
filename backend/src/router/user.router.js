import { Router } from "express";
import { getAllUsers, login, register, removeImage, updateImage, userData } from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/uploadMiddleware.js";
const router = Router();



// get all users 
router.get('/users', getAllUsers);

// register
router.post('/register', register);

// login
router.post('/login', login);

// -------------------------news -------------------------------

router.post(
  "/add-image",
  authMiddleware,
  upload.single("image"),
  updateImage
);


router.delete('/remove-image', authMiddleware, removeImage);

// get user data {when is loggin}
router.get('/user-data', authMiddleware, userData);



export default router;