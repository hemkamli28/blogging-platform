require('dotenv').config();
const mongoose = require('mongoose');

// Function to connect to MongoDB using Mongoose
const connectToMongo = async () => {
    try {
      // Attempt to connect to the MongoDB database using the provided URL
      await mongoose.connect(process.env.MONGO_URL);
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      // Handle errors if the connection fails
      console.error(`MongoDB connection error: ${error.message}`);
    }
};

module.exports = connectToMongo;
