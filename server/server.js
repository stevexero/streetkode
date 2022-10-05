const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
