import Joi from 'joi';
import async from 'async';
import Boom from 'boom';
import { extend } from 'lodash';

const MUST_BE_EMPTY = {};

function validate(params, schema, options, waterfallCallback) {

    const _options = Object.assign(
        { abortEarly: false },
        options
    );

    Joi.validate(params, schema, _options, (err, cleanedSchema) => {

        if (err) {

            return waterfallCallback(Boom.badData(err.details[0].message));

        }
        return waterfallCallback(null, cleanedSchema);

    });

}

function chainValidators(req, res, next, schema) {

    const validators = [];
    const params = extend({}, req.params);
    const paramsOptions = {
        ...schema.options,
        context: { req }
    };

    validators.push(callback => validate(
        params, schema.params || MUST_BE_EMPTY, paramsOptions,
        (result, cleanedSchema) => {

            req.params = extend(params, cleanedSchema);
            callback(result);

        }
    ));

    const query = extend({}, req.query);
    const queryOptions = {
        ...schema.options,
        context: { req }
    };

    validators.push(callback => validate(
        query, schema.query || MUST_BE_EMPTY, queryOptions,
        (result, cleanedSchema) => {

            req.query = extend(query, cleanedSchema);
            callback(result);

        }
    ));

    const body = extend({}, req.body);
    const bodyOptions = {
        ...schema.options,
        context: { req }
    };

    validators.push(callback => validate(
        body, schema.body || MUST_BE_EMPTY, bodyOptions,
        (result, cleanedSchema) => {

            req.body = extend(body, cleanedSchema);
            callback(result);

        }
    ));

    return validators;

}

function validatorToMiddleware(schema) {

    return (req, res, next) => {

        const validators = chainValidators(req, res, next, schema);

        async.waterfall(validators, (err, result) => {

            if (err) {

                next(err);
                return;

            }
            next(result);

        });

    };

}

function objectsToMiddlewares(handlersValidators) {

    return Object
    .keys(handlersValidators)
    .map((handler) => {

        const middlewareValidators = {};
        middlewareValidators[handler] = validatorToMiddleware(handlersValidators[handler]);
        return middlewareValidators;

    });

}

function asMiddleware(handlersValidators) {

    return objectsToMiddlewares(handlersValidators)
    .reduce((previous, current) => Object.assign(previous, current));

}

module.exports = { asMiddleware, chainValidators };
