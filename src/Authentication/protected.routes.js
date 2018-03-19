import passport from 'passport';
import { protectedUser, protectedCompany } from './protected.handlers';
import { responseSender } from '../services/responseSender';

const requireAuthUser = passport.authenticate('jwt-user', {
    session: false
});

const requireAuthCompany = passport.authenticate('jwt-company', {
    assignProperty: 'company',
    session: false
});

const routes = [{
    method: 'GET',
    path: '/protectedUser',
    handlers: [
        requireAuthUser,
        protectedUser,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/protectedCompany',
    handlers: [
        requireAuthCompany,
        protectedCompany,
        responseSender
    ]
}];

export default routes;
