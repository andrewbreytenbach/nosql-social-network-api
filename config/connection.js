const mongoose = require('mongoose');

// Establish connection to the MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,         // Parse connection string using new URL parser
  useUnifiedTopology: true,    // Use new Server Discover and Monitoring engine
  useCreateIndex: true,        // Ensure indexes are created for schema-defined indexes
  useFindAndModify: false      // Disable deprecated findOneAndUpdate() and findOneAndRemove() methods
});

// Event listener for successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to the social network API database');
});

// Event listener for connection errors
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to the social network API database:', err);
});

// Export the database connection
module.exports = mongoose.connection;
