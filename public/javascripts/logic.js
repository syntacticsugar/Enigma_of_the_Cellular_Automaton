var grid = [[0,1,2]   // (0,0), (0,1), (0,2)
           ,[3,4,5]   // (1,0), (1,1), (1,2)
           ,[6,7,8]]; // (2,0), (2,1), (2,2)

var GRID = [[1,0,0]       // [(0,0) (0,1) (0,2)]   // this is 3x3
           ,[0,1,1]       // [(1,0) (1,1) (1,2)]
           ,[1,0,0]];     // [(2,0) (2,1) (2,2)]

var GRID2= [[0,1,0]       // [(0,0) (0,1) (0,2)]   // this is 3x3
           ,[1,1,0]       // [(1,0) (1,1) (1,2)]
           ,[0,1,0]];     // [(2,0) (2,1) (2,2)]

function getNeighborCoords(point) {
  var x = point[0];
  var y = point[1];
  return [ [x-1, y-1], [x, y-1], [x+1, y-1],
           [x-1, y  ],           [x+1, y  ],
           [x-1, y+1], [x, y+1], [x+1, y+1] ];
}
function validCoord(grid, point) { // returns a boolean
  var x = point[0]
    , y = point[1]
    , height = grid.length
    , width = grid[0].length;

  // x or y is negative, coord is invalid
  // x is greater than height, coord is invalid
  // y is greater than width, coord is invalid

// perpetrator of physical maladies suggests i comment this out. Tue Dec 18 18:05:23 2012
//  return (!(x < 0 || y < 0 || x >= height || y >= width))
  return (!(x < 0 || y < 0 || x >= width || y >= height))
}

function getNeighbors(grid, point) {
  var neighbors = []
    , neighborCoords = getNeighborCoords(point); // 2D-array


  for ( var i=0; i < neighborCoords.length; i++ ) {
    if (validCoord(grid, neighborCoords[i])) {
      var x = neighborCoords[i][0];
      var y = neighborCoords[i][1];
      neighbors.push(grid[x][y]);
    }
  }

  return neighbors;
}

function nextCell( cell, neighbors ){
  // var total = reduce(0, neighbors, function(x,y){return x+y});
  var total = neighbors.reduce(function(x,y){return x+y}, 0);
  if ((cell === 1) && (total === 2 || total === 3)){
    return 1; // alive
  }else if((cell === 0) && (total === 3)){
    return 1; // alive
  }else {
    return 0; // dead
  }
};

function cloneGrid(grid){
  var newGrid = [];
  for (var x = 0; x < grid.length; x++) {
    var row = grid[x]
    var newRow = [];
    for (var y = 0; y < row.length; y++) {
      newRow.push(row[y]);
    };
    newGrid.push(newRow);
  };
  return newGrid;
}

function nextGrid(currentGrid){
  var newGrid = cloneGrid(currentGrid);
  for ( var i = 0; i < newGrid.length; i++ ){
    for ( var j = 0; j < newGrid[0].length; j++ ) {
      //console.log('col = ' + j + ', row = ' + i);
      var c = currentGrid[i][j];
      //console.log('current = ' + c);
      var n = getNeighbors(currentGrid, [i,j]);
      //console.log('neighbors = ' + n);
      newGrid[i][j] = nextCell(currentGrid[i][j], getNeighbors(currentGrid, [i,j]));
    }
  }
  return newGrid;
}

function drawGrid(grrrid){ // this is just a side effect
  for ( var i = 0; i < grrrid.length; i++ ){
    for ( var j = 0; j < grrrid[0].length; j++ ) {
      process.stdout.write(grrrid[i][j] === 1 ? "# " : ". ");
    };
    process.stdout.write("\n");
  }
}

function avadaKedavra(currentGrid){
  drawGrid(currentGrid);
  process.stdout.write("\n");
  var subsequentGrid = nextGrid(currentGrid);

  setTimeout( function() { avadaKedavra(subsequentGrid) }, 500);
}


// var game = require("./nov.js");
// game.avadaKedavra(game.toad);

//module.exports = {getNeighborCoords: getNeighborCoords,
//                  validCoord: validCoord,
//                  grid: grid,
//                  GRID: GRID,
//                  GRID2: GRID2,
//                  nextCell: nextCell,
//                  nextGrid: nextGrid,
//                  getNeighbors: getNeighbors,
//                  avadaKedavra : avadaKedavra,
//                  drawGrid : drawGrid,
//                  toad : toad,
//                  holyShit : holyShit,
//                  cloneGrid: cloneGrid};
