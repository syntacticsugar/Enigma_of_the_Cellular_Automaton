var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d");





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
renderGrid(10, "hsla(181,100%,47%,0.4)");
