// index.js
const express = require('express');
const line = require('@line/bot-sdk');
const path = require('path');

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',  // Replace with your token
  channelSecret: 'YOUR_CHANNEL_SECRET'              // Replace with your secret
};

const app = express();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Add a specific route for the root path with logging
app.get('/', (req, res) => {
  console.log('=== DEBUG INFO ===');
  console.log('Serving root path');
  console.log('Current directory:', __dirname);
  console.log('Attempting to serve:', path.join(__dirname, 'public/index.html'));
  
  const filePath = path.join(__dirname, 'public/index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error loading page');
    } else {
      console.log('File sent successfully');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).send('Something broke!');
});

// LINE webhook endpoint
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error('Error handling event:', err);
      res.status(500).end();
    });
});

// LINE client initialization for replying messages
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken
});

// Handle incoming webhook events
function handleEvent(event) {
  // Only handle text messages here
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  const receivedText = event.message.text;
  // Reply with a simple echo message
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: 'text',
      text: `You said: ${receivedText}`
    }]
  });
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
