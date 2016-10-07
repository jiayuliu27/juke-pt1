'use strict';

/**
* You'll be installing fvs as a global executable on your machine!
* The steps are below - but go ahead and take some time to try figuring it out on your own!
*
*
* 1. Add the following to your package.json: "bin" : { "fvs" : "./fvs.js" }
* 2. At the top of fvs.js, add #!/usr/bin/env node (this is done for you)
* 3. From your project's root: npm install -g ./
*
*/

/**
* You'll be primarily using fs methods to complete your version control system!
* Please use the synchronous versions of each method - while this is usually
* bad news in the real world, I don't want you to get caught up in callbacks.
* Instead, you can focus on learning the intricacies of Git!
*
* Some useful methods...
*   fs.readFileSync
*   fs.writeFileSync
*   fs.readdirSync
*   fs.mkdirSync
*
* https://nodejs.org/api/fs.html
*
* I've also written you a getSha1 function (since you've already written one yourselves)!
*
*/
const fs = require('fs');
const { getSha1 } = require('./util');
const FVS = '.fvs';
const INDEX = `${FVS}/index`;
const OBJECTS = `${FVS}/objects`;
const HEAD = `${FVS}/HEAD`;
const ENC = 'utf8';

// Let's write some helper functions!
const read = filePath => 
  fs.readFileSync(filePath, ENC);
const write = (filePath, content) => 
  fs.writeFileSync(filePath, content, ENC);
const readdir = dirPath => 
  fs.readdirSync(dirPath, ENC);
const mkdir = dirPath => 
  fs.mkdirSync(dirPath);
const exists = (dirPath, query) => 
  readdir(dirPath).indexOf(query) !== -1;

function createFVSObject (fileContents) {
  // a. Hash the contents of the file
  let hash = getSha1(fileContents),
      objectsDir = OBJECTS,
      dirName = hash.slice(0, 2),
      fileName = hash.slice(2);
  
  // b. Use the first two characters of the hash as the directory in .fvs/objects
  let dirPath = [objectsDir, dirName].join('/'),
      filePath = [dirPath, fileName].join('/');

  // c. Check if the directory already exists! Do you know how to check if a directory exists in node?
  if (!exists(objectsDir, dirName)) mkdir(dirPath);
  
  // d. Write a file whose name is the rest of the hash, and whose contents is the contents of the file
  write(filePath, fileContents);

  // e. Return the hash!
  return hash;
}

function createBlobObject (filePath) {
  // this will use our createFVSObject function above!
  let fileContents = read(filePath);
  return createFVSObject(fileContents);
}

function updateIndex (index, filePath, blobHash) {
  // a. parse the index into an array (if the index is empty, it should be an empty array)
  let indexArr = index ? index.split('\n') : [];
  
  // b. check if the file already has an index entry, and remove it if it does!
  indexArr = indexArr.filter(line => line.split(' ')[0] !== filePath);
  
  // c. add the new line to the index
  indexArr.push([filePath, blobHash].join(' '));
  
  // d. parse the new index back into a string and write it to .fvs/index
  let newIndex = indexArr.join('\n');
  write(INDEX, newIndex);

  // e. return string of the new index!
  return newIndex;
}

module.exports.init = function () {
  // step 1. if a .fvs file already exists, we should short circuit
  if (exists('./', FVS)) throw new Error('.fvs already exists');

  // step 2. do you remember the files/directories we need to make?
  
  mkdir(FVS);
  mkdir(OBJECTS);
  mkdir('.fvs/refs');
  write('.fvs/refs/master', '');
  write(HEAD, 'refs/master');
};

module.exports.add = function () {

  // step 0a. make sure a filename is passed in as an argument
  let fileName = process.argv.slice(2)[1];
  if (!fileName) throw new Error('No filename specified');

  // step 0b. create the index if none exists
  if (!exists(FVS, 'index')) write(INDEX, '');

  // step 1: create a 'blob' object in .fvs/objects (Hey, remember those functions we wrote earlier...?)
  let hash = createBlobObject(fileName);

  // step 2: add the file to the index
  updateIndex(read(INDEX), fileName, hash);

  // return the value of the added blob's hash!
  return hash;
};

module.exports.commit = function () {

  // step 0a. make sure we have a lovely commit message!
  let message = process.argv.slice(2)[1];
  if (!message) throw new Error('No commit message');

  // step 1. create a tree of the project based on the index

  /**
   * For now, I've done this for you! It's not easy!
   * If you get done early, try implementing this on your own!
   */
  let index = fs.readFileSync(INDEX, 'utf8');
  let treeRootHash = require('./helpers')(index);

  // step 2. create a commit object
    // if it's not the first commit, remember to get current branch from HEAD, and get the parent tree from refs

  let branch = '.fvs/' + read(HEAD),
      parent = read(branch),
      author = 'author Tom Kelly',
      tree = `tree ${treeRootHash}`,
      commitArr = [tree, author, message];

  if (parent) commitArr.push(`parent ${parent}`);
  
  let commitContent = commitArr.join('\n'),
      commitHash = createFVSObject(commitContent);

  // step 3. point the current branch at the new commit object
  write(branch, commitHash);

  // return the value of the commit's hash!
  return commitHash;
};

/**
 * 
 * Awesome! You know what to do! Go ahead and start adding and commiting like a real project!
 * It will totally work!
 * 
 */

/**
*
* EXTRA CREDIT (no specs - you're on your own!)
* Don't forget to include these in fvs-cli-helper!
*
**/

module.exports.branch = function () {

  // step 1. get the hash of the current commit from the file pointed to in HEAD

  // step 2. create the branch file at refs/
    // NOTE: in the real Git, this is in refs/heads, but we've simplified it here to just be in refs/

  // return the current commit's hash!
};

// This isn't beyond you, but it's not a piece of cake either!
// You'll need to traverse the tree - feel free to work on this
// or implement the behavior from the ./helpers file.
module.exports.checkout = function () {
  // step 1. get the commit hash that the branch points to

  // step 2. write the contents of the file tree to the working copy

  // step 3. write the file entries to the index

  // step 4. point HEAD at the new branch
};


module.exports.handleDefault = function () {
  throw 'Not a recognized command!';
};

module.exports.createFVSObject = createFVSObject;
module.exports.createBlobObject = createBlobObject;
module.exports.updateIndex = updateIndex;
