// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path')
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname,'public')));

// Import routes
const sentimentRoutes = require('./routes/api');
// Use routes
app.use('/api', sentimentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
// app.listen(PORT, function() {
//     console.log('🚀 Server running at http://localhost:' + PORT);
// });