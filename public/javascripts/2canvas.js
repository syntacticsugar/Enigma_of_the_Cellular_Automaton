var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;

function oHaiGrid(gridPixelSize, colour) {
  ctx.strokeStyle = colour;

  // vertical lines plz, kthnxBye!
  for (var i = 0; i < width; i+=gridPixelSize) {
    ctx.beginPath();
    ctx.moveTo(i,0);
    ctx.lineTo(i,height);
    ctx.stroke();
  }

  // horizontal lines plz, kthnxBye!
  for (var k = 0; k < height; k+=gridPixelSize) {
    ctx.beginPath();
    ctx.moveTo(0,k);
    ctx.lineTo(width,k);
    ctx.stroke();
  }
}

// global variables!!!!!!!!!!!!!
//var gridPixelSize = 10;
var gridPixelSize = 10;
var unit = gridPixelSize;  // nicky says to start with 30, a bigger square.
var runGame = false

// creates an empty grid from scratch
function emptyGridFromScratch() {
  var grid = [];
  for ( var i = 0; i <= Math.floor(width/unit); i++ ) {
    grid.push([]);
    for ( var j = 0; j <= Math.floor(height/unit); j++ ) {
      grid[i].push(0);
    }
  }
  return grid;
}

var globalGrid = emptyGridFromScratch();

// clears an existing grid
//function zilch(grid) {
function zilch() {
  for ( var i = 0; i <= Math.floor(width/unit); i++ ) {
  //for ( var i = 0; i < grid.length; i++ ) {
    for ( var j = 0; j <= Math.floor(height/unit); j++ ) {
    //for ( var j = 0; j < grid[0].length; j++ ) {
      globalGrid[i][j] = 0;
    }
  }
}


// write a function that takes a coordinate like (73, 46)
// and returns its corresponding cell (7, 4)
// this is a DEBUGGING tool for the chrome console.
function whereAmI(x,y) {
  var s = gridPixelSize;
  var i = Math.floor(x/s);
  var j = Math.floor(y/s);
  return [i,j]
}

// write a function that takes a cell like (7,4)
// and fills it with gray
function fillCell(i,j) {
  // ok, gridPixelSize, plz kthnxBye!

  ctx.fillStyle = "rgb(158,158,158)";
  ctx.fillStyle = "rgb(72,166,192)";
  ctx.fillRect(i*unit+1, j*unit+1, unit-1, unit-1);  // (fillRect(70,40, 10,10)
}

function clearCell(i,j) { ctx.clearRect(i*unit+1,j*unit+1,unit-1,unit-1) }

function diagonal() {
  ctx.fillStyle = "rgb(72,166,192)";
  for (var i = 0; i < 100; i++) {
    fillCell(i,i,10);
  }
}



// Finds the canvas top-left, as opposed to browser window's top left
// this is a lambda such that we do not pollute the global environment,
// and the garbage collector can remove the one-time-use variables ('element')
// Also, Bicky says we will not run into rebarbative namespace issues.
var canvasLeft = 0, canvasTop = 0;
(function() {
    for (var element = canvas; element !== null; element = element.offsetParent) {
        canvasLeft += element.offsetLeft;
        canvasTop  += element.offsetTop;
    }
})();

// This code may actually work since we only have ONE canvas element.
// To do: experiment later!
//canvasLeft = canvas.offsetLeft;
//canvasTop = canvas.offsetTop;

canvas.addEventListener('mousedown', function(event) {
  var xMouse = event.pageX - canvasLeft;
  var yMouse = event.pageY - canvasTop;
  //var yMouse = event.clientY - canvasTop;
  console.log( xMouse, yMouse );
});

canvas.addEventListener('mousedown', function(event) {
  var xMouse = event.pageX - canvasLeft;
  var yMouse = event.pageY - canvasTop;

  var i = whereAmI(xMouse,yMouse)[0]
  var j = whereAmI(xMouse,yMouse)[1]

  if (globalGrid[i][j] === 0 ) {
    fillCell(i,j);
    globalGrid[i][j] = 1;
  } else {
    clearCell(i,j);
    globalGrid[i][j] = 0;
  }
});

function displayGrid(grid) {
  // redraws the next step of the grid on the canvas
  for ( var i = 0; i < grid.length; i++ ){
    for ( var j = 0; j < grid[0].length; j++ ) {
      if (grid[i][j] === 0) { clearCell(i,j) }
      else { fillCell(i,j)};
    }
  }
}

function oneStep() {
  var nextGrrrid = nextGrid(globalGrid);
  displayGrid(nextGrrrid);
  globalGrid = nextGrrrid;
}

/*
//              mini-pulsar
for (var i = 0; i < holyShit.length; i++) {
  for (var j = 0; j < holyShit[0].length; j++) {
    globalGrid[33 + i][21 + j] = holyShit[i][j];
  }
}
*/

/*
//                ACORN!
for (var i = 0; i < acorn.length; i++) {
  for (var j = 0; j < acorn[0].length; j++) {
    console.log(globalGrid);
    globalGrid[j][i] = acorn[i][j]; // switch axis
    //globalGrid[j+80][i+40] = acorn[i][j]; // switch axis
  }
}
*/

// render the configuration of choice
function drawPattern(grid, pattern, offsetX, offsetY) {
  zilch();
  for (var col = 0; col < pattern.length; col++) {
    for (var row = 0; row < pattern[0].length; row++) {
      grid[offsetX + row][offsetY + col] = pattern[col][row];
    }
  }
}

// THIS IS WHERE WE CONTROL OUR CONFIGURATIONS, for now
//drawPattern(globalGrid, acornSimple, 50, 40);
drawPattern(globalGrid, pulsar, 20, 10);

//                PULSAR!
// for (var i = 0; i < pulsar.length; i++) {
//   for (var j = 0; j < pulsar[0].length; j++) {
//     globalGrid[33 + i][21 + j] = pulsar[i][j];
//   }
// }


oHaiGrid(gridPixelSize, "rgb(170,170,170)");
displayGrid(globalGrid);

// remember, 'runGame' had initially been set to 'false'
setInterval(function () {if (runGame) {oneStep()}}, 1);

document.getElementById('toggle').onclick = function () {
  /*
  // version 1
  if (runGame) {
    runGame = false;
  } else {
    runGame = true;
  }
  // version 2 (oh, I though I was being so smart!)
  runGame ? runGame = false : runGame = true;
  // version 3 (because I was brainless before Nick's intervention)
  runGame = runGame ? false : true;
  */
  runGame = !runGame; // "ouch!" I say
};
//document.getElementById('pause').onclick = function () {runGame = false};
document.getElementById('clear').onclick = function () {
  zilch();
  displayGrid(globalGrid);
};

function configLoader(config, offsetX, offsetY) {
  // first, we wrap the code in a function & return it: A CLOSURE.
  // this function "closes over" config, offsetX, offsetY
  return function () {
    // 1. pauses game state
    runGame = false;
    // 2. loads new config
    drawPattern(globalGrid, config, offsetX, offsetY);
    // 3. display new grid
    displayGrid(globalGrid);
  }
}

//document.getElementById('acorn').onclick = function () {configLoader(acornSimple, 50, 40)};
document.getElementById('acorn').onclick = configLoader(acornSimple, 50, 40);
document.getElementById('holyShit').onclick = configLoader(holyShit, 20, 10);
//document.getElementById('glider').onclick = configLoader(glider, 30, 30);
//document.getElementById('random').onclick = configLoader(random);



// TO DO:
// a:active state for 'play' button.
// 'one-step' button
// place graphic design on 'Fuck Me on Github' 
// by putting danging hearts on the ribbon.


function toggle(object) {
  var element = document.getElementById(object);
  if (element.className!="pause") {
  }
  else if (element.className=="pause") {
  }
}


