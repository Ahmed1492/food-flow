import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connection.js';



// app Config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());


const products = [
  { id: 1, title: 'product 1', desc: 'test' },
  { id: 2, title: 'product 2', desc: 'test' },
  { id: 3, title: 'product 3', desc: 'test' },
  { id: 4, title: 'product 4', desc: 'test' },
];

app.get('/', (req, res) => {
  return res.json({ message: true, products });
});


// listen {test server}
app.listen(port, () => {
  console.log(`app is listen on port ${port}`);
});

connectDB();


//