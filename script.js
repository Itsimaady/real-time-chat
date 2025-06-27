// public/script.js

const socket = io();
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

// Emit message on form submit
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value.trim();

  if (message !== '') {
    socket.emit('chat message', message);
    input.value = '';
  }
});

// Listen for incoming messages
socket.on('chat message', (message) => {
  const messageElement = document.createElement('li');
  messageElement.textContent = message;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
});
