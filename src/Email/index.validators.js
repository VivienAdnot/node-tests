import Joi from 'joi';
import joiHelper from 'services/utils/joi/joi.helper';

const validators = {
    isEmailValid: {
        body: {
            email: Joi.string().trim().email()
        }
    }
};

module.exports = joiHelper.asMiddleware(validators);
