'use strict';

var fs = require('fs');

function Table (folderPath) {
  this.folderPath = folderPath;
  // table needs place to store ANY index table
  this.indexTables = {};
}

// example
// 0 => '0000.json'
Table.toFilename = function (id) {
  var filename = (`000${id}.json`).slice(-9);
  return filename;
};

// example
// '0000.json' => 0
Table.toId = function (filename) {
  var id = parseInt(filename);
  return id;
};

// example
// 0 => {
//   "id": 0,
//   "name": "Aliens",
//   "year": 1986,
//   "rank": 8.2
// }
Table.prototype.read = function (id) {
  var filepath = `${this.folderPath}/${Table.toFilename(id)}`;
  var filecontents = fs.readFileSync(filepath);
  var row = JSON.parse(filecontents);
  return row;
};

// example
// => [0,1,2,5,6]
Table.prototype.getRowIds = function () {
  var filenames = fs.readdirSync(this.folderPath);
  var rowIds = filenames.map(Table.toId);
  return rowIds;
};

Table.prototype.hasIndexTable = function (columnName) {
  return Boolean(this.getIndexTable(columnName));
};

Table.prototype.getIndexTable = function (columnName) {
  var indexTable = this.indexTables[columnName];
  return indexTable;
};

Table.prototype.addIndexTable = function (columnName) {
  var indexTable = {};
  // populate the index table
  // go through all rows
  this.getRowIds().map((id) => this.read(id))
  .forEach(function (row) {
    // capture the value at columnname
    var rowValue = row[columnName];
    // use that value as a key in the indextable
    // add the id of the row to that entry in the indextable
    if (indexTable[rowValue]) {
      indexTable[rowValue].push(row.id);
    } else {
      indexTable[rowValue] = [row.id];
    }
  });
  // then add to this.indexTables
  this.indexTables[columnName] = indexTable;
};

module.exports = Table;
