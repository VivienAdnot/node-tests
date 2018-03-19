import passport from 'passport';
import getUserOrCompanyFromCredentials from '../services/passport/transform-credentials';
import { protectedUser, protectedCompany } from './protected.handlers';
import { responseSender } from '../services/responseSender';

const requireAuth = passport.authenticate('jwt', {
    assignProperty: 'credentials',
    session: false
});

const routes = [{
    method: 'GET',
    path: '/protectedUser',
    handlers: [
        requireAuth,
        getUserOrCompanyFromCredentials,
        protectedUser,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/protectedCompany',
    handlers: [
        requireAuth,
        getUserOrCompanyFromCredentials,
        protectedCompany,
        responseSender
    ]
}];

export default routes;
