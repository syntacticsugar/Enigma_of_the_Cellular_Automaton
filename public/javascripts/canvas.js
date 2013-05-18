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

// write a function that takes a coordinate like (73, 46)
// and returns its corresponding cell (7, 4)
function whereAmI(x,y,gridPixelSize) {
  var s = gridPixelSize;
  var i = Math.floor(x/s);
  var j = Math.floor(y/s);
  return [i,j]
}

// write a function that takes a cell like (7,4)
// and fills it with gray
function fillCell(i,j, gridPixelSize) {
  // ok, gridPixelSize, plz kthnxBye!
  var unit = gridPixelSize;  // nicky says to start with 30, a bigger square.

  ctx.fillStyle = "rgb(158,158,158)";
  ctx.fillStyle = "rgb(72,166,192)";
  ctx.fillRect(i*unit, j*unit, unit, unit);  // (fillRect(70,40, 10,10)
}

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

//canvasLeft = canvas.offsetLeft;
//canvasTop = canvas.offsetTop;

canvas.addEventListener('mousedown', function(event) {
  var xMouse = event.clientX - canvasLeft;
  var yMouse = event.clientY - canvasTop;
  // SUPER HACKER SUCKS!!!!!  why doesn't the correct y-point show up!?  scheisse!
  console.log( xMouse, yMouse );
});



























function renderGrid(gridPixelSize, color) {
  ctx.strokeStyle = color;

  // horizontal grid lines
  for ( var i = 0; i <= canvas.height/gridPixelSize; i++ ) {
    ctx.lineWidth = ( i % 10 === 0 ? 2.5 : 0.5 );
    var y = i * gridPixelSize + 0.5;
    drawLine(0,y, canvas.width,y);
  }

  // vertical grid lines
  for ( var j = 0; j <= canvas.width/gridPixelSize; j++ ) {
    ctx.lineWidth = ( i % 10 === 0 ? 2.5 : 0.5 );
    var x = j * gridPixelSize + 0.5;
    drawLine(x, 0, x, canvas.height);
  }
}
 function drawLine(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.stroke();
}
// renderGrid(10, "rgb(169,169,169)");
