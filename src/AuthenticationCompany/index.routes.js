import passport from 'passport';
import { proceedSuccessLoginCompany, protectedCompany } from './index.handlers';
import { responseSender } from '../services/responseSender';

const authenticateCompany = passport.authenticate('local-company', {
    assignProperty: 'company',
    session: false
});

const requireAuthCompany = passport.authenticate('jwt-company', {
    assignProperty: 'company',
    session: false
});

const routes = [{
    method: 'POST',
    path: '/login-company',
    handlers: [
        authenticateCompany,
        proceedSuccessLoginCompany,
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
