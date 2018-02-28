var schema = require('./index.schema');

exports.postAnchors = (req, res, next) => {

    schema.validate(req.body)
        .then(() => next())
        .catch((err) => next(err));

}