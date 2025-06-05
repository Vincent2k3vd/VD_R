const express = require('express');

const app = express();
const port = 2003;
const path = require('path')

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'publics', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});