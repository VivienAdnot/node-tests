var Ajv = require('ajv');
var setupAsync = require('ajv-async');
var constants = require('./index.const');
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
        _feed: { type: 'string', pattern: ajvUtils.UUID_PATTERN, idExists: { table: 'feeds'} },
        _user: { type: 'string', pattern: ajvUtils.UUID_PATTERN, idExists: { table: 'users'} },
        id: { type: 'string', pattern: ajvUtils.UUID_PATTERN },
        status: { type: 'integer', enum: constants.SUBSCRIPTION_STATUSES }
    },
    required: ['_feed', '_user', 'status']
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