import Food from '../../db/models/food.model.js';
import foodModel from '../../db/models/food.model.js';
import fs from 'fs';


// add food item
export const addFood = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    const filename = req.file?.filename;
    if (!name || !description || !price || !category || !filename) {
      return res.json({ succeeded: false, message: 'All Fields Required' });
    }
    let food = await new Food({ name, description, price, category, image: filename });
    food.save();
    return res.json({ succeeded: true, message: 'food added successfully.', food });
  } catch (error) {
    console.log(error);

    res.status(500).json({ succeeded: false, message: 'Server Error' });
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

// remove food item
export const removeFood = async (req, res) => {
  try {
    let { id } = req.body;
    let itemById = await Food.findById(id);
    if (!itemById) {
      return res.json({ successe: false, message: 'item not found' });
    }
    let removedFood = await Food.findByIdAndDelete(id);
    // remove image from uploads folder
    fs.unlink(`src/uploads/${removedFood.image}`, () => { });
    return res.json({ success: true, message: 'item Deleted Successfully !', removedItem: removedFood });
  } catch (error) {
    console.log(error);
    return res.json({ successe: false, message: 'Some Thing Went Wrong' });
  }
};