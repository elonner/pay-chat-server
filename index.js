require('dotenv').config();
require('./config/database');
const logger = require('morgan');
const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "https://pay-chat-web.vercel.app"
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

socketIO.on('connection', socket => {
  console.log(`${socket.id} user just connected!`);

  socket.on('message', data => {
    socketIO.emit('messageResponse', data);
  });
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(require('./config/checkToken'));

app.use('/api/users', require('./routes/api/users'));
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/conversations', ensureLoggedIn, require('./routes/api/conversations'));

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});