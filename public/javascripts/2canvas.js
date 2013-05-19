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
var gridPixelSize = 10;
var unit = gridPixelSize;  // nicky says to start with 30, a bigger square.

var grrrid = [];
for ( var j = 0; j < height/unit; j++ ) {
  grrrid.push([]);
  for ( var i = 0; i < width/unit; i++ ) {
    grrrid[j].push(0);
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

oHaiGrid(10,"rgb(170,170,170)");


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

  fillCell(i,j);

});

