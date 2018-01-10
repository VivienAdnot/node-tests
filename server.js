var express = require('express');
var bodyParser = require('body-parser');
var Ajv = require('ajv');
var setupAsync = require('ajv-async');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.send({'serverLive' : true});
});

app.post('/anchors', function(req, res) {
    const UUID_PATTERN = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';

    const AJV_BASIC_SETTINGS = {
        coerceTypes: true,
        removeAdditional: true,
        allErrors: true
    }

    const ANCHOR_SCHEMA = {
        $async: true,
        type: 'object',
        properties: {
            _feed: { type: 'string', pattern: UUID_PATTERN },
            _target: { type: 'string', pattern: UUID_PATTERN },
            _user: { type: 'string', pattern: UUID_PATTERN },
            id: { type: 'string', pattern: UUID_PATTERN }
        },
        required: ['_feed', '_target', '_user']
    };

    var ajv = setupAsync(new Ajv(AJV_BASIC_SETTINGS));
    var validate = ajv.compile(ANCHOR_SCHEMA);
    
    validate(req.body)
        .then((result) => res.send({isValid: result}))
        .catch((err) => res.send({error: err}));
})

app.listen(8088);