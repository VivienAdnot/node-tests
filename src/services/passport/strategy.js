import LocalStrategy from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
    getCredentialsByEmail,
    getCredentialsById
} from './model';

const headerAuthenticateStrategy = new Strategy({
    jwtFromRequest: (req) => {

        const extractAuthHeader = ExtractJwt.fromAuthHeaderAsBearerToken();
        const token = extractAuthHeader(req);
        return token;

    },
    secretOrKey: 'VIVIEN'
}, (payload, done) => {

    getCredentialsById(payload.id)
        .then((credentials) => {

            if (credentials) {

                done(null, credentials);
                return Promise.resolve();

            }

            return Promise.reject();

        })
        .catch(() => done(null, false));

});

const loginStrategy = new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {

    getCredentialsByEmail(email)
        .then((credentials) => {

            if (!credentials) {

                return Promise.reject(new Error('invalid credentials'));

            }

            if (credentials.password === password) {

                done(null, credentials);
                return Promise.resolve();

            }

            return Promise.reject(new Error('invalid credentials'));

        })
        .catch(error => done(null, false, { error }));

});

module.exports = {
    headerAuthenticateStrategy,
    loginStrategy
};
