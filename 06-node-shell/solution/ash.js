'use strict'

/**
 * ash.js
 *
 * A simple shell.
 *
 * This does not quite implement the workshop as specified. In
 * particular, it doesn't implement head, cat, ls, etc. Instead, it
 * has the ability to launch child processes using node's
 * child_process module. This gives it access to the power of the
 * standard UNIX tooling binaries.
 *
 * Ashi Krishnan <ashi@gracehopperacademy.com>
 **/

const fs = require('fs')
const path = require('path')
const proc = require('child_process')
const stream = require('stream')
const {red, yellow, blue, green} = require('chalk')
const EventEmitter = require('events').EventEmitter

// We use an actual parser grammar, defined in grammar.pegjs
const parser = require('./grammar')

// Prompt is a function so we can reevaluate it as needed
const prompt = () => blue(`${path.basename(process.cwd())}% `)

// The node readline module is quite a nice way to get user input at
// the command line.
const shell = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: prompt(),
})

function ask() {
  // Set the prompt each time, to reflect changes in the current
  // directory.
  shell.setPrompt(prompt())

  // Prompt the user for a command.
  shell.prompt()
}

shell
  .on('line', line => {
    try {
      const pipeline = parser.parse(line)
      console.log(yellow(`[parsed] "${line}" -> ${JSON.stringify(pipeline, 0, 2)}`))
      const pipe = flow(pipeline)
            .on('error', e => console.error(red(e)))
  
      pipe.stderr.pipe(process.stderr)
      pipe.stdout
        .on('end', ask)      
        .pipe(process.stdout)      
    } catch (e) {
      console.error(red(e))
    }
  })

// typealias Command = {cmd: String, args: [...String]}
//
// flow(pipeline: [...Command]) -> ChildProcess
//
// Run commands in a pipeline.
function flow(pipeline) {
  const stdio = ['pipe', 'pipe', 'pipe']
  return pipeline
    .map(command => run(command, stdio))
    .reduce((src, dst) => {
      // Wire up the output of src to the input of dst.
      src.stdout.pipe(dst.stdin)
      return dst
    })
}

// run(command: Command) -> ChildProcess|EventEmitter
//
// Runs a command or builtin.
function run(command, stdio) {
  if (BuiltIn[command.cmd]) {
    // Catch built in commands and run them differently
    console.log(green(`[builtin] ${command.cmd}`))    
    const child = BuiltIn[command.cmd](stdio, ...command.args)
    if (child && child.stdout) { return child }
    return fakeChild()
  }

  // Otherwise, launch a child process. This will run the program
  // specified on the command line.
  const child = proc.spawn(command.cmd, command.args, {stdio})

  // Print process information in green.
  console.log(green(`[${child.pid}] ${command.cmd}`))
  return child
}

// This is a bit hacky. It fakes out having stdout and stderr streams
// in the case of a built in command that doesn't return anything.
function fakeChild() {
  const pipe = _ => {}
  const fake = Object.assign(new EventEmitter, {
    stdout: Object.assign(new EventEmitter, {pipe}),
    stderr: Object.assign(new EventEmitter, {pipe})
  })
  process.nextTick(_ => {
    fake.stderr.emit('end')
    fake.stdout.emit('end')
  })
  return fake
}

const BuiltIn = {
  cd: (stdio, dir) => process.chdir(dir)
}

// module.parent will be null if we were the main module.
if (!module.parent) ask()
