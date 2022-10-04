const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
