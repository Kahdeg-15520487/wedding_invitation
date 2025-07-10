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

  if (!name || !message) {
    return res.status(400).json({ message: 'Name, and message are required' });
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

// Get all items from pastebin (for viewing wishes)
app.get('/api/items', async (req, res) => {
  try {
    // Fetch all pastes from the pastebin service
    const response = await axios.get('http://192.168.1.32:8720/pastes');
    
    if (!response.data || !Array.isArray(response.data)) {
      return res.json({ wishes: [] });
    }
    
    // Parse the wishes from the paste content
    const wishes = response.data
      .map(paste => {
        try {
          // Parse the JSON content from each paste
          const wishData = JSON.parse(paste.Content);
          return {
            id: wishData.id,
            name: wishData.name,
            email: wishData.email,
            message: wishData.message,
            date: paste.CreatedAt,
            pasteId: paste.ID
          };
        } catch (parseError) {
          console.error('Error parsing paste content:', parseError);
          return null;
        }
      })
      .filter(wish => wish !== null) // Remove any failed parses
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by newest first
    
    res.json({ wishes });
  } catch (error) {
    console.error('Error retrieving wishes:', error.message);
    res.status(500).json({ error: 'Failed to retrieve wishes' });
  }
});

// Catch-all handler to serve index.html for any non-API routes that don't match static files
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  // Serve loichuc.html for /loichuc/ path
  if (req.path === '/loichuc/' || req.path === '/loichuc') {
    return res.sendFile(path.join(__dirname, 'loichuc.html'));
  }
  
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`- Static site: http://localhost:${PORT}`);
  console.log(`- API endpoint: http://localhost:${PORT}/api/items`);
});