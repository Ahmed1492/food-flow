import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOder, getUserOrders, getOrders, OrderupdateStatus } from '../controller/order.controller.js';
const router = Router();

// place user order
router.post('/place', authMiddleware, placeOrder);

// verify user order
router.post('/verify', verifyOder);

// get all orders  {admin}
router.get('/orders', getOrders);

// get user orders {front-end}
router.get('/user-orders', authMiddleware, getUserOrders);

// update order status {admin}
router.put('/update-status', OrderupdateStatus);



export default router;