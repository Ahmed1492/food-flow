import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connection.js';
import foodRouter from './src/router/food.router.js';
import userRouter from './src/router/user.router.js';
import cartRouter from './src/router/cart.router.js';
import orderRouter from './src/router/order.router.js';
import "dotenv/config";



// app Config
const app = express();
const port = 4000;

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


// listen {test server}
app.listen(port, () => {
  console.log(`app is listen on port ${port}`);
  

});
