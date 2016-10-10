"use strict";

(function() {
  const socket = io('/')

  whiteboard.on('draw', function(...stuff) {    
//    socket.emit.apply(socket, ['draw'].concat(Array.from(arguments)))
    socket.emit('draw', ...stuff)
  })
  
  socket.on('draw', whiteboard.draw)

  socket.on('history', function(history) {
    console.log(`Replaying ${history.length} commands.`)
    history.forEach(function(command) {
      var func = whiteboard[command.func]
      func.apply(whiteboard, command.args)
    })
  })
})()



