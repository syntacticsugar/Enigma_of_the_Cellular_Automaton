console.log($);
console.log('avocado');
function flipCell(html_element){
    var current = html_element.attr("state");
    var new_value = current == "1" ? "0" : "1";
    html_element.attr('state', new_value);
}

$(document).ready(function(){
    initialGrid();
    var cells = $('.cell');
    var interval = setInterval(function() {
        cells.each(function(){
            flipCell($(this));
        });
    }, 1000);
    $('.cell').click(function(){
        flipCell($(this));
    });
});
function initialGrid(){
  console.log("glistening honeycomb");
  var columnCount = 65, cellCount = 50;
  var grid = $("<div id='grid' />");
  for (var i = 0; i < columnCount; i++){
    var column = $("<div class='column' />");
      for (var k = 0; k < cellCount; k++){
        var r = Math.random() > 0.5 ? "1" : "0";
        var cell = $("<div class='cell' />");
        column.append(cell.attr('state', r));
    }
    grid.append(column);
  }
  $("#grid").replaceWith(grid);
  console.log("torrents of blue cascade forth");
};
// stuff from nov.js
function timeForSeriousBusiness(){
};
