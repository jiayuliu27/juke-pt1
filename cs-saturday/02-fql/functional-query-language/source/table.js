'use strict';

var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');

function Table (folderPath, isIndexTable) {
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
  this.folderPath = folderPath;
  // table needs place to store ANY index table
  if (!isIndexTable) {
    var tableName = folderPath.split('/').pop();
    this.index = new Table(`${folderPath}/../${tableName}_indexes`, true);
  }
}

// example
// 0 => '0000.json'
Table.toFilename = function (id) {
  if (typeof id !== 'number') return `${id}.json`;
  var filename = (`000${id}.json`).slice(-9);
  return filename;
};

// example
// '0000.json' => 0
var numericalPattern = /^\d+.json$/;
Table.toId = function (filename) {
  if (!numericalPattern.test(filename)) {
    return filename.slice(0, -5);
  }
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
  var filepath = this.getFilepath(id);;
  if (!fs.existsSync(filepath)) return undefined;
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
  var indexTable = this.index.read(columnName);
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
      // do something?
      indexTable[rowValue].push(row.id);
    } else {
      indexTable[rowValue] = [row.id];
    }
  });
  // then add to this.indexTables
  this.index.write(columnName, indexTable);
};

Table.prototype.drop = function () {
  if (this.index) this.index.drop();
  rimraf.sync(this.folderPath);
};

Table.prototype.erase = function (id) {
  var filepath = this.getFilepath(id);
  if (!fs.existsSync(filepath)) return undefined;
  fs.unlinkSync(filepath);
};

Table.prototype.write = function (id, row) {
  var filepath = this.getFilepath(id);
  var rowString = JSON.stringify(row);

  if (this.index) {
    var oldRow = this.read(id);
    var columnNames = this.index.getRowIds();
    columnNames.forEach((columnName) => {
      var indexUpdates = {};
      var rowValue = row[columnName];
      var oldRowValue = oldRow && oldRow[columnName];
      if (rowValue === oldRowValue) return;
      var existingIdsForRowValue = this.index.read(columnName)[rowValue];
      if (existingIdsForRowValue) {
        existingIdsForRowValue.push(row.id);
        indexUpdates[rowValue] = existingIdsForRowValue;
      } else {
        indexUpdates[rowValue] = [row.id];
      }
      if (oldRow) {
        var existingIdsForOldRowValue = this.index.read(columnName)[oldRowValue];
        indexUpdates[oldRowValue] = existingIdsForOldRowValue.filter(function (id) {
          return id !== oldRow.id
        });
      }
      this.index.update(columnName, indexUpdates);
    });
  }
  
  fs.writeFileSync(filepath, rowString);
};

Table.prototype.getFilepath = function (id) {
  return `${this.folderPath}/${Table.toFilename(id)}`;
};

Table.prototype.update = function (id, updates) {
  var row = this.read(id);
  var updated = Object.assign(row, updates);
  this.write(id, updated);
};

Table.prototype.insert = function (rowData) {
  var currentMax = this.getRowIds().reduce(function (runningMax, id) {
    return Math.max(runningMax, id);
  }, -1);
  var id = 1 + currentMax;
  rowData.id = id;
  this.write(id, rowData);
};

Table.prototype.removeIndexTable = function (columnName) {
  this.index.erase(columnName);
};

module.exports = Table;
