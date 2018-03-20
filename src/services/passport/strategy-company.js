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
        this.name = 'jwt-company';

    }

}

class CompanyLocalStrategy extends LocalStrategy {

    constructor(options, verify) {

        super(options, verify);
        this.name = 'local-company';

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

const companyLoginStrategy = new CompanyLocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {

    getCredentialsByEmail(email)
        .then((credentials) => {

            if (!credentials) {

                return Promise.reject(new Error('invalid credentials'));

            }

            if (credentials.password === password) {

                return getCompanyById(credentials._company)
                    .then((company) => {

                        done(null, company);
                        return Promise.resolve();

                    });

            }

            return Promise.reject(new Error('invalid credentials'));

        })
        .catch(error => done(null, false, { error }));

});

module.exports = {
    companyHeaderAuthenticateStrategy,
    companyLoginStrategy
};
