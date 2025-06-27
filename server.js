// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('🟢 New user connected');

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
