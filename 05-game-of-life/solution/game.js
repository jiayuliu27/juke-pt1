var gameUtils = {
  getNeighbors: function (cell, x, y) {
    var neighbors = [];
    for (var i = x - 1; i <= x + 1; i++) {
      for (var j = y - 1; j <= y + 1; j++) {
        if (i === x && j === y) continue;
        var cell = document.getElementById(i + '-' + j);
        neighbors.push(cell);
      }
    }

    return neighbors.filter(function (cell) {
      return cell !== null;
    });
  },

  countLiveNeighbors: function (neighbors) {
    return neighbors.filter(function (cell) {
      return cell.getAttribute('data-status') === 'alive';
    }).length;
  },

  changeCell: function (cell) {
    if (cell.getAttribute('data-status') === 'alive') {
      cell.setAttribute('data-status', 'dead');
      cell.className = 'dead';
    } else if (cell.getAttribute('data-status') === 'dead') {
      cell.setAttribute('data-status', 'alive');
      cell.className = 'alive';
    }
  },

  setCellStatus: function (cell, status) {
    cell.setAttribute('data-status', status);
    cell.className = status;
  },

  isAlive: function (cell) {
    return cell.getAttribute('data-status') === 'alive';
  }
};

var gameOfLife = {
  width: 25,
  height: 25,
  stepInterval: null,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);

    this.table = goltable;
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    var cells = [].slice.call(document.getElementsByTagName('td'));
    cells.forEach(function (cell) {
      var id = cell.id.split('-');
      var x = parseInt(id[0]);
      var y = parseInt(id[1]);
      iteratorFunc(cell, x, y);
    });
  },
  
  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y" 
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white
    
    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board
    
    var onCellClick = function (e) {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?
      var cell = e.target;

      // how to set the style of the cell when it's clicked
      if (!gameUtils.isAlive(cell)) {
        gameUtils.changeCell(cell);
      } else {
        gameUtils.changeCell(cell);
      }
    };
    
    // var cell00 = document.getElementById('0-0');
    // cell00.onclick = onCellClick;

    // var cells = [].slice.call(document.getElementsByTagName('td'));
    // cells.forEach(function (cell) {
    //   cell.onclick = onCellClick;
    // });

    this.table.onclick = onCellClick;

    document.getElementById('step_btn').onclick = this.step.bind(this);
    document.getElementById('play_btn').onclick = this.enableAutoPlay.bind(this);
    document.getElementById('reset_btn').onclick = this.resetRandom.bind(this);
    document.getElementById('clear_btn').onclick = this.clear.bind(this);
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors

    // for each cell
      // get neighbors
      // count alive neighbors
    // change cell state

    var cellsToChange = [];

    this.forEachCell(function(cell, x, y) {
      var neighbors = gameUtils.getNeighbors(cell, x, y);
      var liveNeighbors = gameUtils.countLiveNeighbors(neighbors);

      if (gameUtils.isAlive(cell) && (liveNeighbors < 2 || liveNeighbors > 3)) {
        cellsToChange.push(cell)
      } else if (!gameUtils.isAlive(cell) && liveNeighbors === 3) {
        cellsToChange.push(cell);
      }
    });

    cellsToChange.forEach(gameUtils.changeCell);

  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
    if (this.stepInterval === null) {
      this.stepInterval = setInterval(this.step.bind(this), 100);
    } else {
      this.stopAutoPlay();
    }
  },

  resetRandom: function () {
    function setRandomStatus (cell) {
      var status = Math.floor((Math.random() * 100) + 1) < 50 ? 'alive' : 'dead';
      gameUtils.setCellStatus(cell, status);
    }

    this.forEachCell(setRandomStatus);
  },

  stopAutoPlay: function () {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
  },

  clear: function () {
    if (this.stepInterval !== null) this.stopAutoPlay();

    this.forEachCell(function (cell) {
      gameUtils.setCellStatus(cell, 'dead');
    });

  }
};

gameOfLife.createAndShowBoard();