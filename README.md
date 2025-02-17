# LINE LIFF Application

A simple LINE Frontend Framework (LIFF) application that integrates with LINE Messaging API.

## Prerequisites

Before you begin, ensure you have the following:
- [Node.js](https://nodejs.org/) installed (version 12 or higher)
- A [LINE Developer Account](https://developers.line.biz/console/)
- LIFF app created in LINE Developer Console
- LINE Bot channel created in LINE Developer Console

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Configure your environment:
   - Update `index.js` with your LINE channel credentials:
     ```javascript
     const config = {
       channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
       channelSecret: 'YOUR_CHANNEL_SECRET'
     };
     ```
   - Update `public/index.html` with your LIFF ID:
     ```javascript
     const liffId = 'YOUR_LIFF_ID';
     ```

## Project Structure

```
├── index.js           # Express server setup
├── public/            # Static files directory
│   └── index.html     # LIFF application frontend
├── package.json       # Project dependencies
└── README.md         # Project documentation
```

## Running the Application

1. Start the server:
```bash
node index.js
```

2. Access the application:
   - Local development: `http://localhost:3000`
   - Note: LIFF apps require HTTPS in production environments

## Features

- LINE Login integration
- User profile display
- Basic LIFF functionality demonstration

## Development Notes

- The application uses Express.js for the backend server
- Static files are served from the `public` directory
- LIFF SDK is loaded from LINE's CDN
- Requires proper CORS and HTTPS setup for production deployment

## LINE Platform Configuration

1. In LINE Developers Console:
   - Set up a Messaging API channel
   - Create a LIFF app
   - Add the deployed URL to the LIFF app settings
   - Configure the endpoint URL in your bot settings

2. Required Permissions:
   - profile
   - openid
   - message.write (if messaging features are used)

## Troubleshooting

- Ensure all LINE credentials are correctly configured
- Check browser console for LIFF-related errors
- Verify HTTPS is properly set up in production
- Confirm the LIFF URL is registered in LINE Developers Console

## Security Notes

- Never commit sensitive credentials to version control
- Use environment variables for production deployments
- Implement proper security measures for production use

## License

[MIT License]
