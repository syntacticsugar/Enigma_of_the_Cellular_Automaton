var fs = require('fs');
/*
 * GET home page.
 */
exports.regular = function(req, res) {
  fs.readFile(__dirname + '/../views/regular.html', 'utf8', function(err, text){
    res.send(text);
  });
};

exports.clone_regular = function(req, res) {
  fs.readFile(__dirname + '/../views/clone_regular.html', 'utf8', function(err, text){
    res.send(text);
  });
};

exports.index = function(req, res){
  res.render('index', { title: 'game of life' });
};
