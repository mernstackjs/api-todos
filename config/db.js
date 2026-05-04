const mongoose = require('mongoose');

exports.connectedDb = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
};
