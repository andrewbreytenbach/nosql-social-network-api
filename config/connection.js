const { connect, connection } = require('mongoose');


// Connect to MongoDB using the provided connection URL
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api';

  connect(connectionString);

module.exports = connection;
