import isEmail from 'isemail';
import Hoek from 'hoek';

const validateEmail = (email, isEmailOptions) => {

    if (isEmailOptions) {

        Hoek.assert(typeof isEmailOptions === 'object', 'email options must be an object');
        Hoek.assert(typeof isEmailOptions.checkDNS === 'undefined', 'checkDNS option is not supported');
        Hoek.assert(typeof isEmailOptions.tldWhitelist === 'undefined' ||
            typeof isEmailOptions.tldWhitelist === 'object', 'tldWhitelist must be an array or object');
        Hoek.assert(
            typeof isEmailOptions.minDomainAtoms === 'undefined' || (Number.isSafeInteger(isEmailOptions.minDomainAtoms) &&
            isEmailOptions.minDomainAtoms > 0),
            'minDomainAtoms must be a positive integer'
        );
        Hoek.assert(
            typeof isEmailOptions.errorLevel === 'undefined' ||
            typeof isEmailOptions.errorLevel === 'boolean' ||
            (
                Number.isSafeInteger(isEmailOptions.errorLevel) &&
                isEmailOptions.errorLevel >= 0
            ),
            'errorLevel must be a non-negative integer or boolean'
        );

    }

    return isEmail.validate(email, isEmailOptions);

};

exports.isEmailValid = (req, res, next) => {

    const { email } = req.body;

    try {

        const result = validateEmail(email);

        if (result === true || result === 0) {

            res.data = 'ok';
            next();
            return;

        }

        next(new Error('invalid email'));
        return;

    } catch (err) {

        next(err);

    }

};
