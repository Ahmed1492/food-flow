import { Router } from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/cart.controller.js';
import authMiddleware from '../middleware/auth.js';
const router = Router();

// add to cart
router.post('/add', authMiddleware, addToCart);

// remove from cart
router.put('/remove', authMiddleware, removeFromCart);

// get cart items
router.get('/get', authMiddleware, getCart);




export default router;