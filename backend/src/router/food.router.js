
import { Router } from "express";
import { addFood, getFoods, removeFood } from "../controller/food.controller.js";
import multer from "multer";
const router = Router();



// Image Storage Engine
const storage = multer.diskStorage({
  destination: 'src/uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// add food item
router.post('/add', upload.single('image'), addFood);

// get all food items
router.get('/get', getFoods);


// remove food item
router.delete('/remove', removeFood);



export default router;