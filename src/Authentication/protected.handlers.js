const getProtected = (req, res, next) => {

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
