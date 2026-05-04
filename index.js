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

const startServer = async () => {
  try {
    await connectedDb();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
