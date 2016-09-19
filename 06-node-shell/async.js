'use strict'

var fs = require('fs')

// Synchronous IO
var fileData = fs.readFileSync('async.js')
//console.log(fileData.toString())


// Asynchronous IO
fs.readFile('async.js', function(err, data) {
  console.log(data.toString())
})

setTimeout(() => console.log('hi!'), 100000)
console.log('loading async.js...')


var http = require('http')

http.createServer(function(req, res){
  console.log('received request!');
  res.writeHead(200, { 'Content-Type': 'text/plain'});
  res.write('here is part of a…\n');
  res.flush()
  setTimeout(function(){
    res.end(' …response\n');
    console.log('sent response!');
  }, 1000);
}).listen(1337);
