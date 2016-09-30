'use strict';

var Promise = require('bluebird'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile

const read = promisifiedReadFile,  // jesus.

      // JS tidbit: (x, y) evaluates x and then y and has the value of y.
      //
      // So these versions of blue and magenta return the string they were
      // passed in.
      blue = str => (exerciseUtils.blue(str), str),
      magenta = str => (exerciseUtils.magenta(str), str)

const sayDone = _ => console.log('done')

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF
};

// runs every problem given as command-line argument to process
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. log poem one stanza one (ignore errors)
   *
   */

  read('poem-one/stanza-01.txt').then(blue)
  
}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. log poem one stanza two and three, in any order
   *    (ignore errors)
   *
   */

  ['poem-one/stanza-02.txt',
   'poem-one/stanza-03.txt']
    .map(read)
    .forEach(stanza => stanza.then(blue))

}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. read & log poem one stanza two and *then* read & log stanza three
   *    log 'done' when both are done
   *    (ignore errors)
   *
   */

  read('poem-one/stanza-02.txt')
    .then(blue)
    .then(_ => read('poem-one/stanza-03.txt'))
    .then(blue)
    .then(sayDone)
}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. log poem one stanza four or an error if it occurs
   *
   */

  read('poem-one/wrong-file-name.txt')
    .then(blue)
    .catch(magenta)
}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. read & log poem one stanza three and *then* read & log stanza four
   *    or log an error if it occurs for either file read
   *
   */

  // callback version
  read('poem-one/stanza-03.txt')
    .then(blue)
    .then(_ => read('poem-one/wrong-file-name.txt'))
    .then(blue)
    .catch(magenta)
    .then(sayDone)

}

function problemF () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * F. read & log poem one stanza three and *then* read & log stanza four
   *    or log an error if it occurs for either file read
   *    always log 'done' when everything is done
   *
   */

  read('poem-one/stanza-03.txt')
    .then(blue)
    .then(_ => read('poem-one/stanza-04.wrong.name.txt'))
    .then(blue)
    .catch(magenta)
    .then(sayDone)
}
