import User from "../../db/models/user.model.js";

// Add to cart controller
export const addToCart = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    let cartData = user.cartData || {};
    //  If item not in cart, add it with quantity = 1
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    }
    //  If item exists, just increase quantity
    else {
      cartData[itemId] += 1;
    }
    await User.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, cartData, user, message: 'added to cart' });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });
  }
};


// remove to cart 
export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    let cartData = user.cartData || {};
    //  If item not in cart, remove it with quantity = 1
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    await User.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, cartData, user, message: 'removed from cart' });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });
  }
};




// get user cart
export const getCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    let user = await User.findById(userId);
    let userCart = user.cartData;
    return res.json({ success: true, userCart });



  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });
  }
};