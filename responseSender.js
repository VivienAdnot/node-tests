const HTTP_CODE_OK = 200;

const responseSender = ((req, res, next) => {
    res.status(HTTP_CODE_OK).send(res.data);
});

module.exports = { responseSender };