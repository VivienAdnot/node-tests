var Ajv = require('ajv');
var setupAsync = require('ajv-async');
var constants = require('./anchors.const');
var ajvUtils = require('../services/utils/ajv/ajv.const');

function getRdbData(shouldSucceed) {
    const data = (shouldSucceed)
        ? [{ id: 123 }, { id: 456 }]
        : [];

    return Promise.resolve(data);
}

function checkIdExists(schema, data) {
    return getRdbData(true)
        .then((rows) => {
            return !!rows.length;
        })
}

const ANCHOR_SCHEMA = {
    $async: true,
    type: 'object',
    properties: {
        _feed: { type: 'string', pattern: ajvUtils.UUID_PATTERN },
        _target: { type: 'string', pattern: ajvUtils.UUID_PATTERN },
        _user: { type: 'string', pattern: ajvUtils.UUID_PATTERN },
        id: {
            type: 'string',
            pattern: ajvUtils.UUID_PATTERN,
            idExists: { table: 'anchors'}
        },
        status: { type: 'integer', enum: constants.SUBSCRIPTION_STATUSES },
    },
    required: ['_feed', '_target', '_user']
};

var ajv = setupAsync(new Ajv(ajvUtils.AJV_BASIC_SETTINGS));
ajv.addKeyword('idExists', {
    async: true,
    type: 'string',
    validate: checkIdExists
});

var validate = ajv.compile(ANCHOR_SCHEMA);

module.exports = {
    validate
};