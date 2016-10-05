// sleep(ms: Number) -> Promise
//
// Returns a Promise that resolves after ms milliseconds.
// Never rejects you, never lets you down.
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      resolve('timer fired')
    }, ms)
  })
}

const fs = require('fs')

// readFileAsync(filename: String) -> Promise<Buffer>
function readFileAsync(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, (err, buf) => {
      if (err) { return reject(err) }
      resolve(buf)
    })
  })
}

var out = []
['file1', 'file2', 'file3']
  .forEach((file, i) => fs.readFile(file, (err, buf) => {
    if (err) { return out[i] = err }
    out[i] = buf
  })

var fileProms = ['file1', 'file2', 'file3']
    .map(file => readFileAsync(file))

fileProms[0].then(


// readFileCapitalized(file) -> Promise<String>
//
// Reads a file and returns its capitalized content.
function readFileCapitalized(file) {
  return readFileAsync(file)
    .then(buf => buf.toString().toUpperCase())
}

readFileCapitalized(__filename)
  .then(cap => console.log(cap))
  .catch(err => console.error(err))


sleep(1000)
  .then(value => {
    console.log(value)
    return readFileAsync(__filename)
  })
  .then(content => {
    console.log(content.toString())
    return readFileAsync(__filename + '.does.not.exist')
  })
  .catch(error => console.error(error))

/// Promises are a fluent API, kinda like this:
function promiseLike() {
  return {
    then: function(cb) {
      console.log('in .then')
      return promiseLike()
    }
  }
}

promiseLike().then().then().then()
  
