const getProtected = (req, res, next) => {

    console.log(req.credentials);
    res.data = {
        data: {
            name: 'protected ressource',
            access: 'OK'
        }
    };
    next();
    return Promise.resolve();

};

export default getProtected;
