var express = require('express');
var bodyParser = require('body-parser');

var bootstrap = require('./bootstrap');
var validateAnchors = require('./Anchors/anchors.schema');
var responseSender = require('./services/responseSender');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.send({'serverLive' : true});
});

bootstrap.run(app);

app.use(responseSender.errorResponseSender);

app.listen(8088);