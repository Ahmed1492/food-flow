import Order from "../../db/models/order.model.js";
import User from "../../db/models/user.model.js";
import Stripe from 'stripe';
import "dotenv/config";

// place order
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const placeOrder = async (req, res, next) => {

  const fronend_url = `http://localhost:5173`;
  try {
    let userId = req.userId;
    let { items, amount, address } = req.body;
    const newOrder = new Order({ userId, items, amount, address });
    await newOrder.save();
    let user = await User.findByIdAndUpdate(userId, { cartData: {} });

    //
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'USD',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 40,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: 'USD',
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2 * 100 * 40
      },
      quantity: 1
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${fronend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${fronend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });

  }
};

// verify order
export const verifyOder = async (req, res, next) => {
  try {
    const { orderId, success } = req.body;
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Paid" });
    } else {
      await Order.findByIdAndDelete(orderId);
      return res.json({ success: false, message: 'Not Paid' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });

  }
};

// get all orders {admin}
export const getOrders = async (req, res, next) => {
  try {

    const orders = await Order.find({});
    return res.json({ success: true, orders: orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });

  }
};

// get user orders {front-end}
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ success: false, message: 'login first ' });
    }
    const userOrders = await Order.find({ userId });
    return res.json({ success: true, orders: userOrders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });

  }
};


// update order status {admin}
export const OrderupdateStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId) {
      return res.json({ success: false, message: 'some thing went wrong' });
    }
    if (!status) {
      return res.json({ success: false, message: 'no status found' });
    }
    const orderUpdateStatus = await Order.findByIdAndUpdate(orderId, { status });
    return res.json({ success: true, order: orderUpdateStatus });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });

  }
}

