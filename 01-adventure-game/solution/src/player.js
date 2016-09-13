'use strict';

var inquirer = require('inquirer');

var game = require('../example/example.game');

function play(node) {
  // Base case
  if (!node.connections.length) {
    console.log(node.text);
    return Promise.resolve();
  }

  // Recursive case
  return inquirer.prompt([{
    type: 'list',
    name: 'node',
    message: node.text,
    choices: node.connections
  }])
  .then(function (answer) {
    return play(answer.node);
  })
}

play(game.startingPoint)
.then(function () {
  console.log('Game over.')
})