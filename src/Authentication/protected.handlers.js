exports.protectedUser = (req, res, next) => {

    res.data = {
        data: {
            name: 'protected ressource user',
            user: req.user
        }
    };
    next();
    return Promise.resolve();

};

exports.protectedCompany = (req, res, next) => {

    res.data = {
        data: {
            name: 'protected ressource company',
            company: req.company
        }
    };
    next();
    return Promise.resolve();

};
