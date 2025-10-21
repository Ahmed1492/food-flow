import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOder } from '../controller/order.controller.js';
const router = Router();

// place user order
router.post('/place', authMiddleware, placeOrder);

// verify user order
router.post('/verify', verifyOder);




export default router;