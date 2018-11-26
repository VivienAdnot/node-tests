import Ajv from 'ajv';
import setupAsync from 'ajv-async';
import * as constants from './index.const';
import ajvUtils from '../services/utils/ajv/ajv.const';

const getRdbData = (shouldSucceed) => {

    const data = (shouldSucceed)
        ? [{ id: 123 }, { id: 456 }]
        : [];

    return Promise.resolve(data);

};

const checkIdExists = () => {

    return getRdbData(true)
    .then(rows => !!rows.length);

};

const ANCHOR_SCHEMA = {
    $async: true,
    type: 'object',
    properties: {
        _feed: { type: 'string', pattern: ajvUtils.UUID_PATTERN, idExists: { table: 'feeds' } },
        _user: { type: 'string', pattern: ajvUtils.UUID_PATTERN, idExists: { table: 'users' } },
        id: { type: 'string', pattern: ajvUtils.UUID_PATTERN },
        status: { type: 'integer', enum: constants.SUBSCRIPTION_STATUSES }
    },
    required: ['_feed', '_user', 'status']
};

const ajv = setupAsync(new Ajv(ajvUtils.AJV_BASIC_SETTINGS));
ajv.addKeyword('idExists', {
    async: true,
    type: 'string',
    validate: checkIdExists
});

const validate = ajv.compile(ANCHOR_SCHEMA);

module.exports = {
    validate
};
