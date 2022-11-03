const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sellershop', require('./routes/sellerShopRoutes'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
