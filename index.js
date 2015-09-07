var express = require('express');
var Promise = require('bluebird');
var twitter = require('./src/twitter');
var view = require('./src/view');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('mustache', require('hogan-express'));
app.set('view engine', 'mustache');

app.get('/', function(req, res) {
    var promises = [ "#sunrise", "#sunset" ].map(twitter.searchImages);
    Promise.all(promises).then(function(search_results) {
        res.render('index', view.indexData(search_results));
    })
    .catch(function(err) {
        console.error(JSON.stringify(err));
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});