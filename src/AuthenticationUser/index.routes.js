import passport from 'passport';
import { proceedSuccessLoginUser, protectedUser } from './index.handlers';
import { responseSender } from '../services/responseSender';

const authenticateUser = passport.authenticate('local-user', { session: false });

const requireAuthUser = passport.authenticate('jwt-user', {
    session: false
});

const routes = [{
    method: 'POST',
    path: '/login-user',
    handlers: [
        authenticateUser,
        proceedSuccessLoginUser,
        responseSender
    ]
}, {
    method: 'GET',
    path: '/protectedUser',
    handlers: [
        requireAuthUser,
        protectedUser,
        responseSender
    ]
}];

export default routes;
