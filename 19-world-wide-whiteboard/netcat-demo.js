"use strict"

// We'll be using this a lot — make a short alias
const dump = JSON.stringify

// Create an HTTP server that always serves a couple
// of script tags.
const httpServer = require('http').createServer(function(req, rsp) {
  rsp.end(`
          <script src="/socket.io/socket.io.js"></script>
          <script>
          // This JS is running on the client. Whee!

          // Open a WebSocket connection to the / route on the current
          // server:
          var socket = io('/');
          
          socket.on('joined', function (event) {
            document.write('<b>' +
                           // event.address is an object; dump
                           // it so that we can see all its fields.
                           dump(event.address) +
                           ' joined</b><br>')
          })

          socket.on('said', function (event) {
            document.write('<i>' +
                           // Just print the address part of address for
                           // each message.
                           event.address.address + '</i>: '
                           + event.message.toString() + '<br>')
          })
          
          socket.on('left', function (event) {
            document.write('<b>' +
                           dump(event.address) +
                           ' left</b><br>')
          })          
          </script>
          `)
})

// Listen on port 9999
httpServer.listen(9999)
  .on('listening', () =>
      console.log(`HTTP server is listening on ${dump(httpServer.address(), 0, 2)}`))

// Now let's add Socket IO.

// The Socket IO module exports a function.
// This function takes an http server as its argument
// and attaches itself.
//   - It provides WebSocket functionality
//   - It serves the client library at /socket.io/socket.io.js
var io = require('socket.io')(httpServer)

// Now let's give Socket IO something to do.
// We'll create a simple TCP server.
//    (You don't have to do this normally.
//    It's just for the demo.)
// We'll emit events from each TCP connection to the web page via Socket IO.
// Basic chat room!
var net = require('net')

var tcpServer = net.createServer(function(socket) {
  var address = {address: socket.remoteAddress, port: socket.remotePort}
  
  io.emit('joined', {address: address})

  socket.on('data', function(data) {
    var message = data.toString()
    console.log(address.address, ':', message.trim())
    io.emit('said', {address: address, message: message})
  })

  socket.on('end', function() {
    io.emit('left', {address: address})
  })
})

tcpServer.listen(9876)
  .on('listening', () =>
      console.log(`TCP server is listening on ${dump(tcpServer.address(), 0, 2)}`))
