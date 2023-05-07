const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');


// Always require and configure neat the top
require('dotenv').config();
// Connect to the database (after the dotenv)
require('./config/database');

const userRouter = require('./routes/api/users')
const chatRouter = require('./routes/dm/chats');
const messageRouter = require('./routes/dm/messages')
const app = express();

app.use(logger('dev'));
app.use(express.json());

if( process.env.NODE_ENV === 'production'){
  app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'build')));
}

// API routes here
app.use(require('./config/checkToken'));
app.use('/api/users', userRouter);
app.use('/chat', chatRouter);
app.use('/messages', messageRouter);
// "Catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});

