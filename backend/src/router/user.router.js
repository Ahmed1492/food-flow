import { Router } from "express";
import { getAllUsers, login, register } from "../controller/user.controller.js";
const router = Router();



// get all users 
router.get('/users', getAllUsers);

// register
router.post('/register', register);

// login
router.post('/login', login);






export default router;