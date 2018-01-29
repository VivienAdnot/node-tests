var express = require('express');
var bodyParser = require('body-parser');

var bootstrap = require('./bootstrap');
var validateAnchors = require('./Anchors/anchors.schema');
var scraper = require('./scraper/imdb-scraper');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.send({'serverLive' : true});
});

app.post('/anchors', function(req, res) {

    validateAnchors.validate(req.body)
        .then((result) => res.send({isValid: result}))
        .catch((err) => res.send({error: err}));
});

app.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
    next();
}, function (req, res, next) {
    res.send({user : {
        name: "Vivien Adnot",
        email: "vivienadnot@amplement.com"
    }});
});

app.get('/scrape/:url', function(req, res){
    scraper.scrape("http://www.imdb.com/title/" + req.params.url);
    //url = 'http://www.imdb.com/title/tt1229340/';
    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!');
});

//bootstrap.run(app);

app.listen(8088);