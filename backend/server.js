import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connection.js';
import foodRouter from './src/router/food.router.js';
import userRouter from './src/router/user.router.js';
import cartRouter from './src/router/cart.router.js';
import orderRouter from './src/router/order.router.js';
import connectCloudinary from './src/config/cloudinary.js';
// import serverless from 'serverless-http';
import "dotenv/config";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/food', foodRouter);
app.use('/api/auth', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('Hello World! api works ');
});

// ✅ Wrap connections in async function
const startConnections = async () => {
  try {
    await connectDB();
    connectCloudinary();
    console.log("DB & Cloudinary connected!");
  } catch (err) {
    console.error("Connection Error:", err);
  }
};
startConnections(); // do NOT await at top-level

// ✅ EXPORT HANDLER FOR VERCEL
// export const handler = serverless(app);


const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
