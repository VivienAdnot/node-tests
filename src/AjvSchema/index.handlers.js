import schema from './index.schema';

exports.postAnchors = (req, res, next) => {

    schema.validate(req.body)
        .then(() => next())
        .catch(next);

};
