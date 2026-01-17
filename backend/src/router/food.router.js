
import { Router } from "express";
import { addFood, getFoods, removeFood } from "../controller/food.controller.js";
import upload from "../middleware/uploadMiddleware.js";
const router = Router();






// add food item
router.post("/add", upload.single("image"), addFood);
// get all food items
router.get('/get', getFoods);


// remove food item
router.delete('/remove', removeFood);



export default router;