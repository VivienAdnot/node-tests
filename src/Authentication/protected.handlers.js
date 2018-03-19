exports.protectedUser = (req, res, next) => {

    console.log({
        user: req.user,
        company: req.company,
        credentials: req.credentials
    });

    res.data = {
        data: {
            name: 'protected ressource user',
            access: 'OK'
        }
    };
    next();
    return Promise.resolve();

};

exports.protectedCompany = (req, res, next) => {

    console.log({
        user: req.user,
        company: req.company,
        credentials: req.credentials
    });

    res.data = {
        data: {
            name: 'protected ressource company',
            access: 'OK'
        }
    };
    next();
    return Promise.resolve();

};