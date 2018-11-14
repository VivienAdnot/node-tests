import sha1 from 'sha1';

const s = 'KJAZOJOEJJ32O12JI312EZAOIZADOZJDJDOAZIDJZOIZEAFJEZFEIAJ23OI4J320982304923';

const h = p =>
    sha1(sha1(p) + s);

exports.postPassword = (req, res, next) => {

    const { p } = req.body;

    const hash = h(p);

    res.data = hash;
    next();

};
