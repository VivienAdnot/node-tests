var Boom = require('boom');
var Ajv = require('ajv');

const HTTP_CODE_OK = 200;
const HTTP_CODE_INTERNAL_SERVER_ERROR = 500;

exports.responseSender = (req, res, next) => {
    res.status(HTTP_CODE_OK).send(res.data);
};

exports.errorResponseSender = (err, req, res, next) => {

    console.log('errorResponseSender start');

    if (err.isBoom) {

        console.log('errorResponseSender isBoom yes');

        res.status(err.output.statusCode).send({
            message: err.output.payload.message
        });
        next();

    } else if (err instanceof Ajv.ValidationError) {

        console.log('errorResponseSender instanceof Ajv.ValidationError yes');

        res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).send({
            ajvmessage: err.errors
        });

    } else {

        console.log('errorResponseSender else');

        res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).send({
            message: err.message
        });

    }

}