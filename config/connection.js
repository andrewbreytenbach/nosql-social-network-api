const mongoose = require('mongoose');

// Connect to MongoDB using the provided connection URL
mongoose.connect('mongodb://localhost:27017/social-network-api', {
  useNewUrlParser: true,          // Use the new URL parser
  useUnifiedTopology: true       // Use the new Server Discover and Monitoring engine
});

// Get the default connection object from Mongoose
const connection = mongoose.connection;

// Event handler for successful connection
connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event handler for connection errors
connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Export the connection object
module.exports = connection;
