const { config } = require('dotenv');
const cors = require('cors');
config();
const express = require('express');
const { connectedDb } = require('./config/db');
const router = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.URL_FRONTEND,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.get('/health', (req, res) => {
  res.json({ message: 'App Health is OKi' });
});

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Todo API',
    version: '1.0.0',
    status: 'Server is up and running',
  });
});

const axios = require('axios');

setInterval(
  () => {
    axios
      .get('https://bcu25d-api-todos.onrender.com/health')
      .then(() => console.log('Self-ping successful'))
      .catch((err) => console.error('Self-ping failed', err.message));
  },
  10 * 60 * 1000,
);

const startServer = async () => {
  try {
    await connectedDb();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
