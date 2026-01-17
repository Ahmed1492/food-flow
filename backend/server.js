// server.js
import express from "express";
import cors from "cors";
import { connectDB } from "./db/connection.js";
import foodRouter from "./src/router/food.router.js";
import userRouter from "./src/router/user.router.js";
import cartRouter from "./src/router/cart.router.js";
import orderRouter from "./src/router/order.router.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/food", foodRouter);
app.use("/images", express.static("src/uploads"));
app.use("/api/auth", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


app.get('/', (req, res) => {
  res.send('Hello World! api works ');
});


connectDB();

export default app;