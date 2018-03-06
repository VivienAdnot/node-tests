var Boom = require('boom');
var Ajv = require('ajv');

const HTTP_CODE_OK = 200;
const HTTP_CODE_INTERNAL_SERVER_ERROR = 500;

exports.responseSender = (req, res, next) => {
    res.status(HTTP_CODE_OK).send(res.data);
};

exports.errorResponseSender = (err, req, res, next) => {

    if (err.isBoom) {

        res.status(err.output.statusCode).send({
            message: err.output.payload.message
        });
        next();

    } else if (err instanceof Ajv.ValidationError) {

        res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).send({
            ajvmessage: err.errors
        });

    } else {

        res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).send({
            message: err.message
        });

    }

}