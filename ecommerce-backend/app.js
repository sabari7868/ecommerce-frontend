// Simple Express API with CORS enabled
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Ecommerce Backend Running 🚀' });
});

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Laptop', price: 59999 },
    { id: 2, name: 'Smartphone', price: 24999 },
    { id: 3, name: 'Headphones', price: 1999 }
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
