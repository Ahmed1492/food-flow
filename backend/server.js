import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connection.js';
import foodRouter from './src/router/food.router.js';
import userRouter from './src/router/user.router.js';
import cartRouter from './src/router/cart.router.js';
import orderRouter from './src/router/order.router.js';
import "dotenv/config";
import serverless from 'serverless-http'; // <-- added

// app Config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// api endPoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('src/uploads'));
app.use('/api/auth', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// db connection
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World! api works ');
});

// only use app.listen locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

// export serverless handler for Vercel
export const handler = serverless(app);
