exports.pushNotificationToken = (req, res, next) => {

    const { _user } = req.params;
    const { token: legacyTokenModel } = req.body;

    req.body = {
        tokens: {
            firebase: {
                mobile: legacyTokenModel.mobile || 'none',
                token: legacyTokenModel.firebase
            }
        }
    };

    res.redirect(`/v2/${_user}/pushNotificationToken`);

};

exports.pushNotificationTokenV2 = (req, res, next) => {

    console.log(req.params);
    console.log(req.body);

    res.data = req.body;
    next();

};
