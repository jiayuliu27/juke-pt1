"use strict"

var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

const io = require('socket.io')(server)
const url = require('url')

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var rooms = {}

io.on('connection', function (socket) {
  var roomPath = url.parse(socket.handshake.headers.referer).path

  // Keep track of all the sockets in every room
  var room = (rooms[roomPath] = rooms[roomPath] || {
    path: roomPath,
    roster: {},
    history: []
  })

  // Join the room
  socket.join(room.path)

  // Add this socket to the roster
  room.roster[socket.id] = socket

  // Send the current drawing to the newly connected socket.
  socket.emit('history', room.history)
  
  console.log(`${socket.id} joined ${roomPath}`)

  // Tell everyone in the room that a new socket joined.
  socket.broadcast.to(room.path).emit('joined', socket.id)

  // Tell the new socket about everyone in the room.
  socket.emit('roster', Object.keys(room.roster))
  
  socket.on('draw', function() {
    var everyone = socket.broadcast.to(room.path)
    var args = Array.from(arguments)
    everyone.emit.apply(everyone, ['draw'].concat(args))
    room.history.push({func: 'draw', args})
  })
 
  socket.on('disconnect', function() {
    socket.broadcast.to(roomPath).emit('left', socket.id)
    delete room.roster[socket.id]
    if (Object.keys(room.roster).length === 0) {
      // Throw away the room and all its history when the last
      // person leaves.
      delete rooms[room.path]
    }
  })
})
