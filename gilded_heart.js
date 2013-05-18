var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d");

// function dish(fillStyle,fillRect) { 
//   var soothingColors = { 
//           cadetblue: "rgba(95,158,160,1)" 
//          ,orchid: "rgba(218,112,214,1)" 
//          ,steelblue: "rgba(70,130,130,1)" 
//          ,gold: "rgba(255,215,0.5)" 
//   };
//   for (var i = 1; i <= 10; i++) { 
//     ctx.fillStyle = soothingColors; 
//     ctx.fillRect(x,y,width,height);
//   }
// }

var yPos = 0;
var velocity = 0;
var yPos = canvas.height/2;
var velocity = -5;

function PebbleOnASpring() {
  // 1) clear canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
  // 2) draw pebblee
  yPos = yPos + velocity;
  ctx.fillStyle = "cadetblue";
  ctx.fillRect(canvas.width/2-300,yPos,14,7);
  var acceleration = (canvas.height/2 - yPos) * 0.001
  velocity = velocity + acceleration; 

  ctx.fillStyle = "hsla(304,43,87,1)";
  //y-Position
  ctx.fillRect(canvas.width/2-150, canvas.height/2, 10, (yPos - canvas.height/2));
  //velocity
  ctx.fillRect(canvas.width/2-100, canvas.height/2, 10, 10*velocity);
  //acceleration
  ctx.fillRect(canvas.width/2-50, canvas.height/2, 10, 200*acceleration);
}
var image = new Image();

function heart() {
  var heart = new Image();
  heart.onload = function() {
    ctx.drawImage(heart, canvas.width/2, canvas.height/2);
  }
  heart.src = "gilded_heart.png";
}


setInterval(PebbleOnASpring, 50);

function renderGrid(gridPixelSize, color) {
        context.strokeStyle = color;

        // horizontal grid lines
        for (var i = 0; i <= canvas.height/gridPixelSize; ++i) {
            context.lineWidth = (i % 10 === 0 ? 2.5 : 0.5);
            var y = i * gridPixelSize + .5;
            drawLine(0, y, canvas.width, y);
        }
        // vertical grid lines
        for (var j = 0; j <= canvas.width/gridPixelSize; ++j) {
            context.lineWidth = (j % 10 === 0 ? 2.5 : 0.5);
            var x = j * gridPixelSize + .5;
            drawLine(x, 0, x, canvas.height);
        }
    }

    function drawLine(x0, y0, x1, y1) {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.closePath();
        context.stroke();        
    }

renderGrid(10, "hsla(181,100,52,1)");

