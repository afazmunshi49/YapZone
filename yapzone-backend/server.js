const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const socketServer = require('./socketServer');
const authRoutes = require('./routes/authRoutes');
const friendInvitationRoutes = require('./routes/friendInvitationRoutes');

const PORT = process.env.PORT || process.env.API_PORT

const app = express();

// All of the data coming to the server will be converted to json format
app.use(express.json());
app.use(cors());

// register routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

console.log('Welcome to my server! HI')

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`)
    });
     // Run keep-alive script
     require('./keepAlive');
})
.catch(err => {
    console.log("Database connection failed. Server not started.");
    console.log(err);
})