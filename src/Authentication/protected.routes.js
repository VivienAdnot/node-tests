import passport from 'passport';
import { responseSender } from '../services/responseSender';
import getProtected from './protected.handlers';

const requireAuth = passport.authenticate('jwt', {
    assignProperty: 'credentials',
    session: false
});

const routes = [{
    method: 'GET',
    path: '/protected',
    handlers: [
        requireAuth,
        getProtected,
        responseSender
    ]
}];

export default routes;
