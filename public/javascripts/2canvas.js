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

// global variables!!!!!!!!!!!!!!!!!!!!!
//var gridPixelSize = 10;
var gridPixelSize = 5;
var unit = gridPixelSize;  // nicky says to start with 30, a bigger square.
var runGame = false

// empty grid.
var grrrid = [];
for ( var i = 0; i <= Math.floor(width/unit); i++ ) {
  grrrid.push([]);
  for ( var j = 0; j <= Math.floor(height/unit); j++ ) {
    grrrid[i].push(0);
  }
}

// empty grrrid 
function zilch() {
  for ( var i = 0; i <= Math.floor(width/unit); i++ ) {
    for ( var j = 0; j <= Math.floor(height/unit); j++ ) {
      grrrid[i][j] = 0;
    }
  }
}


// write a function that takes a coordinate like (73, 46)
// and returns its corresponding cell (7, 4)
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



// Find the canvas top-left.
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
  // SUPER HACKER SUCKS!!!!!  why doesn't the correct y-point show up!?  scheisse!
  console.log( xMouse, yMouse );
});

canvas.addEventListener('mousedown', function(event) {
  var xMouse = event.pageX - canvasLeft;
  var yMouse = event.pageY - canvasTop;

  var i = whereAmI(xMouse,yMouse)[0]
  var j = whereAmI(xMouse,yMouse)[1]

  if (grrrid[i][j] === 0 ) {
    fillCell(i,j);
    grrrid[i][j] = 1;
  }else {
    clearCell(i,j);
    grrrid[i][j] = 0;
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
  var nextGrrrid = nextGrid(grrrid);
  displayGrid(nextGrrrid);
  grrrid = nextGrrrid;
}

//               mini-pulsar
for (var i = 0; i < holyShit.length; i++) {
  for (var j = 0; j < holyShit[0].length; j++) {
    grrrid[33 + i][21 + j] = holyShit[i][j];
  }
}

/*
//                ACORN!
for (var i = 0; i < acorn.length; i++) {
  for (var j = 0; j < acorn[0].length; j++) {
    grrrid[i+20][j+40] = acorn[i][j];
  }
}

//                PULSAR!
for (var i = 0; i < pulsar.length; i++) {
  for (var j = 0; j < pulsar[0].length; j++) {
    grrrid[33 + i][21 + j] = pulsar[i][j];
  }
}
*/


oHaiGrid(gridPixelSize, "rgb(170,170,170)");
displayGrid(grrrid);

setInterval(function () {if (runGame) {oneStep()}}, 1); 

document.getElementById('begin').onclick = function () {runGame = true}
document.getElementById('pause').onclick = function () {runGame = false}
document.getElementById('clear').onclick = function () {zilch(); displayGrid(grrrid)}
