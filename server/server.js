const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

const stripe = require('stripe')(
  'sk_test_51Lx1CTF65xdpOsbGeT0HoohEzo7CF0MCPZbM9xNrCfNE4nmZ4yVowNxgPxiYyWhSzbStlYQvq7cP8FJL0S2pXpfo00gAXsSDnv'
);
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

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
