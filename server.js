const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;
const pasteApiKey = '24d806658be6e4df118a5dbec72b9590a5c82045da1ab7c87f562ddb47c9f1ab';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Create new item
app.post('/api/items', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  const newItem = {
    id: Date.now(), // Using timestamp as ID since we don't have an items array anymore
    name,
    email,
    message
  };

  try {
    // Save to pastebin service
    const pasteContent = JSON.stringify(newItem, null, 2);
    const response = await axios.post('http://192.168.1.32:8720/paste', {
      content: pasteContent,
      expiration: "Never",
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add the pastebin URL to the response if available
    if (response.data && response.data.url) {
      newItem.pasteUrl = response.data.url;
    }

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error saving to pastebin:', error.message);
    // Still return the item even if pastebin save fails
    res.status(201).json({
      ...newItem,
      pastebinError: 'Failed to save to pastebin service'
    });
  }
});

// Catch-all handler to serve index.html for any non-API routes that don't match static files
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`- Static site: http://localhost:${PORT}`);
  console.log(`- API endpoint: http://localhost:${PORT}/api/items`);
});