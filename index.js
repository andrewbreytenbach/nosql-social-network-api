const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
