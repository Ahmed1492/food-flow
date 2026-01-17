import Food from '../../db/models/food.model.js';
import { v2 as cloudinary } from "cloudinary";



export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ succeeded: false, message: "Image is required" });
    }

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "food-flow/foods" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    // Create food item
    const food = await Food.create({
      name,
      description,
      price,
      category,
      image: uploadResult.secure_url,
      public_id: uploadResult.public_id, // optional, useful for deletion
    });

    res.json({ succeeded: true, message: "Food added successfully", food });

  } catch (error) {
    console.error(error);
    res.status(500).json({ succeeded: false, message: error.message });
  }
};


// get all foods
export const getFoods = async (req, res) => {
  try {
    let food = await Food.find({});
    return res.json({ success: true, food });
  } catch (error) {
    console.log(error);

  }
};


// Remove food item
export const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    const item = await Food.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    // Remove image from Cloudinary
    if (item.public_id) {
      await cloudinary.uploader.destroy(item.public_id);
    }

    // Delete food from DB
    await Food.findByIdAndDelete(id);

    return res.json({ success: true, message: "Item deleted successfully", removedItem: item });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
