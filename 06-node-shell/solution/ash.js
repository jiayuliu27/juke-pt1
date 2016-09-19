'use strict'

const path = require('path')
const chalk = require('chalk')
const proc = require('child_process')
const stream = require('stream')
const EventEmitter = require('events').EventEmitter

const parser = require('./grammar')

const commandLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const prompt = _ => chalk.blue(`${path.basename(process.cwd())}% `)
const fail = console.error.bind(console)

// ask() -> Void
//
function ask() {
  commandLine.question(prompt(), cmd => {
    try {
      const pipeline = parser.parse(cmd)
      console.log(chalk.yellow(JSON.stringify(pipeline, 0, 2)))
      flow(pipeline)
        .on('error', e => { console.error(e); ask() })
        .stdout.on('end', ask)
    } catch (e) {
      console.error(e)
    }
  })
}

// typealias Command = {cmd: String, args: [...String]}
//
// flow(pipeline: [...Command]) -> ChildProcess
//
// Run commands in a pipeline.
function flow(pipeline) {
  const child = pipeline.reduce((prev, command) =>
                             run(command, [prev.stdout, 'pipe', 'pipe']),
                                {stdout: 'inherit'})
 
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  return child
}

// run(command: Command) -> ChildProcess|EventEmitter
//
// Runs a command or builtin.
function run(command, stdio) {
  if (BuiltIn[command.cmd]) {
    console.log('is builtin')
    const child = BuiltIn[command.cmd](stdio, ...command.args)
    if (child && child.stdout) { return child }

    // This is a bit hacky. It fakes out having stdout and stderr streams
    // in the case of a built in command that doesn't return anything.
    const pipe = _ => {}
    const fakeChild = Object.assign(new EventEmitter, {
      stdout: Object.assign(new EventEmitter, {pipe}),
      stderr: Object.assign(new EventEmitter, {pipe})
    })
    process.nextTick(_ => {
      fakeChild.stderr.emit('end')
      fakeChild.stdout.emit('end')
    })
    return fakeChild
  }

  return proc.spawn(command.cmd, command.args, {stdio})
}

const BuiltIn = {
  cd: (stdio, dir) => process.chdir(dir)
}

ask()
