import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connection.js';
import foodRouter from './src/router/food.router.js';



// app Config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());


// api endPoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('src/uploads'))



// db connection
connectDB();

// listen {test server}
app.listen(port, () => {
  console.log(`app is listen on port ${port}`);
});
