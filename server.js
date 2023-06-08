const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(routes);

// Default error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server after successful database connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
