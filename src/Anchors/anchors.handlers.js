var schema = require('./anchors.schema');

exports.postAnchors = (req, res, next) => {

    schema.validate(req.body)
        .then(() => next())
        .catch((err) => next(err));

}