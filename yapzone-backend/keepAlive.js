const https = require('https');

const keepAlive = () => {
    https.get('https://yapzone-be.onrender.com');
    console.log('Keep-alive request sent');
};

setInterval(keepAlive, 5 * 60 * 1000); // Sends a request every 5 minutes