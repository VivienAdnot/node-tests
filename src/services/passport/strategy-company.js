import LocalStrategy from 'passport-local';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
    getCompanyById,
    getCredentialsByEmail,
    getCredentialsById
} from '../database/model';

class CompanyStrategy extends Strategy {

    constructor(options, verify) {

        super(options, verify);
        this.name = 'company-jwt';

    }

}

const companyHeaderAuthenticateStrategy = new CompanyStrategy({
    jwtFromRequest: (req) => {

        const extractAuthHeader = ExtractJwt.fromAuthHeaderAsBearerToken();
        const token = extractAuthHeader(req);
        return token;

    },
    secretOrKey: 'VIVIEN'
}, (payload, done) => {

    getCredentialsById(payload.id)
        .then((credentials) => {

            if (!credentials) {

                return Promise.reject();

            }

            return getCompanyById(credentials._company)
                .then((company) => {

                    done(null, company);
                    return Promise.resolve();

                });

        })
        .catch(() => done(null, false));

});

module.exports = {
    companyHeaderAuthenticateStrategy
};
