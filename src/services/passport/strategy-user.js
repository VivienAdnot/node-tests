import LocalStrategy from 'passport-local';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
    getUserById,
    getCredentialsByEmail,
    getCredentialsById
} from '../database/model';

class UserStrategy extends Strategy {

    constructor(options, verify) {

        super(options, verify);
        this.name = 'jwt-user';

    }

}

class UserLocalStrategy extends LocalStrategy {

    constructor(options, verify) {

        super(options, verify);
        this.name = 'local-user';

    }

}

const userHeaderAuthenticateStrategy = new UserStrategy({
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

            return getUserById(credentials._user)
                .then((user) => {

                    done(null, user);
                    return Promise.resolve();

                });

        })
        .catch(() => done(null, false));

});

const userLoginStrategy = new UserLocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {

    getCredentialsByEmail(email)
        .then((credentials) => {

            if (!credentials) {

                return Promise.reject(new Error('invalid credentials'));

            }

            if (credentials.password === password) {

                return getUserById(credentials._user)
                    .then((user) => {

                        done(null, user);
                        return Promise.resolve();

                    });

            }

            return Promise.reject(new Error('invalid credentials'));

        })
        .catch(error => done(null, false, { error }));

});

module.exports = {
    userHeaderAuthenticateStrategy,
    userLoginStrategy
};
